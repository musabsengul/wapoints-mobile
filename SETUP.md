# Kurulum Talimatları

## Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Expo CLI
- iOS Simulator (Mac) veya Android Emulator (veya fiziksel cihaz)

## Adım Adım Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Asset Dosyalarını Hazırlayın

Aşağıdaki dosyaları `assets/` klasörüne ekleyin:

- `icon.png` (1024x1024) - Uygulama ikonu
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon
- `notification-icon.png` (96x96) - Bildirim ikonu

**Not:** Bu dosyalar olmadan uygulama çalışmaya devam eder ancak uyarılar verebilir.

### 3. API Yapılandırması

`src/config/api.ts` dosyasında API base URL'ini kontrol edin:

- Development: `http://localhost:8080/api/v1`
- Production: Production URL'inizi buraya ekleyin

**iOS Simulator için:** `http://localhost:8080` çalışır

**Android Emulator için:** `http://10.0.2.2:8080` kullanın

**Fiziksel cihaz için:** Bilgisayarınızın IP adresini kullanın (örn: `http://192.168.1.100:8080`)

### 4. Push Notification Yapılandırması

`src/utils/notifications.ts` dosyasında `projectId` değerini Expo proje ID'niz ile değiştirin:

```typescript
const token = await Notifications.getExpoPushTokenAsync({
  projectId: 'your-expo-project-id', // Buraya Expo proje ID'nizi ekleyin
});
```

Expo proje ID'nizi almak için:
1. Expo hesabınıza giriş yapın
2. Projenizi oluşturun
3. `app.json` dosyasındaki `extra.eas.projectId` değerini kullanın

### 5. Uygulamayı Başlatın

```bash
npm start
```

veya

```bash
npx expo start
```

### 6. Uygulamayı Çalıştırın

- **iOS Simulator:** `i` tuşuna basın veya QR kodunu tarayın
- **Android Emulator:** `a` tuşuna basın veya QR kodunu tarayın
- **Fiziksel Cihaz:** Expo Go uygulamasını kullanarak QR kodunu tarayın

## Geliştirme İpuçları

### Hot Reload

Expo otomatik olarak hot reload yapar. Kod değişiklikleriniz anında yansır.

### Debugging

- React Native Debugger kullanabilirsiniz
- Chrome DevTools ile debug edebilirsiniz (`j` tuşu ile)
- Console log'lar Expo DevTools'da görünür

### TypeScript

TypeScript kullanılıyor. Tip hatalarını kontrol etmek için:

```bash
npx tsc --noEmit
```

## Yaygın Sorunlar

### Metro bundler hatası

```bash
npx expo start --clear
```

### Node modules sorunu

```bash
rm -rf node_modules
npm install
```

### Cache sorunu

```bash
npx expo start -c
```

## Test Hesabı

API dokümantasyonuna göre test için kullanabileceğiniz örnek bilgiler:

- Email: `resource@example.com`
- Telefon: `+905551234567`
- Şifre: Backend'den alınacak

## Sonraki Adımlar

1. Asset dosyalarını ekleyin
2. API URL'ini yapılandırın
3. Push notification project ID'yi ekleyin
4. Uygulamayı test edin
5. Production build hazırlayın (EAS Build kullanarak)

