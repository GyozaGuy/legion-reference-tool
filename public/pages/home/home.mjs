import '/components/filterPill/filterPill.mjs'
import '/components/keywordCard/keywordCard.mjs'
import { getKeywords } from '/queries.mjs'
import { html } from '/helpers/templateHelper.mjs'

const filtersContainer = document.body.querySelector('#filtersContainer')
const letterPillsContainer = document.body.querySelector('#letterPillsContainer')
const keywordPillsContainer = document.body.querySelector('#keywordPillsContainer')
const cardsContainer = document.body.querySelector('#cardsContainer')
const textFilter = document.body.querySelector('#textFilter')
const clearTextButton = document.body.querySelector('#clearTextButton')
const keywordTypes = []
const activeFilters = []

document.addEventListener('DOMContentLoaded', async () => {
  const keywords = await getKeywords()
  const keywordLetters = []

  keywords.forEach(({ description, name, types }) => {
    types.forEach(type => {
      if (!keywordTypes.includes(type)) {
        keywordTypes.push(type)
      }
    })

    const firstLetter = name.substr(0, 1)

    if (!keywordLetters.includes(firstLetter)) {
      keywordLetters.push(firstLetter)
    }

    cardsContainer.appendChild(html`
      <keyword-card
        description="${description}"
        keyword-name="${name}"
        types="${types.join('|')}"
      ></keyword-card>
    `)
  })

  keywordLetters.sort().forEach(letter => {
    letterPillsContainer.appendChild(html`
      <filter-pill filter-value="${letter}"></filter-pill>
    `)
  })

  keywordTypes.sort().forEach(type => {
    keywordPillsContainer.appendChild(html`
      <filter-pill filter-value="${type}"></filter-pill>
    `)
  })
})

document.body.addEventListener('keyword-card:toggle', ({ detail: open, target }) => {
  [...cardsContainer.children].forEach(child => {
    if (open && child !== target) {
      child.open = false
    }
  })
})

document.body.addEventListener('filter-pill:toggle', ({ detail: { enabled, filterValue } }) => {
  if (enabled) {
    activeFilters.push(filterValue)
    textFilter.value = ''
  } else {
    activeFilters.splice(activeFilters.indexOf(filterValue), 1)
  }

  const letterFilters = activeFilters.filter(filter => filter.length === 1)
  const keywordFilters = activeFilters.filter(filter => filter.length > 1)

  ;[...cardsContainer.children].forEach(child => {
    child.open = false
    child.hidden =
      activeFilters.length &&
      !(
        (!letterFilters.length || letterFilters.some(letter => child.name.startsWith(letter))) &&
        keywordFilters.every(type => child.types.includes(type))
      )
  })
})

textFilter.addEventListener('input', ({ target: { value } }) => {
  if (value) {
    filtersContainer.querySelectorAll('filter-pill').forEach(filterPill => {
      filterPill.enabled = false
    })
    ;[...cardsContainer.children].forEach(child => {
      child.open = false
      child.hidden = ![child.name, child.description, ...child.types].some(childVal =>
        childVal.toLowerCase().includes(value.toLowerCase())
      )
    })
  } else {
    [...cardsContainer.children].forEach(child => {
      child.open = false
      child.hidden = false
    })
  }
})

clearTextButton.addEventListener('click', () => {
  textFilter.value = ''
  textFilter.dispatchEvent(new Event('input'))
})
