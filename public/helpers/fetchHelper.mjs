const port = typeof window === 'undefined' ? process.env.PORT || 3000 : location.port

export async function fetchGql(query, fetchFunc = fetch) {
  return await fetchJson(
    `${typeof window === 'undefined' ? `http://localhost:${port}` : location.origin}/graphql`,
    {
      body: JSON.stringify({ query }),
      method: 'POST'
    },
    fetchFunc
  )
}

export async function fetchJson(url, options, fetchFunc = fetch) {
  const response = await fetchFunc(url, {
    headers: { 'content-type': 'application/json' },
    ...options
  })
  return response.json()
}

export default {
  fetchGql,
  fetchJson
}
