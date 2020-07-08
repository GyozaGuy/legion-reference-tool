import { css } from '/helpers/templateHelper.mjs'
import templates from './templates.mjs'

customElements.define(
  'expanding-card',
  class extends HTMLElement {
    connectedCallback() {
      css(this, templates.styles())
      this.appendChild(templates.default())

      this._header = this.querySelector('.expandingCard_header')
      this._body = this.querySelector('.expandingCard_body')

      this.addEventListener('click', () => {
        this.open = !this.open
        this.dispatchEvent(
          new CustomEvent('expanding-card:toggle', {
            bubbles: true,
            detail: this.open
          })
        )
      })
    }

    set body(body) {
      this._body.appendChild(body)
    }

    set header(header) {
      this._header.appendChild(header)
    }

    get open() {
      return this.hasAttribute('open')
    }

    set open(open) {
      this.toggleAttribute('open', open)
    }
  }
)
