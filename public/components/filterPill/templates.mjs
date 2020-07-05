import { html } from '/helpers/templateHelper.mjs'

export default {
  styles: () => html`
    <style component="filter-pill">
      filter-pill {
        background-color: White;
        border-radius: 20px;
        display: inline-block;
        font-size: 2em;
        padding: 5px 10px;
        text-transform: capitalize;
      }

      filter-pill[enabled] {
        background-color: Red;
        box-shadow: 0 0 8px Red;
        color: White;
      }
    </style>
  `
}
