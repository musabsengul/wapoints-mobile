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
```

2. Expo CLI'yi global olarak yükleyin (eğer yüklü değilse):

```bash
npm install -g expo-cli
```

3. Uygulamayı başlatın:

```bash
npm start
```

veya

```bash
npx expo start
```

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

- Push notification izinleri
- Bildirim handler yapılandırması

## Önemli Notlar

1. **Token Güvenliği**: Token'lar Expo Secure Store'da güvenli bir şekilde saklanmaktadır.

2. **API Bağlantısı**: Development için localhost kullanılmaktadır. Emulator veya gerçek cihazda çalıştırmak için IP adresini güncellemeniz gerekebilir.

3. **Bildirimler**: Expo push notification token'ı almak için `expo-notifications` package'ı yapılandırılmalıdır.

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

