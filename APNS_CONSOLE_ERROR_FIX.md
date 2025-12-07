# APNs Console "Device token doesn't match the specified topic" Hatası

## 🔴 Hata
```
The device token doesn't match the specified topic.
```

## 🔍 Olası Nedenler

### 1. **Environment Uyumsuzluğu (EN YAYGIN)**
- APNs token'ı **Development** için ama **Production** environment'ında gönderiliyor
- VEYA APNs token'ı **Production** için ama **Development** environment'ında gönderiliyor

**Çözüm:**
- `app.json` → `ios.entitlements.aps-environment` → `"development"` ise
- APNs Console'da **Development** environment'ını seçin
- `"production"` ise **Production** environment'ını seçin

### 2. **Bundle ID Uyumsuzluğu**
- APNs token'ı farklı bir Bundle ID'ye ait
- `app.json` → `ios.bundleIdentifier` = `app.wapoints.com`
- `GoogleService-Info.plist` → `BUNDLE_ID` = `app.wapoints.com`
- APNs Console'da doğru Bundle ID seçilmiş mi kontrol edin

### 3. **Yanlış Token Kullanımı**
- APNs Console **APNs Token** gerektirir (hexadecimal string)
- Firebase Console **FCM Token** gerektirir (farklı format)
- Profile ekranından **APNs Token**'ı kopyalayın (FCM Token değil!)

### 4. **Token Geçersiz/Expired**
- Token'ı yeniden alın
- Uygulamayı yeniden başlatın
- Profile → Push Notification Debug → APNs Token'ı yeniden kopyalayın

## ✅ Doğru Kullanım

### APNs Console'dan Gönderme:
1. **Environment:** Development (veya Production - app.json'daki ayara göre)
2. **Device Token:** Profile ekranından kopyalanan **APNs Token** (hexadecimal)
3. **Bundle ID:** `app.wapoints.com`

### Firebase Console'dan Gönderme (ÖNERİLEN):
1. **FCM Token:** Profile ekranından kopyalanan **FCM Token**
2. **Notification title:** Doldurulmalı
3. **Notification text:** Doldurulmalı

## 🎯 Önerilen Çözüm

**APNs Console yerine Firebase Console kullanın!**

Firebase Console daha kolay ve hata yapma riski daha düşük:

1. Firebase Console → Cloud Messaging → Send test message
2. **FCM Token**'ı yapıştırın (APNs Token değil!)
3. **Notification title** ve **text** doldurun
4. Send butonuna tıklayın

Firebase Console otomatik olarak:
- Doğru environment'ı kullanır
- APNs sertifikalarını yönetir
- Token'ı doğru şekilde işler

## 🔧 Kontrol Listesi

- [ ] `app.json` → `ios.entitlements.aps-environment` kontrol edildi
- [ ] APNs Console'da doğru environment seçildi (Development/Production)
- [ ] Profile ekranından **APNs Token** kopyalandı (FCM Token değil!)
- [ ] Bundle ID eşleşiyor (`app.wapoints.com`)
- [ ] Token geçerli (uygulama yeniden başlatıldı, yeni token alındı)

## 💡 İpucu

APNs Console yerine **Firebase Console** kullanmak daha kolay ve güvenilir. Firebase Console:
- Environment'ı otomatik yönetir
- APNs sertifikalarını otomatik kullanır
- FCM Token ile çalışır (daha kolay)
