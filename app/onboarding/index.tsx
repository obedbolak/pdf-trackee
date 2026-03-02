import { useOnboarding } from "@/hooks/useOnboarding";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    emoji: "📂",
    title: "Organize Your PDFs",
    subtitle:
      "Sort your documents into categories like Work, Study, Finance and more.",
  },
  {
    emoji: "📖",
    title: "Pick Up Where You Left Off",
    subtitle:
      "Your last page and scroll position are saved automatically every time.",
  },
  {
    emoji: "🚀",
    title: "Fast & Offline",
    subtitle:
      "All your files are stored locally on your device. No cloud, no waiting.",
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();
  const [current, setCurrent] = useState(0);

  async function handleNext() {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      await completeOnboarding();
      router.replace("/(app)");
    }
  }

  function handleSkip() {
    completeOnboarding().then(() => router.replace("/(app)"));
  }

  const slide = SLIDES[current];

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slide content */}
      <View style={styles.slide}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === current && styles.dotActive]}
          />
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.btnText}>
          {current === SLIDES.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 48,
  },
  skipBtn: { alignSelf: "flex-end", paddingHorizontal: 24 },
  skipText: { fontSize: 15, color: "#999" },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  emoji: { fontSize: 80, marginBottom: 32 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  dots: { flexDirection: "row", gap: 8, marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ddd" },
  dotActive: { backgroundColor: "#4A90E2", width: 24 },
  btn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
    marginHorizontal: 24,
    width: width - 48,
  },
  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
