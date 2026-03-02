import { useState, useEffect, useCallback } from 'react';
import { storageGet, storageSet, STORAGE_KEYS, Category, PdfMetadata } from '@/lib/storage';
import { copyPdfToStorage, deletePdf, getPdfFileSize } from '@/lib/fileSystem';
import { DEFAULT_CATEGORIES } from '@/constants/Categories';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export function usePdfStorage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pdfs, setPdfs] = useState<PdfMetadata[]>([]);

  useEffect(() => {
    (async () => {
      const storedCats = await storageGet<Category[]>(STORAGE_KEYS.CATEGORIES);
      if (storedCats && storedCats.length > 0) {
        setCategories(storedCats);
      } else {
        const defaults: Category[] = DEFAULT_CATEGORIES.map((c) => ({
          ...c,
          createdAt: Date.now(),
        }));
        await storageSet(STORAGE_KEYS.CATEGORIES, defaults);
        setCategories(defaults);
      }

      const storedPdfs = await storageGet<PdfMetadata[]>(STORAGE_KEYS.PDF_METADATA);
      setPdfs(storedPdfs ?? []);
    })();
  }, []);

  const addPdf = useCallback(
    async (sourceUri: string, name: string, categoryId: string) => {
      const id = uuidv4();
      const fileName = `${id}.pdf`;
      const uri = await copyPdfToStorage(sourceUri, fileName);
      const fileSize = await getPdfFileSize(uri);

      const newPdf: PdfMetadata = {
        id,
        name,
        uri,
        categoryId,
        addedAt: Date.now(),
        fileSize,
      };

      const updated = [...pdfs, newPdf];
      setPdfs(updated);
      await storageSet(STORAGE_KEYS.PDF_METADATA, updated);
      return newPdf;
    },
    [pdfs]
  );

  const removePdf = useCallback(
    async (pdfId: string) => {
      const target = pdfs.find((p) => p.id === pdfId);
      if (target) await deletePdf(target.uri);
      const updated = pdfs.filter((p) => p.id !== pdfId);
      setPdfs(updated);
      await storageSet(STORAGE_KEYS.PDF_METADATA, updated);
    },
    [pdfs]
  );

  const getPdfsByCategory = useCallback(
    (categoryId: string) => pdfs.filter((p) => p.categoryId === categoryId),
    [pdfs]
  );

  return { categories, pdfs, addPdf, removePdf, getPdfsByCategory };
}
