import '/components/filterPill/filterPill.mjs'
import '/components/keywordCard/keywordCard.mjs'
import { getKeywords } from '/queries.mjs'
import { html } from '/helpers/templateHelper.mjs'

const filterPillsContainer = document.body.querySelector('#filterPillsContainer')
const cardContainer = document.body.querySelector('#cardContainer')
const keywordTypes = []
const activeFilters = []

document.addEventListener('DOMContentLoaded', async () => {
  const keywords = await getKeywords()

  keywords.forEach(({ description, name, types }) => {
    types.forEach(type => {
      if (!keywordTypes.includes(type)) {
        keywordTypes.push(type)
      }
    })

    cardContainer.appendChild(html`
      <keyword-card
        description="${description}"
        keyword-name="${name}"
        types="${types.join('|')}"
      ></keyword-card>
    `)
  })

  keywordTypes.sort().forEach(type => {
    filterPillsContainer.appendChild(html`
      <filter-pill filter-value="${type}"></filter-pill>
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

document.addEventListener('filter-pill:toggle', ({ detail: { enabled, filterValue } }) => {
  if (enabled) {
    activeFilters.push(filterValue)
  } else {
    activeFilters.splice(activeFilters.indexOf(filterValue), 1)
  }

  console.log(activeFilters);

  [...cardContainer.children].forEach(child => {
    child.hidden = activeFilters.length && !activeFilters.every(type => child.types.includes(type))
  })
})
