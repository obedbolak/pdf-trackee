import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarStyle: { paddingBottom: 8, height: 60 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Categories',
          tabBarIcon: () => <TabIcon emoji="📂" />,
        }}
      />
      <Tabs.Screen
        name="category/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="viewer/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}
