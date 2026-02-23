type SeoMetaInput = {
  title: string
  description: string
  robots: 'index,follow' | 'noindex,nofollow'
  canonicalUrl: string
  ogImageUrl: string
  siteName: string
}

const upsertMetaByName = (name: string, content: string) => {
  const head = document.head
  let meta = head.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    head.appendChild(meta)
  }
  if (meta.getAttribute('content') !== content) {
    meta.setAttribute('content', content)
  }
}

const upsertMetaByProperty = (property: string, content: string) => {
  const head = document.head
  let meta = head.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    head.appendChild(meta)
  }
  if (meta.getAttribute('content') !== content) {
    meta.setAttribute('content', content)
  }
}

const upsertCanonical = (href: string) => {
  const head = document.head
  let link = head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    head.appendChild(link)
  }
  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href)
  }
}

export const applySeoMeta = ({
  title,
  description,
  robots,
  canonicalUrl,
  ogImageUrl,
  siteName,
}: SeoMetaInput) => {
  document.title = title

  upsertMetaByName('description', description)
  upsertMetaByName('robots', robots)
  upsertMetaByName('twitter:card', 'summary_large_image')
  upsertMetaByName('twitter:title', title)
  upsertMetaByName('twitter:description', description)
  upsertMetaByName('twitter:url', canonicalUrl)
  upsertMetaByName('twitter:image', ogImageUrl)

  upsertMetaByProperty('og:type', 'website')
  upsertMetaByProperty('og:site_name', siteName)
  upsertMetaByProperty('og:title', title)
  upsertMetaByProperty('og:description', description)
  upsertMetaByProperty('og:url', canonicalUrl)
  upsertMetaByProperty('og:image', ogImageUrl)

  upsertCanonical(canonicalUrl)
}
