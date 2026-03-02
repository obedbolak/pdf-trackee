import { PdfListItem } from "@/components/pdf/PdfListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePdfStorage } from "@/hooks/usePdfStorage";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { categories, getPdfsByCategory, addPdf, removePdf } = usePdfStorage();

  const category = categories.find((c) => c.id === id);
  const pdfs = getPdfsByCategory(id);

  async function handleAddPdf() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const file = result.assets[0];
    await addPdf(file.uri, file.name, id);
  }

  function handleDelete(pdfId: string, name: string) {
    Alert.alert("Delete PDF", `Remove "${name}" from your library?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removePdf(pdfId) },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {category?.icon} {category?.name}
        </Text>
      </View>

      <FlatList
        data={pdfs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            emoji="📭"
            title="No PDFs yet"
            subtitle="Tap the + button to add your first PDF to this category."
            actionLabel="Add PDF"
            onAction={handleAddPdf}
          />
        }
        renderItem={({ item }) => (
          <PdfListItem
            pdf={item}
            onPress={() => router.push(`/(app)/viewer/${item.id}`)}
            onLongPress={() => handleDelete(item.id, item.name)}
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddPdf}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  header: { padding: 20, paddingTop: 12 },
  back: { fontSize: 15, color: "#4A90E2", marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "800", color: "#1a1a1a" },
  list: { padding: 16, flexGrow: 1 },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A90E2",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: { fontSize: 30, color: "#fff", lineHeight: 34 },
});
