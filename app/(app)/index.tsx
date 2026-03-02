import { CategoryCard } from "@/components/pdf/CategoryCard";
import { usePdfStorage } from "@/hooks/usePdfStorage";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const { categories, getPdfsByCategory } = usePdfStorage();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Library</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            pdfCount={getPdfsByCategory(item.id).length}
            onPress={() => router.push(`/(app)/category/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    padding: 24,
    paddingBottom: 8,
  },
  grid: { padding: 12 },
  row: { justifyContent: "space-between" },
});
