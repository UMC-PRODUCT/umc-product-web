const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const inline = (value: string) => escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

export const markdownToHtml = (markdown: string) => {
  let normalized = markdown
  if (!normalized.includes('\n')) {
    normalized = normalized
      .replace(/\s---\s/g, '\n---\n')
      .replace(/\s(#{1,3}\s)/g, '\n$1')
      .replace(/\s(\d+\.\s)/g, '\n$1')
      .replace(/\s([-*]\s)/g, '\n$1')
  }

  const lines = normalized.split(/\r?\n/)
  const output: Array<string> = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const trimmed = raw.trim()
    if (!trimmed) {
      i += 1
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      output.push('<hr />')
      i += 1
      continue
    }

    if (/^###\s+/.test(trimmed)) {
      output.push(`<h3>${inline(trimmed.replace(/^###\s+/, ''))}</h3>`)
      i += 1
      continue
    }
    if (/^##\s+/.test(trimmed)) {
      output.push(`<h2>${inline(trimmed.replace(/^##\s+/, ''))}</h2>`)
      i += 1
      continue
    }
    if (/^#\s+/.test(trimmed)) {
      output.push(`<h1>${inline(trimmed.replace(/^#\s+/, ''))}</h1>`)
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: Array<string> = []
      while (i < lines.length) {
        const item = lines[i].trim()
        if (!/^[-*]\s+/.test(item)) break
        items.push(`<li>${inline(item.replace(/^[-*]\s+/, ''))}</li>`)
        i += 1
      }
      output.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: Array<string> = []
      while (i < lines.length) {
        const item = lines[i].trim()
        if (!/^\d+\.\s+/.test(item)) break
        items.push(`<li>${inline(item.replace(/^\d+\.\s+/, ''))}</li>`)
        i += 1
      }
      output.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    const paragraphLines: Array<string> = []
    while (i < lines.length) {
      const line = lines[i]
      const lineTrimmed = line.trim()
      if (
        !lineTrimmed ||
        /^#{1,3}\s+/.test(lineTrimmed) ||
        /^---$/.test(lineTrimmed) ||
        /^\*\*\*$/.test(lineTrimmed) ||
        /^[-*]\s+/.test(lineTrimmed) ||
        /^\d+\.\s+/.test(lineTrimmed)
      ) {
        break
      }
      paragraphLines.push(lineTrimmed)
      i += 1
    }
    output.push(`<p>${inline(paragraphLines.join(' '))}</p>`)
  }

  return output.join('')
}

export const execEditorCommand = (
  editor: HTMLDivElement | null,
  command: string,
  value?: string,
) => {
  if (!editor) return null
  editor.focus()
  document.execCommand(command, false, value)
  return editor.innerHTML
}

const getCurrentBlock = (editor: HTMLDivElement) => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  let node: Node | null = range.startContainer

  while (node && node !== editor) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName.toLowerCase()
      if (['p', 'div', 'h1', 'h2', 'h3', 'li'].includes(tag)) return node
    }
    node = node.parentNode
  }
  return (editor.firstElementChild as HTMLElement | null) ?? editor
}

const moveCaretToStart = (element: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection) return
  const range = document.createRange()
  range.selectNodeContents(element)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

const ensureParagraphAfter = (target: HTMLElement) => {
  const next = target.nextElementSibling as HTMLElement | null

  if (next) {
    const tag = next.tagName.toLowerCase()
    const isEmpty = next.textContent.trim() === ''

    if (isEmpty && ['h1', 'h2', 'h3'].includes(tag)) {
      const p = document.createElement('p')
      p.innerHTML = '<br />'
      next.replaceWith(p)
      moveCaretToStart(p)
      return
    }

    if (['p', 'div'].includes(tag)) {
      if (isEmpty) next.innerHTML = '<br />'
      moveCaretToStart(next)
      return
    }
  }

  const p = document.createElement('p')
  p.innerHTML = '<br />'
  target.insertAdjacentElement('afterend', p)
  moveCaretToStart(p)
}

const replaceBlock = (block: HTMLElement, newElement: HTMLElement) => {
  block.replaceWith(newElement)
  ensureParagraphAfter(newElement)
}

export const applyMarkdownBlock = (editor: HTMLDivElement | null): boolean => {
  if (!editor) return false
  const block = getCurrentBlock(editor)
  if (!block) return false

  if (block.tagName.toLowerCase() === 'li') {
    const list = block.parentElement
    if (!list) return false
    const trimmed = block.textContent.trim()

    if (!trimmed) {
      const p = document.createElement('p')
      p.innerHTML = '<br />'
      list.insertAdjacentElement('afterend', p)
      block.remove()
      if (list.children.length === 0) list.remove()
      moveCaretToStart(p)
      return true
    }

    const nextLi = document.createElement('li')
    nextLi.innerHTML = '<br />'
    block.insertAdjacentElement('afterend', nextLi)
    moveCaretToStart(nextLi)
    return true
  }

  const text = block === editor ? editor.textContent : block.textContent
  const trimmed = text.trim()
  if (!trimmed) return false

  if (block === editor) {
    const p = document.createElement('p')
    p.textContent = trimmed
    editor.innerHTML = ''
    editor.appendChild(p)
    return applyMarkdownBlock(editor)
  }

  if (trimmed === '---' || trimmed === '***') {
    const hr = document.createElement('hr')
    block.replaceWith(hr)
    ensureParagraphAfter(hr as unknown as HTMLElement)
    return true
  }

  if (trimmed.startsWith('### ')) {
    const h3 = document.createElement('h3')
    h3.textContent = trimmed.replace(/^###\s+/, '')
    replaceBlock(block, h3)
    return true
  }
  if (trimmed.startsWith('## ')) {
    const h2 = document.createElement('h2')
    h2.textContent = trimmed.replace(/^##\s+/, '')
    replaceBlock(block, h2)
    return true
  }
  if (trimmed.startsWith('# ')) {
    const h1 = document.createElement('h1')
    h1.textContent = trimmed.replace(/^#\s+/, '')
    replaceBlock(block, h1)
    return true
  }

  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    li.textContent = trimmed.replace(/^[-*]\s+/, '')
    ul.appendChild(li)
    replaceBlock(block, ul)
    return true
  }

  const orderedMatch = trimmed.match(/^(\d+)\.\s+/)
  if (orderedMatch) {
    const ol = document.createElement('ol')
    const li = document.createElement('li')
    li.textContent = trimmed.replace(/^(\d+)\.\s+/, '')
    ol.appendChild(li)
    replaceBlock(block, ol)
    return true
  }

  return false
}
