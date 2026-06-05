'use client';

import { useState, useEffect, useCallback } from 'react';
import { GrowthEntry } from '@/lib/types';
import { getGrowthEntries, addGrowthEntry, deleteGrowthEntry } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

export function useGrowthData() {
  const [entries, setEntries] = useState<GrowthEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setEntries(getGrowthEntries());
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addEntry = useCallback((entry: Omit<GrowthEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const full: GrowthEntry = { ...entry, id: uuidv4(), createdAt: now, updatedAt: now };
    addGrowthEntry(full);
    refresh();
  }, [refresh]);

  const removeEntry = useCallback((id: string) => {
    deleteGrowthEntry(id);
    refresh();
  }, [refresh]);

  const latest = entries.length > 0 ? entries[entries.length - 1] : null;

  return { entries, loading, addEntry, removeEntry, latest, refresh };
}
