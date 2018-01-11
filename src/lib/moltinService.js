import Moltin from './moltin'

export async function fetchImages() {
  const token = `Bearer: ${JSON.parse(Moltin.storage.localStorage.moltinCredentials).access_token}`

  const result = await fetch(`https://api.moltin.com/v2/files`, {
    headers: new Headers({ authorization: token })
  }).then(response => response.json())

  return result.data
}
