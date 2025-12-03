# 🚀 Hızlı Başlangıç

## 1. Bağımlılıkları Yükle

```bash
npm install
```

## 2. Uygulamayı Başlat

```bash
npm start
```

## 3. Çalıştır

- **iOS**: `i` tuşuna bas
- **Android**: `a` tuşuna bas
- **Fiziksel cihaz**: Expo Go uygulaması ile QR kodu tara

## ⚙️ Hızlı Yapılandırma

### API URL (Gerekirse)

`src/config/api.ts` dosyasını düzenle:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://YOUR_IP:8080/api/v1', // Fiziksel cihaz için IP gerekli
  TIMEOUT: 30000,
} as const;
```

### Push Notification (Opsiyonel)

`src/utils/notifications.ts` dosyasında project ID'yi ekle.

## 📝 Test Bilgileri

API dokümantasyonuna göre test için kullanabileceğiniz bilgileri backend'den alın.

## 🎯 Özellikler

- ✅ Login/Logout
- ✅ Randevu listesi
- ✅ Randevu onaylama/iptal/reddetme
- ✅ Dark mode
- ✅ Pull-to-refresh
- ✅ Filtreleme

## 📚 Daha Fazla Bilgi

- `README.md` - Genel bilgiler
- `SETUP.md` - Detaylı kurulum
- `PROJECT_SUMMARY.md` - Proje özeti
- `MOBILE_API_DOCUMENTATION.md` - API dokümantasyonu

