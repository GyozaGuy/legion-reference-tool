import { css } from '/helpers/templateHelper.mjs'
import '../expandingCard/expandingCard.mjs'
import templates from './templates.mjs'

customElements.define('keyword-card', class extends HTMLElement {
  connectedCallback() {
    css(this, templates.styles())
    this.appendChild(templates.default())

    this.card = this.querySelector('expanding-card')
    this.description = this.getAttribute('description')
    this.name = this.getAttribute('keyword-name')
    this.types = this.getAttribute('types')

    this.card.header = templates.header(this.name)
    this.card.body = templates.body(this.description)

    this.addEventListener('expanding-card:toggle', ({ detail: open }) => {
      this.dispatchEvent(new CustomEvent('keyword-card:toggle', {
        bubbles: true,
        detail: open
      }))
    })
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(open) {
    this.toggleAttribute('open', open)
    this.card.open = open
  }

  get types() {
    return this._types
  }

  set types(types) {
    this._types = types.split('|')
  }
})
