export function css(el, cssEl) {
  if (document.head.querySelector(`style[component="${el.nodeName.toLowerCase()}"]`)) {
    return
  }

  document.head.appendChild(cssEl)
}

export function html(htmlArr, ...parts) {
  const htmlString = htmlArr.reduce((acc, cur, i) => {
    return `${acc}${cur}${parts[i] || ''}`
  }, '')

  const template = document.createElement('template')
  template.innerHTML = htmlString
  return template.content
}

export default {
  html
}
