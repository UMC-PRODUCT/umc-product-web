import os
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from github import Github, Auth
from dotenv import load_dotenv
import google.generativeai as genai
from datetime import datetime, timedelta, timezone

load_dotenv()

# 환경 변수 로드
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
REPO_NAME = os.getenv('REPO_NAME', "UMC-PRODUCT/umc-product-web")
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL')

genai.configure(api_key=GEMINI_API_KEY)

def get_today_work():
    try:
        auth = Auth.Token(GITHUB_TOKEN)
        g = Github(auth=auth)
        repo = g.get_repo(REPO_NAME)
        kst = timezone(timedelta(hours=9))
        since = datetime.now(kst) - timedelta(days=1)
        
        branches = repo.get_branches()
        work_details = ""
        seen_commits = set()
        
        for branch in branches:
            commits = repo.get_commits(since=since, sha=branch.name)
            if commits.totalCount == 0: continue
            work_details += f"\n## 🌿 Branch: {branch.name}\n"
            for commit in commits:
                if commit.sha in seen_commits: continue
                seen_commits.add(commit.sha)
                author = commit.commit.author.name
                message = commit.commit.message
                work_details += f"\n### [{author}] {message}\n"
                for file in commit.files:
                    if any(x in file.filename for x in ['package-lock.json', 'yarn.lock', 'node_modules']): continue
                    if file.patch:
                        work_details += f"- **{file.filename}** 변경:\n  ```diff\n  {file.patch[:500]}\n  ```\n"
        return work_details
    except Exception as e:
        print(f"GitHub 데이터 로드 실패: {e}")
        return ""

def create_article(work_details):
    if not work_details:
        return "오늘은 새로운 작업 내역이 없습니다. 😴"
    
    kst = timezone(timedelta(hours=9))
    today_str = datetime.now(kst).strftime('%Y년 %m월 %d일')
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    팀 "PRODUCT TEAM"의 시니어 개발자로서 오늘({today_str})의 개발 일지를 작성하라.
    작업 내역: {work_details}
    - 제목 포맷: [{today_str}] 핵심 요약
    - 한국어로 전문적이면서 친절하게 작성할 것. AI라는 언급 금지.
    """
    response = model.generate_content(prompt)
    return response.text

def send_email(subject, body):
    if not EMAIL_USER or not EMAIL_PASSWORD or not RECEIVER_EMAIL:
        print("이메일 설정값이 비어있습니다.")
        return

    msg = MIMEMultipart()
    msg['From'] = EMAIL_USER
    msg['To'] = RECEIVER_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USER, RECEIVER_EMAIL.split(','), msg.as_string())
        print("이메일 전송 성공!")
    except Exception as e:
        print(f"이메일 전송 실패: {e}")

if __name__ == "__main__":
    work = get_today_work()
    article = create_article(work)
    
    # 파일 저장
    os.makedirs("articles", exist_ok=True)
    today = datetime.now(timezone(timedelta(hours=9))).strftime('%Y-%m-%d')
    with open(f"articles/{today}.md", "w", encoding="utf-8") as f:
        f.write(article)
    
    # 이메일 발송
    send_email(f"📝 [PRODUCT TEAM] 오늘의 개발 보고서 ({today})", article)