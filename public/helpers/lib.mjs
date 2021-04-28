export function h(el, props = {}, ...children) {
  return { el, props, children }
}

export function html(strings, ...parts) {
  const stack = [h()]
  const modes = {
    CLOSE_TAG: 'close tag',
    OPEN_TAG: 'open tag',
    TEXT: 'text'
  }
  const textRegex = /^(\w+)/
  let mode = modes.TEXT

  strings.forEach((string, i) => {
    while (string) {
      let value
      string = string.trimLeft()

      switch (mode) {
        case modes.TEXT:
          if (string[0] === '<') {
            if (string[1] === '/') {
              [string] = readToken(string, 2, textRegex, parts[i])
              mode = modes.CLOSE_TAG
            } else {
              [string, value] = readToken(string, 1, textRegex, parts[i])
              stack.push(h(value, {}))
              mode = modes.OPEN_TAG
            }
          } else {
            [string, value] = readToken(string, 0, /^([^<]+)/, '')
            stack[stack.length - 1].children.push(value)
          }

          break

        case modes.OPEN_TAG:
          if (string[0] === '/' && string[1] === '>') {
            stack[stack.length - 2].children.push(stack.pop())
            mode = modes.TEXT
            string = string.substring(2)
          } else if (string[0] === '>') {
            mode = modes.TEXT
            string = string.substring(1)
          } else {
            [string, value] = readToken(string, 0, /^([\w-]+)=/, '')
            let propName = value
            ;[string, value] = readToken(string, 0, /^"([^"]*)"/, parts[i])
            stack[stack.length - 1].props[propName] = value
          }

          break

        case modes.CLOSE_TAG:
          stack[stack.length - 2].children.push(stack.pop())
          string = string.substring(1)
          mode = modes.TEXT

          break
      }
    }

    if (mode === modes.TEXT) {
      stack[stack.length - 1].children = stack[stack.length - 1].children.concat(parts[i])
    }
  })

  return stack[0].children[0]
}

function readToken(string, index, regex, part) {
  string = string.substring(index)

  if (!string) {
    return [string, part]
  }

  const matches = string.match(regex)
  return [string.substring(matches[0].length), matches[1]]
}

export function render(vNodeList, container = document.body) {
  vNodeList = [].concat(vNodeList)

  vNodeList.forEach((vNode, i) => {
    let node = container.childNodes[i]

    if (!node || (vNode.el ? node.el !== vNode.el : node.data !== vNode)) {
      node = container.insertBefore(
        vNode.el ? document.createElement(vNode.el) : document.createTextNode(vNode),
        node
      )
    }

    if (vNode.el) {
      node.el = vNode.el

      for (const propName in vNode.props) {
        if (node[propName] !== vNode.props[propName]) {
          node[propName] = vNode.props[propName]
        }
      }

      render(vNode.children, node)
    }
  })

  // for (let child; (child = container.childNodes[vNodeList.length]); ) {
  //   render([], container.removeChild(child))
  // }
}

export default {
  h,
  html,
  render
}
