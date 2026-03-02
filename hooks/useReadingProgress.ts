import { useCallback } from 'react';
import { storageGet, storageSet, STORAGE_KEYS, ReadingProgress } from '@/lib/storage';

export function useReadingProgress(pdfId: string) {
  const saveProgress = useCallback(
    async (page: number, scrollPosition: number) => {
      const all = await storageGet<Record<string, ReadingProgress>>(
        STORAGE_KEYS.READING_PROGRESS
      ) ?? {};
      all[pdfId] = { pdfId, page, scrollPosition, lastReadAt: Date.now() };
      await storageSet(STORAGE_KEYS.READING_PROGRESS, all);
    },
    [pdfId]
  );

  const loadProgress = useCallback(async (): Promise<ReadingProgress | null> => {
    const all = await storageGet<Record<string, ReadingProgress>>(
      STORAGE_KEYS.READING_PROGRESS
    );
    return all?.[pdfId] ?? null;
  }, [pdfId]);

  return { saveProgress, loadProgress };
}
