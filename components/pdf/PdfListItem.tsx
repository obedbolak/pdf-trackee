import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PdfMetadata } from '@/lib/storage';

type Props = {
  pdf: PdfMetadata;
  onPress: () => void;
  onLongPress: () => void;
  lastPage?: number;
};

export function PdfListItem({ pdf, onPress, onLongPress, lastPage }: Props) {
  const sizeLabel = pdf.fileSize
    ? pdf.fileSize > 1024 * 1024
      ? `${(pdf.fileSize / (1024 * 1024)).toFixed(1)} MB`
      : `${(pdf.fileSize / 1024).toFixed(1)} KB`
    : 'Unknown size';

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>📄</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{pdf.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{sizeLabel}</Text>
          {lastPage && lastPage > 1 && (
            <Text style={styles.progress}>· Page {lastPage}</Text>
          )}
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  emoji:      { fontSize: 28, marginRight: 12 },
  info:       { flex: 1 },
  name:       { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  meta:       { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  metaText:   { fontSize: 12, color: '#999' },
  progress:   { fontSize: 12, color: '#4A90E2', marginLeft: 4, fontWeight: '600' },
  arrow:      { fontSize: 22, color: '#ccc' },
});
