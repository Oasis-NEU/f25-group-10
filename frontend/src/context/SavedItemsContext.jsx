
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSavedListingIds, saveListing, unsaveListing } from '../api';

const SavedItemsContext = createContext(null);

export const SavedItemsProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const ids = await getSavedListingIds();
        setSavedIds(ids || []);
      } catch (err) {
        console.error('Failed to load saved items', err);
      } finally {
        setLoading(false);
      }
    };
    loadSaved();
  }, []);

  const toggleSaved = async (listingId) => {
    const isCurrentlySaved = savedIds.includes(listingId);

    // Optimistic update
    setSavedIds((prev) =>
      isCurrentlySaved
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );

    try {
      if (isCurrentlySaved) {
        await unsaveListing(listingId);
      } else {
        await saveListing(listingId);
      }
    } catch (err) {
      console.error('Failed to toggle saved item', err);
      // Revert on error
      setSavedIds((prev) =>
        isCurrentlySaved ? [...prev, listingId] : prev.filter((id) => id !== listingId)
      );
    }
  };

  const value = {
    savedIds,
    loading,
    toggleSaved,
  };

  return (
    <SavedItemsContext.Provider value={value}>
      {children}
    </SavedItemsContext.Provider>
  );
};

export const useSavedItems = () => {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return ctx;
};
