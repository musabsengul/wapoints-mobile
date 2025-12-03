import { Tabs, Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const colors = useColors();

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    tabIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
    },
    tabIconRound: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Randevular',
          tabBarIcon: ({ color }) => (
            <View style={[styles.tabIcon, { borderColor: color }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <View style={[styles.tabIconRound, { backgroundColor: color }]} />
          ),
        }}
      />
    </Tabs>
  );
}
