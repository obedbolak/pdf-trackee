import { usePdfStorage } from "@/hooks/usePdfStorage";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pdfs } = usePdfStorage();
  const { saveProgress, loadProgress } = useReadingProgress(id);

  const pdf = pdfs.find((p) => p.id === id);
  const [initialPage, setInitialPage] = useState(1);
  const [ready, setReady] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadProgress().then((progress) => {
      if (progress?.page) setInitialPage(progress.page);
      setReady(true);
    });
  }, []);

  function handlePageChanged(page: number) {
    setCurrentPage(page);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveProgress(page, 0), 800);
  }

  if (!pdf) {
    return (
      <View style={styles.center}>
        <Text>PDF not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {pdf.name}
        </Text>
        <Text style={styles.pageCount}>
          {currentPage}/{totalPages}
        </Text>
      </View>

      {/* PDF */}
      {!ready ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      ) : (
        <Pdf
          source={{ uri: pdf.uri, cache: true }}
          page={initialPage}
          onPageChanged={(page, total) => {
            handlePageChanged(page);
            setTotalPages(total);
          }}
          onError={(err) => console.error("[PDF]", err)}
          style={styles.pdf}
          trustAllCerts={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  back: { fontSize: 15, color: "#4A90E2", width: 60 },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginHorizontal: 8,
  },
  pageCount: { fontSize: 13, color: "#999", width: 60, textAlign: "right" },
  pdf: { flex: 1, width: "100%" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
