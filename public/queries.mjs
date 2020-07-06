import { fetchGql } from '/helpers/fetchHelper.mjs'

export async function getKeywords() {
  const resp = await fetchGql(`
    {
      keywords {
        description
        name
        types
      }
    }
  `)

  return resp.data.keywords
}

export default {
  getKeywords
}
