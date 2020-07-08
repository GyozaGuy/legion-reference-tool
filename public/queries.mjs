import { fetchGql } from '/helpers/fetchHelper.mjs'

export async function getKeywords() {
  if (!navigator.onLine) {
    const cachedKeywords = localStorage.getItem('cachedKeywords')

    if (cachedKeywords) {
      return JSON.parse(cachedKeywords)
    }
  }

  const resp = await fetchGql(`
    {
      keywords {
        description
        name
        types
      }
    }
  `)

  localStorage.setItem('cachedKeywords', JSON.stringify(resp.data.keywords))
  return resp.data.keywords
}

export default {
  getKeywords
}
