import { useEffect, useState } from 'react';
import { storageGet, storageSet, STORAGE_KEYS } from '@/lib/storage';

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    storageGet<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE).then((val) => {
      setHasCompletedOnboarding(!!val);
      setIsLoading(false);
    });
  }, []);

  async function completeOnboarding() {
    await storageSet(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
    setHasCompletedOnboarding(true);
  }

  return { isLoading, hasCompletedOnboarding, completeOnboarding };
}
