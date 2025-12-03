import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth-store';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

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
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    formContainer: {
      width: '100%',
      maxWidth: 400,
    },
    logoContainer: {
      marginBottom: spacing.xl,
      alignItems: 'center',
    },
    title: {
      fontSize: typography['3xl'],
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: typography.lg,
      color: colors.textSecondary,
    },
    form: {
      gap: spacing.md,
    },
    inputGroup: {
      marginBottom: spacing.md,
    },
    label: {
      fontSize: typography.base,
      color: colors.text,
      marginBottom: spacing.sm,
      fontWeight: '500',
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: typography.base,
      color: colors.text,
    },
    errorText: {
      color: colors.error,
      fontSize: typography.sm,
      marginTop: spacing.xs,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      marginTop: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: typography.lg,
      fontWeight: '600',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Logo/Title */}
          <View style={styles.logoContainer}>
            <Text style={styles.title}>WAPoints</Text>
            <Text style={styles.subtitle}>Personel Girişi</Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {/* Email/Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email veya Telefon</Text>
              <Controller
                control={control}
                name="email_or_phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="ornek@email.com veya +905551234567"
                    placeholderTextColor={colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                )}
              />
              {errors.email_or_phone && (
                <Text style={styles.errorText}>
                  {errors.email_or_phone.message}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifre</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor={colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={[styles.button, isLoading && styles.buttonDisabled]}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
