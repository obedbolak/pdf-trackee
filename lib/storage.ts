import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: 'onboarding_complete',
  CATEGORIES: 'categories',
  PDF_METADATA: 'pdf_metadata',
  READING_PROGRESS: 'reading_progress',
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: number;
};

export type PdfMetadata = {
  id: string;
  name: string;
  uri: string;
  categoryId: string;
  addedAt: number;
  fileSize?: number;
};

export type ReadingProgress = {
  pdfId: string;
  page: number;
  scrollPosition: number;
  lastReadAt: number;
};

// ─── Generic Helpers ─────────────────────────────────────────────────────────
export async function storageGet<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function storageSet<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[storage] Failed to set ${key}:`, e);
  }
}

export async function storageRemove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`[storage] Failed to remove ${key}:`, e);
  }
}
