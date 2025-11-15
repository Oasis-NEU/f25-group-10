// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const text = await res.text();
      if (text) message = text;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function getCategories() {
  return request('/api/categories');
}

export function getListings(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set('q', params.q);
  if (params.category) searchParams.set('category', params.category);
  if (params.location) searchParams.set('location', params.location);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.minPrice != null) searchParams.set('minPrice', params.minPrice);
  if (params.maxPrice != null) searchParams.set('maxPrice', params.maxPrice);
  if (params.sellerId) searchParams.set('sellerId', params.sellerId);

  const qs = searchParams.toString();
  const path = qs ? `/api/listings?${qs}` : '/api/listings';
  return request(path);
}

export function getListingById(id) {
  return request(`/api/listings/${id}`);
}

export function getMe() {
  return request('/api/me');
}

export function getSavedListingIds() {
  return request('/api/saved');
}

export function getSavedListings() {
  return request('/api/saved/listings');
}

export function saveListing(listingId) {
  return request(`/api/saved/${listingId}`, { method: 'POST' });
}

export function unsaveListing(listingId) {
  return request(`/api/saved/${listingId}`, { method: 'DELETE' });
}

export function createListing(listing) {
  return request('/api/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
  });
}
