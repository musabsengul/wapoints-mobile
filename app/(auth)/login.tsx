import { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth-store';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { H1, Body } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing } from '@/config/theme';

const loginSchema = z.object({
  email_or_phone: z.string().min(1, 'Email veya telefon numarası gereklidir'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_or_phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      router.replace('/(tabs)/appointments');
    } catch (error: any) {
      Alert.alert(
        'Giriş Hatası',
        error?.message || 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.',
        [{ text: 'Tamam' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    header: {
      marginBottom: spacing.xxl,
      alignItems: 'center',
    },
    title: {
      marginBottom: spacing.xs,
      color: colors.primary,
    },
    subtitle: {
      color: colors.textSecondary,
    },
    form: {
      gap: spacing.lg,
    },
    input: {
      marginBottom: spacing.md,
    },
    button: {
      marginTop: spacing.md,
    },
  });

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <H1 style={styles.title}>WAPoints</H1>
            <Body style={styles.subtitle}>Personel Girişi</Body>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email_or_phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email veya Telefon"
                  placeholder="ornek@email.com veya +905551234567"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  error={errors.email_or_phone?.message}
                  style={styles.input}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Şifre"
                  placeholder="Şifrenizi girin"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  error={errors.password?.message}
                  style={styles.input}
                />
              )}
            />

            <Button
              label="Giriş Yap"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              style={styles.button}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
