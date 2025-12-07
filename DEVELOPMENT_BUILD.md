# Development Build Kılavuzu

Bu proje Firebase Cloud Messaging kullandığı için **Expo Go çalışmaz**. Development build kullanmanız gerekir.

## Hızlı Başlangıç

### 1. EAS CLI Kurulumu

```bash
npm install -g eas-cli
eas login
```

### 2. İlk Development Build

#### iOS (Simulator için)

```bash
npm run build:dev:ios
```

Build tamamlandıktan sonra:
- Simulator otomatik açılır
- Veya EAS Build sayfasından indirip simulator'a yükleyin

#### Android

```bash
npm run build:dev:android
```

Build tamamlandıktan sonra:
- APK dosyasını EAS Build sayfasından indirin
- Cihazınıza yükleyin: `adb install <apk-path>`

### 3. Development Server Başlatma

```bash
npm start
```

Development build uygulaması otomatik olarak server'a bağlanır.

## Günlük Kullanım

### Development Server

```bash
# Standart başlatma
npm start

# Platform spesifik
npm run ios      # iOS simulator
npm run android  # Android emulator
```

### Yeni Native Modül Eklendiğinde

Yeni bir native modül eklediyseniz, yeni bir build almanız gerekir:

```bash
# iOS için
npm run build:dev:ios

# Android için
npm run build:dev:android
```

## Local Development Build (Alternatif - Önerilmez)

**Not:** Local build'de Swift pod'lar ile ilgili sorunlar yaşanabilir. EAS Build kullanmanız önerilir.

Eğer yine de local build almak istiyorsanız:

### Gereksinimler

- **iOS**: Xcode, CocoaPods
- **Android**: Android Studio, JDK

### Adımlar

1. **Native klasörleri oluştur:**

```bash
npx expo prebuild --platform ios
```

2. **iOS Podfile'ı düzenle:**

`ios/Podfile` dosyasına şunu ekleyin (en üste):

```ruby
use_modular_headers!
```

3. **iOS için:**

```bash
cd ios
export LANG=en_US.UTF-8
pod install
cd ..
npx expo run:ios
```

4. **Android için:**

```bash
npx expo prebuild --platform android
npx expo run:android
```

## Build Profilleri

`eas.json` dosyasında 3 build profili tanımlı:

- **development**: Development build (simulator/emulator için)
- **preview**: Internal distribution için (test için)
- **production**: Production build (App Store/Play Store için)

## Sorun Giderme

### Build Hatası

- `eas.json` dosyasını kontrol edin
- `app.json` yapılandırmasını kontrol edin
- Firebase config dosyalarının doğru konumda olduğundan emin olun

### Development Server Bağlanmıyor

- Development build'in çalıştığından emin olun
- `npm start` komutunun `--dev-client` flag'i ile çalıştığından emin olun
- Aynı WiFi ağında olduğunuzdan emin olun

### Firebase Hatası

- `GoogleService-Info.plist` (iOS) ve `google-services.json` (Android) dosyalarının root'ta olduğundan emin olun
- Bundle ID / Package name'in Firebase Console'daki ile eşleştiğinden emin olun

## Daha Fazla Bilgi

- [Expo Development Build Docs](https://docs.expo.dev/development/introduction/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Firebase Setup](https://docs.expo.dev/guides/using-firebase/)
