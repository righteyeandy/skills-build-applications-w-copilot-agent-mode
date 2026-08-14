const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim();

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function normalizeApiData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs;
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items;
  }

  return [];
}

async function fetchCollection(endpoint) {
  const response = await fetch(`${apiBaseUrl}/${endpoint}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  const payload = await response.json();

  return {
    rows: normalizeApiData(payload),
    raw: payload,
    apiBaseUrl,
    codespaceName
  };
}

export { apiBaseUrl, codespaceName, fetchCollection, normalizeApiData };
