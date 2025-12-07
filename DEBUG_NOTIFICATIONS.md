# 🔍 Bildirim Gelmiyor - Debug Checklist

## ⚠️ EN KRİTİK: Firebase Console - APNs Sertifikaları

**Bu olmadan iOS push notification KESİNLİKLE çalışmaz!**

### Kontrol Adımları:

1. **Firebase Console'a gidin:**
   - Firebase Console → Project Settings → Cloud Messaging
   - iOS app bölümüne gidin

2. **APNs yapılandırmasını kontrol edin:**
   - [ ] **APNs Authentication Key** yapılandırılmış mı?
   - [ ] VEYA **APNs Certificates** yapılandırılmış mı?

3. **Eğer yoksa:**
   - Apple Developer Console → Certificates, Identifiers & Profiles → Keys
   - Yeni APNs Key oluşturun
   - Key ID'yi not edin
   - .p8 dosyasını indirin
   - Firebase Console → Cloud Messaging → iOS app → Upload
   - Key ID, Team ID ve .p8 dosyasını yükleyin

## 📱 1. Token Kontrolü

**Profile → Push Notification Debug**

- [ ] FCM Token mevcut mu?
- [ ] APNs Token mevcut mu? (iOS için zorunlu!)
- [ ] Token'lar doğru kopyalandı mı?

**APNs Token yoksa:**
- Fiziksel cihaz kullanıldığından emin olun (Simulator çalışmaz)
- Firebase Console'da APNs sertifikalarını kontrol edin
- Uygulamayı yeniden başlatın

## 🔔 2. Console Logları Kontrolü

Uygulamayı açık tutup Firebase Console'dan bildirim gönderin:

### Foreground (Uygulama açık):
```
🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
```

### Background (Uygulama arka planda):
```
🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
```

**Eğer bu loglar görünmüyorsa:**
- Bildirim Firebase'den uygulamaya ulaşmıyor
- APNs sertifikalarını kontrol edin
- Token'ın doğru olduğundan emin olun

## 📤 3. Firebase Console - Bildirim Formatı

**Firebase Console → Cloud Messaging → Send test message**

- [ ] **"Notification title"** doldurulmuş mu?
- [ ] **"Notification text"** doldurulmuş mu?
- [ ] Sadece "Custom data" kullanılmıyor mu?

**iOS'ta bildirim göstermek için `notification` payload'u MUTLAKA olmalı!**

## 🧪 4. Test Senaryoları

### Senaryo A: Foreground Test
1. Uygulamayı açık tutun
2. Firebase Console'dan bildirim gönderin
3. Console loglarını kontrol edin
4. Bildirim ekranda görünmeli

### Senaryo B: Background Test
1. Uygulamayı arka plana alın
2. Firebase Console'dan bildirim gönderin
3. Console loglarını kontrol edin
4. iOS bildirim merkezinde görünmeli

### Senaryo C: Terminated Test
1. Uygulamayı tamamen kapatın
2. Firebase Console'dan bildirim gönderin
3. iOS bildirim merkezinde görünmeli

## 🔧 5. Yapılandırma Kontrolü

### app.json
- [ ] `ios.entitlements.aps-environment` → `"development"` (veya `"production"`)
- [ ] `ios.infoPlist.UIBackgroundModes` → `["remote-notification"]`
- [ ] `ios.bundleIdentifier` → `app.wapoints.com`

### GoogleService-Info.plist
- [ ] `BUNDLE_ID` → `app.wapoints.com` (app.json ile aynı)

## 📋 6. Debug Adımları

### Adım 1: Console Loglarını Kontrol Edin
Uygulamayı açık tutup Firebase Console'dan bildirim gönderin:
- Console'da `🔔 FOREGROUND NOTIFICATION RECEIVED` görünüyor mu?
- Console'da `🔔 BACKGROUND NOTIFICATION RECEIVED` görünüyor mu?

### Adım 2: Firebase Console Hatalarını Kontrol Edin
Firebase Console → Cloud Messaging → Send test message
- Hata mesajı var mı?
- "Invalid registration token" hatası var mı?
- "MismatchSenderId" hatası var mı?

### Adım 3: Xcode Console
Xcode'dan uygulamayı çalıştırıp console'u kontrol edin:
- Firebase hataları var mı?
- APNs bağlantı hataları var mı?

## 🚨 En Yaygın Sorunlar

### Sorun 1: "APNs Token yok"
**Çözüm:** Firebase Console'da APNs sertifikalarını yapılandırın

### Sorun 2: "Hiç log görünmüyor"
**Çözüm:**
- Firebase Console'da APNs sertifikalarını kontrol edin
- Token'ın doğru olduğundan emin olun
- Firebase Console'da hata mesajı var mı kontrol edin

### Sorun 3: "Bildirim geliyor ama görünmüyor"
**Çözüm:**
- Firebase Console'dan gönderirken "Notification title" ve "text" doldurun
- iOS'ta sadece data payload ile bildirim gösterilmez

### Sorun 4: "Invalid registration token"
**Çözüm:**
- Token'ı yeniden kopyalayın
- Uygulamayı yeniden başlatıp yeni token alın
- Firebase projesi doğru mu kontrol edin

## ✅ Test Checklist

- [ ] Firebase Console'da APNs sertifikaları yapılandırılmış
- [ ] Fiziksel cihazda development build yüklü
- [ ] Profile → Push Notification Debug → APNs Token mevcut
- [ ] Firebase Console → Send test message
- [ ] "Notification title" ve "text" doldurulmuş
- [ ] FCM Token doğru kopyalanmış
- [ ] Send butonuna tıklanmış
- [ ] Console loglarında bildirim alındı mesajları görünüyor

**Eğer hala çalışmıyorsa:**
- Firebase Console'da APNs sertifikalarını **mutlaka** kontrol edin
- Bu olmadan iOS push notification **kesinlikle** çalışmaz!
