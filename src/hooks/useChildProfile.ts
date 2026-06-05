'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChildProfile } from '@/lib/types';
import { getChildProfile, saveChildProfile } from '@/lib/storage';
import { formatAge, getAgePhase, getAgePhaseLabel } from '@/lib/age';

export function useChildProfile() {
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setChild(getChildProfile());
    setLoading(false);
  }, []);

  const updateProfile = useCallback((updates: Partial<ChildProfile>) => {
    if (!child) return;
    const updated = { ...child, ...updates };
    saveChildProfile(updated);
    setChild(updated);
  }, [child]);

  const age = child ? formatAge(child.birthDate, child.birthTime) : null;
  const phase = age ? getAgePhase(age.days) : null;
  const phaseLabel = phase ? getAgePhaseLabel(phase) : null;

  return { child, loading, updateProfile, age, phase, phaseLabel };
}
