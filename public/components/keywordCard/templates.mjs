import { html } from '/helpers/templateHelper.mjs'

export default {
  body: description => html`
    <div class="keywordCard_body">${description}</div>
  `,
  default: () => html`
    <expanding-card></expanding-card>
  `,
  header: name => html`
    <div class="keywordCard_header"><strong>${name}</strong></div>
  `,
  styles: () => html`
    <style component="keyword-card">
      keyword-card {
        background-color: White;
        border-radius: 4px;
        box-shadow: 0 2px 4px LightGrey;
      }

      .keywordCard_header, .keywordCard_body {
        padding: 30px 20px;
      }

      .keywordCard_body {
        padding-top: 0;
      }
    </style>
`
}
