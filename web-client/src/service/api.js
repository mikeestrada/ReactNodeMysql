export const post = (url, reqBody) => {
  return fetch(url, {
    method: 'POST',
    body: reqBody,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
  })
};