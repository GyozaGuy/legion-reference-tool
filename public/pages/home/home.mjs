import '../../components/keywordCard/keywordCard.mjs'
import { getKeywords } from '/queries.mjs'
import { html } from '/helpers/templateHelper.mjs'

const cardContainer = document.body.querySelector('#cardContainer')

document.addEventListener('DOMContentLoaded', async () => {
  const keywords = await getKeywords()

  keywords.forEach(({ description, name, types }) => {
    cardContainer.appendChild(html`
      <keyword-card
        description="${description}"
        keyword-name="${name}"
        types="${types.join('|')}"
      ></keyword-card>
    `)
  })
})

document.addEventListener('keyword-card:toggle', ({ detail: open, target }) => {
  [...cardContainer.children].forEach(child => {
    if (open && child !== target) {
      child.open = false
    }
  })
})
