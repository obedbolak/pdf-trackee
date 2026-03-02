import * as FileSystem from "expo-file-system/legacy";

const PDF_DIR = FileSystem.documentDirectory + "pdfs/";

export async function ensurePdfDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(PDF_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(PDF_DIR, { intermediates: true });
  }
}

export async function copyPdfToStorage(
  sourceUri: string,
  fileName: string,
): Promise<string> {
  await ensurePdfDir();
  const dest = PDF_DIR + fileName;
  await FileSystem.copyAsync({ from: sourceUri, to: dest });
  return dest;
}

export async function deletePdf(uri: string): Promise<void> {
  const info = await FileSystem.getInfoAsync(uri);
  if (info.exists) {
    await FileSystem.deleteAsync(uri);
  }
}

export async function getPdfFileSize(uri: string): Promise<number | undefined> {
  const info = await FileSystem.getInfoAsync(uri);
  return info.exists && "size" in info ? info.size : undefined;
}
