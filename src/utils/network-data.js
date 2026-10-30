const BASE_URL = 'https://notes-api.dicoding.dev/v1';
const ACCESS_TOKEN_KEY = 'accessToken';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function putAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

async function request(path, { method = 'GET', body, accessToken } = {}) {
  const token = accessToken || getAccessToken();
  const headers = {};

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const responseJson = await response.json();

  if (!response.ok || responseJson.status !== 'success') {
    const error = new Error(
      responseJson.message || `Request failed (${response.status})`,
    );
    error.status = response.status;
    throw error;
  }

  return responseJson.data ?? null;
}

function login({ email, password }) {
  return request('/login', {
    method: 'POST',
    body: { email, password },
  });
}

function register({ name, email, password }) {
  return request('/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

function getUserLogged({ accessToken } = {}) {
  return request('/users/me', { accessToken });
}

function addNote({ title, body }, { accessToken } = {}) {
  return request('/notes', {
    method: 'POST',
    accessToken,
    body: { title, body },
  });
}

function getActiveNotes({ accessToken } = {}) {
  return request('/notes', { accessToken });
}

function getArchivedNotes({ accessToken } = {}) {
  return request('/notes/archived', { accessToken });
}

function getNote(id, { accessToken } = {}) {
  return request(`/notes/${encodeURIComponent(id)}`, { accessToken });
}

function archiveNote(id, { accessToken } = {}) {
  return request(`/notes/${encodeURIComponent(id)}/archive`, {
    method: 'POST',
    accessToken,
  });
}

function unarchiveNote(id, { accessToken } = {}) {
  return request(`/notes/${encodeURIComponent(id)}/unarchive`, {
    method: 'POST',
    accessToken,
  });
}

function deleteNote(id, { accessToken } = {}) {
  return request(`/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    accessToken,
  });
}

export {
  getAccessToken,
  putAccessToken,
  login,
  login as loginUser,
  register,
  register as registerUser,
  getUserLogged,
  addNote,
  getActiveNotes,
  getActiveNotes as getAllNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
