import { html } from '/helpers/templateHelper.mjs'

export default {
  styles: () => html`
    <style component="filter-pill">
      filter-pill {
        background-color: #555;
        border-radius: 20px;
        color: White;
        display: inline-block;
        padding: 5px 10px;
        text-transform: capitalize;
      }

      filter-pill[enabled] {
        background-color: #b32e29;
        box-shadow: 0 0 8px #b32e29;
        color: White;
      }
    </style>
  `
}
