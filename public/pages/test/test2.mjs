import { html, render } from '/helpers/lib.mjs'

render(
  html`
    <div>
      <h1>Header</h1>
      <p>I'm a paragraph</p>
    </div>
  `,
  document.body.querySelector('#container2')
)
