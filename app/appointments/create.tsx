import { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment-service';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { H1, Body } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius } from '@/config/theme';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addHours } from 'date-fns';

const createAppointmentSchema = z.object({
    customer_name: z.string().min(1, 'Müşteri adı gereklidir'),
    service_id: z.string().min(1, 'Hizmet seçimi gereklidir'), // For now, we'll just use a text input or mock
    date: z.date(),
    time: z.date(),
});

type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;

export default function CreateAppointmentScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const colors = useColors();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateAppointmentFormData>({
        resolver: zodResolver(createAppointmentSchema),
        defaultValues: {
            customer_name: '',
            service_id: '1', // Default mock service ID
            date: new Date(),
            time: new Date(),
        },
    });

    const date = watch('date');
    const time = watch('time');

    const createMutation = useMutation({
        mutationFn: appointmentService.createAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            Alert.alert('Başarılı', 'Randevu oluşturuldu.', [
                { text: 'Tamam', onPress: () => router.back() },
            ]);
        },
        onError: (error: any) => {
            Alert.alert('Hata', error?.message || 'Randevu oluşturulurken bir hata oluştu.');
        },
    });

    const onSubmit = (data: CreateAppointmentFormData) => {
        // Combine date and time
        const startAt = new Date(data.date);
        startAt.setHours(data.time.getHours());
        startAt.setMinutes(data.time.getMinutes());
        startAt.setSeconds(0);
        startAt.setMilliseconds(0);

        const endAt = addHours(startAt, 1); // Default 1 hour duration

        createMutation.mutate({
            customer_name: data.customer_name,
            service_id: data.service_id,
            start_at: startAt.toISOString(),
            end_at: endAt.toISOString(),
        });
    };

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.lg,
            marginTop: spacing.sm,
        },
        backButton: {
            marginRight: spacing.md,
            padding: spacing.xs,
        },
        title: {
            flex: 1,
        },
        form: {
            gap: spacing.lg,
        },
        input: {
            marginBottom: spacing.md,
        },
        dateButton: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            backgroundColor: colors.surface,
            marginBottom: spacing.md,
        },
        dateLabel: {
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 4,
        },
        dateValue: {
            fontSize: 16,
            color: colors.text,
        },
    });

    return (
        <ScreenLayout>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                    <H1 style={styles.title}>Yeni Randevu</H1>
                </View>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="customer_name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Müşteri Adı"
                                placeholder="Ad Soyad"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.customer_name?.message}
                                style={styles.input}
                            />
                        )}
                    />

                    {/* Date Picker */}
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                        <Body style={styles.dateLabel}>Tarih</Body>
                        <Body style={styles.dateValue}>{format(date, 'dd MMMM yyyy')}</Body>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event: any, selectedDate?: Date) => {
                                setShowDatePicker(false);
                                if (selectedDate) setValue('date', selectedDate);
                            }}
                        />
                    )}

                    {/* Time Picker */}
                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                        <Body style={styles.dateLabel}>Saat</Body>
                        <Body style={styles.dateValue}>{format(time, 'HH:mm')}</Body>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event: any, selectedDate?: Date) => {
                                setShowTimePicker(false);
                                if (selectedDate) setValue('time', selectedDate);
                            }}
                        />
                    )}

                    <Button
                        label="Oluştur"
                        onPress={handleSubmit(onSubmit)}
                        loading={createMutation.isPending}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}
