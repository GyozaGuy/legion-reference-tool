import { html } from '/helpers/templateHelper.mjs'

export default {
  body: description => html`
    <div class="keywordCard_body">${description}</div>
  `,
  default: () => html`
    <expanding-card></expanding-card>
  `,
  header: (name, types) => html`
    <div class="keywordCard_header">
      <strong>${name}</strong>
      <div class="keywordCard_types">${types.join(', ')}</div>
    </div>
  `,
  styles: () => html`
    <style component="keyword-card">
      keyword-card {
        background-color: #555;
        border-radius: 4px;
        box-shadow: 0 2px 4px #b32e29;
        color: White;
      }

      .keywordCard_header, .keywordCard_body {
        padding: 30px 20px;
      }

      .keywordCard_header {
        align-items: center;
        display: grid;
        grid-template-columns: 60% 40%;
      }

      .keywordCard_types {
        text-transform: capitalize;
      }

      .keywordCard_body {
        padding-top: 0;
      }
    </style>
`
}
