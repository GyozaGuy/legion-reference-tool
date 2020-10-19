import { html } from '/helpers/templateHelper.mjs'

export default {
  default: () => html`
    <section class="expandingCard_header"></section>
    <section class="expandingCard_body"></section>
  `,
  styles: () => html`
    <style component="expanding-card">
      expanding-card:not([open]) .expandingCard_body {
        display: none;
      }

      .expandingCard_header {
        cursor: pointer;
      }
    </style>
  `
}
