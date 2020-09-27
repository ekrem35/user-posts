export default async function (url, method = 'GET', body = {}) {
  const response = await fetch(url, method === 'GET' ? undefined : {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  const json = response.json()
  return json
}
