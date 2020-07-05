import { css } from '/helpers/templateHelper.mjs'
import templates from './templates.mjs'

customElements.define('filter-pill', class extends HTMLElement {
  connectedCallback() {
    css(this, templates.styles())
    this.filterValue = this.getAttribute('filter-value')

    this.addEventListener('click', () => {
      this.enabled = !this.enabled
      this.dispatchEvent(new CustomEvent('filter-pill:toggle', {
        bubbles: true,
        detail: {
          enabled: this.enabled,
          filterValue: this.filterValue
        }
      }))
    })
  }

  get enabled() {
    return this.hasAttribute('enabled')
  }

  set enabled(enabled) {
    this.toggleAttribute('enabled', enabled)
  }

  get filterValue() {
    return this.getAttribute('filter-value')
  }

  set filterValue(filterValue) {
    this.setAttribute('filter-value', filterValue)
    this.textContent = filterValue
  }
})
