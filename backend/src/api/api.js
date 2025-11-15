// src/api.js

// If you deploy later, you can set VITE_API_BASE_URL in your env.
// For local dev with Vite proxy, '' is fine and /api goes to your Express server.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  // Some endpoints (e.g., 204) have no body
  if (res.status === 204) return null;
  return res.json();
}

// ----- CATEGORIES -----
export async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories`);
  return handleResponse(res);
}

// ----- LISTINGS -----
export async function createListing(listing) {
  const res = await fetch(`${API_BASE}/api/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });
  return handleResponse(res);
}

// (Optional, for other pages later)
export async function getListings(params = {}) {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${API_BASE}/api/listings?${searchParams.toString()}`);
  return handleResponse(res);
}

export async function getListingById(id) {
  const res = await fetch(`${API_BASE}/api/listings/${id}`);
  return handleResponse(res);
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/api/me`);
  return handleResponse(res);
}

export async function getSavedListings() {
  const res = await fetch(`${API_BASE}/api/saved/listings`);
  return handleResponse(res);
}

export async function saveListing(listingId) {
  const res = await fetch(`${API_BASE}/api/saved/${listingId}`, {
    method: 'POST',
  });
  return handleResponse(res);
}

export async function unsaveListing(listingId) {
  const res = await fetch(`${API_BASE}/api/saved/${listingId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
