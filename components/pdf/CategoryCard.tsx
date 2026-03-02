import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Category } from '@/lib/storage';

type Props = {
  category: Category;
  pdfCount: number;
  onPress: () => void;
  style?: ViewStyle;
};

export function CategoryCard({ category, pdfCount, onPress, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: category.color }, style]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.count}>
        {pdfCount} {pdfCount === 1 ? 'file' : 'files'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:   { flex: 1, margin: 8, backgroundColor: '#fff', borderRadius: 16, padding: 20, borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  icon:   { fontSize: 32, marginBottom: 10 },
  name:   { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  count:  { fontSize: 13, color: '#999', marginTop: 4 },
});
