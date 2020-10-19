import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keywords = JSON.parse(fs.readFileSync(join(__dirname, '..', 'data', 'keywords.json')))

export default {
  Query: {
    keywords() {
      return sortByProperty(keywords, 'name')
    }
  }
}

function sortByProperty(objects, propertyName) {
  return objects.sort((a, b) => {
    if (a[propertyName] < b[propertyName]) {
      return -1
    }

    if (a[propertyName] > b[propertyName]) {
      return 1
    }

    return 0
  })
}
