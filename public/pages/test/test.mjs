import { render, useState, x as html } from '/helpers/o.mjs'

render(
  html`
    <${TestComponent} headerText="I'm in the header" />
  `,
  document.body.querySelector('#container')
)

function TestComponent({ headerText }) {
  const [value, setValue] = useState(0)
  const [textValue, setTextValue] = useState('')

  return html`
    <div>
      <h1>${headerText}</h1>
      <p>This is a paragraph showing the count: ${value}</p>
      <p>And this is the text value: ${textValue}</p>
      <button onclick=${() => setValue(value + 1)} type="button">Click me</button>
      <input oninput=${({ target: { value } }) => setTextValue(value)} type="text" />
    </div>
  `
}
