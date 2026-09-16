'use client';

import { useState, useEffect, useCallback } from 'react';
import { WebAppRecurso } from '../types';
import {
  getAllWebappsStorage,
  getWebappsForSaber,
  saveWebappForSaber,
  deleteWebappForSaber,
  resetWebappsForSaber,
} from './storage';

export function useWebApps() {
  const [allWebapps, setAllWebapps] = useState<Record<string, WebAppRecurso[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = useCallback(() => {
    const data = getAllWebappsStorage();
    setAllWebapps({ ...data });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getWebapps = useCallback((saberId: string): WebAppRecurso[] => {
    return allWebapps[saberId] || getWebappsForSaber(saberId);
  }, [allWebapps]);

  const saveWebapp = useCallback((saberId: string, webapp: WebAppRecurso) => {
    const updated = saveWebappForSaber(saberId, webapp);
    setAllWebapps((prev) => ({
      ...prev,
      [saberId]: updated,
    }));
    return updated;
  }, []);

  const deleteWebapp = useCallback((saberId: string, webappId: string) => {
    const updated = deleteWebappForSaber(saberId, webappId);
    setAllWebapps((prev) => ({
      ...prev,
      [saberId]: updated,
    }));
    return updated;
  }, []);

  const resetWebapps = useCallback((saberId: string) => {
    const updated = resetWebappsForSaber(saberId);
    setAllWebapps((prev) => ({
      ...prev,
      [saberId]: updated,
    }));
    return updated;
  }, []);

  return {
    allWebapps,
    isLoaded,
    getWebapps,
    saveWebapp,
    deleteWebapp,
    resetWebapps,
    reload: loadData,
  };
}
