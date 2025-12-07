# WAPoints Mobile

WAPoints personel (resource) hesapları için mobil uygulama.

## Teknolojiler

- **Expo** - React Native framework
- **Expo Router** - File-based routing
- **NativeWind (Tailwind)** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **Expo Secure Store** - Secure token storage
- **Expo Notifications** - Push notifications

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

2. EAS CLI'yi global olarak yükleyin (development build için):

```bash
npm install -g eas-cli
```

3. EAS hesabınıza giriş yapın:

```bash
eas login
```

## Development Build (Önerilen)

Bu proje Firebase native modülleri kullandığı için **Expo Go çalışmaz**. Development build kullanmanız gerekir.

### İlk Kurulum

1. **Development build oluşturun:**

```bash
# iOS için
npm run build:dev:ios

# Android için
npm run build:dev:android
```

2. **Build tamamlandıktan sonra:**

- **iOS**: Simulator'da otomatik açılır veya fiziksel cihazda TestFlight üzerinden yükleyin
- **Android**: APK dosyasını indirip cihazınıza yükleyin

3. **Development server'ı başlatın:**

```bash
npm start
# veya
npm run start
```

4. **Uygulamayı açın ve QR kodu tarayın** veya development build içinde otomatik bağlanır.

### Günlük Geliştirme

```bash
# Development server'ı başlat (--dev-client flag'i otomatik eklenir)
npm start

# Veya platform spesifik
npm run ios      # iOS simulator
npm run android  # Android emulator
```

### Local Development Build (Opsiyonel)

Eğer EAS Build kullanmak istemiyorsanız, local olarak da build alabilirsiniz:

```bash
# Native klasörleri oluştur
npx expo prebuild

# iOS için (Mac gerekli)
cd ios && pod install && cd ..
npx expo run:ios

# Android için
npx expo run:android
```

**Not:** Local build için Xcode (iOS) ve Android Studio (Android) kurulu olmalıdır.

## Proje Yapısı

```
wapoints-mobile/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   │   └── login.tsx
│   ├── (tabs)/            # Main app screens (tabs)
│   │   ├── appointments/
│   │   └── profile.tsx
│   └── _layout.tsx        # Root layout
├── src/
│   ├── config/            # Configuration files
│   │   ├── api.ts
│   │   └── theme.ts
│   ├── services/          # API services
│   │   ├── api-client.ts
│   │   ├── auth-service.ts
│   │   └── appointment-service.ts
│   ├── store/             # Zustand stores
│   │   ├── auth-store.ts
│   │   └── theme-store.ts
│   ├── types/             # TypeScript types
│   │   └── api.ts
│   ├── utils/             # Utility functions
│   │   ├── secure-store.ts
│   │   └── notifications.ts
│   └── providers/         # React providers
│       └── query-provider.tsx
├── assets/                # Images, fonts, etc.
└── global.css            # Tailwind CSS imports
```

## API Konfigürasyonu

API base URL'i `src/config/api.ts` dosyasında yapılandırılmıştır:

- Development: `http://localhost:8080/api/v1`
- Production: (production URL'i buraya eklenebilir)

## Özellikler

### Kimlik Doğrulama

- Email veya telefon numarası ile giriş
- JWT token güvenli saklama (Expo Secure Store)
- Otomatik token yenileme kontrolü

### Randevu Yönetimi

- Randevuları listeleme (filtreleme ve arama ile)
- Randevu onaylama
- Randevu iptal etme
- Randevu reddetme

### Tema Desteği

- Light/Dark mode desteği
- Sistem temasını takip etme
- Otomatik tema değişimi

### Bildirimler

- Firebase Cloud Messaging (FCM) entegrasyonu
- Push notification izinleri
- Foreground ve background notification handling
- FCM token yönetimi (otomatik kayıt/silme)

## Önemli Notlar

1. **Development Build Gerekli**: Firebase native modülleri kullanıldığı için Expo Go çalışmaz. Development build kullanmanız gerekir.

2. **Token Güvenliği**: Token'lar Expo Secure Store'da güvenli bir şekilde saklanmaktadır.

3. **API Bağlantısı**: Development için localhost kullanılmaktadır. Emulator veya gerçek cihazda çalıştırmak için IP adresini güncellemeniz gerekebilir.

4. **Firebase Yapılandırması**:
   - iOS için `GoogleService-Info.plist` dosyası root'ta mevcut
   - Android için `google-services.json` dosyasını Firebase Console'dan indirip root'a ekleyin
   - Her iki dosya da `app.json`'da yapılandırılmıştır

5. **FCM Token Yönetimi**: 
   - Login sonrası FCM token otomatik olarak backend'e kaydedilir
   - Logout sırasında FCM token backend'den ve cihazdan silinir

## Geliştirme

### Yeni Ekran Ekleme

Expo Router kullanıldığı için, yeni bir ekran eklemek için `app/` klasörüne yeni bir dosya eklemeniz yeterlidir.

### API Servisi Ekleme

1. `src/services/` klasörüne yeni bir servis dosyası ekleyin
2. `src/services/api-client.ts`'deki `apiClient` instance'ını kullanın
3. TanStack Query hooks ile entegre edin

### State Management

Zustand store'lar `src/store/` klasöründe bulunmaktadır. Yeni bir store eklemek için:

1. `src/store/` klasörüne yeni bir dosya ekleyin
2. Zustand'ın `create` fonksiyonunu kullanarak store'unuzu oluşturun

## Lisans

Bu proje özel bir projedir.

