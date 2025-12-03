import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';

export default function Index() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const colors = useColors();

  useEffect(() => {
    initialize();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/appointments" />;
  }

  return <Redirect href="/(auth)/login" />;
}
