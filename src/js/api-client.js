// API client

const BASE_URL = 'http://api.example.com';
const TIMEOUT = 30000;

export async function fetchData(endpoint, params) {
  let url = BASE_URL + endpoint;
  if (params) {
    url += '?' + Object.keys(params).map(k => k + '=' + params[k]).join('&');
  }

  try {
    const response = await fetch(url, { timeout: TIMEOUT });
    const data = await response.json();
    return data;
  } catch(e) {
    console.log(e);
  }
}

export async function postData(endpoint, body) {
  const response = await fetch(BASE_URL + endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return response.json();
}

export async function deleteResource(id) {
  await fetch(BASE_URL + '/resource/' + id, { method: 'DELETE' });
  return true;
}

export function buildHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': token,
    'X-Debug': 'true'
  };
}
