# 🔴 KRİTİK: Push Notification Çalışmıyor - Kontrol Listesi

Fiziksel cihazda bildirim gelmiyorsa, aşağıdaki adımları **SIRASIYLA** kontrol edin:

## ✅ 1. Firebase Console - APNs Sertifikaları (EN ÖNEMLİ!)

**Firebase Console → Project Settings → Cloud Messaging → iOS app**

- [ ] **APNs Authentication Key** yapılandırılmış mı?
  - VEYA
- [ ] **APNs Certificates** yapılandırılmış mı?

**Eğer yoksa:**
1. Apple Developer Console'a gidin
2. Certificates, Identifiers & Profiles → Keys
3. Yeni bir APNs Key oluşturun (Key ID'yi not edin)
4. Key'i indirin (.p8 dosyası)
5. Firebase Console → Cloud Messaging → iOS app → Upload
6. Key ID, Team ID ve .p8 dosyasını yükleyin

**⚠️ BU OLMADAN iOS PUSH NOTIFICATION ÇALIŞMAZ!**

## ✅ 2. Firebase Console - Bildirim Formatı

**Firebase Console → Cloud Messaging → Send test message**

- [ ] **"Notification title"** alanı doldurulmuş mu?
- [ ] **"Notification text"** alanı doldurulmuş mu?
- [ ] Sadece "Custom data" kullanılmıyor mu?

**iOS'ta bildirim göstermek için `notification` payload'u MUTLAKA olmalı!**

## ✅ 3. iOS Yapılandırması

### Info.plist
- [ ] `UIBackgroundModes` → `remote-notification` eklendi mi?
  - `app.json` → `ios.infoPlist.UIBackgroundModes` kontrol edin

### Entitlements
- [ ] `aps-environment` → `development` (veya `production`)
  - `app.json` → `ios.entitlements.aps-environment` kontrol edin

### Bundle ID
- [ ] Bundle ID Firebase Console'daki ile aynı mı?
  - `app.json` → `ios.bundleIdentifier` = `app.wapoints.com`
  - `GoogleService-Info.plist` → `BUNDLE_ID` = `app.wapoints.com`

## ✅ 4. Token Kontrolü

**Profile → Push Notification Debug**

- [ ] FCM Token mevcut mu?
- [ ] APNs Token mevcut mu? (iOS için zorunlu!)
- [ ] Token'lar Firebase Console'a doğru kopyalandı mı?

**APNs Token yoksa:**
- Fiziksel cihaz kullanıldığından emin olun (Simulator çalışmaz)
- Uygulamayı yeniden başlatın
- Notification permissions verilmiş mi kontrol edin

## ✅ 5. Test Ortamı

- [ ] Fiziksel iOS cihaz kullanılıyor mu? (Simulator çalışmaz!)
- [ ] Development build yüklü mü?
- [ ] Cihaz internete bağlı mı?

## ✅ 6. Console Logları

Uygulamayı açık tutup Firebase Console'dan bildirim gönderin:

**Foreground (Uygulama açık):**
```
🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
```

**Background (Uygulama arka planda):**
```
🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
```

**Eğer bu loglar görünmüyorsa:**
- Bildirim Firebase'den uygulamaya ulaşmıyor
- APNs sertifikalarını kontrol edin
- Token'ın doğru olduğundan emin olun

## ✅ 7. Yeniden Build

Yapılandırma değişikliklerinden sonra:

```bash
# iOS native klasörlerini temizle
rm -rf ios android

# Yeniden prebuild
npx expo prebuild --clean

# Yeni build al
eas build --profile development --platform ios
```

## 🔍 Debug Adımları

### Adım 1: APNs Token Kontrolü
```javascript
// Profile ekranında APNs Token görünüyor mu?
// Yoksa → Firebase Console'da APNs sertifikaları eksik
```

### Adım 2: Firebase Console Test
1. Firebase Console → Cloud Messaging → Send test message
2. FCM Token'ı yapıştırın
3. **"Notification title"** ve **"Notification text"** doldurun
4. Send butonuna tıklayın
5. Console loglarını kontrol edin

### Adım 3: Xcode Console
Xcode'dan uygulamayı çalıştırıp console'u kontrol edin:
- Firebase hataları var mı?
- APNs bağlantı hataları var mı?

## 🚨 En Yaygın Sorunlar

### Sorun 1: "APNs Token yok"
**Çözüm:** Firebase Console'da APNs sertifikalarını yapılandırın

### Sorun 2: "Bildirim geliyor ama görünmüyor"
**Çözüm:** Firebase Console'dan gönderirken "Notification title" ve "text" doldurun

### Sorun 3: "Hiç log görünmüyor"
**Çözüm:** 
- APNs sertifikalarını kontrol edin
- Token'ın doğru olduğundan emin olun
- Firebase Console'da hata mesajı var mı kontrol edin

### Sorun 4: "Invalid registration token"
**Çözüm:**
- Token'ı yeniden kopyalayın
- Uygulamayı yeniden başlatıp yeni token alın
- Firebase projesi doğru mu kontrol edin

## 📝 Test Senaryosu

1. ✅ Firebase Console'da APNs sertifikaları yapılandırılmış
2. ✅ Fiziksel cihazda development build yüklü
3. ✅ Profile → Push Notification Debug → APNs Token mevcut
4. ✅ Firebase Console → Send test message
5. ✅ "Notification title" ve "text" doldurulmuş
6. ✅ FCM Token doğru kopyalanmış
7. ✅ Send butonuna tıklanmış
8. ✅ Console loglarında bildirim alındı mesajları görünüyor

**Eğer hala çalışmıyorsa:**
- Firebase Console'da APNs sertifikalarını **mutlaka** kontrol edin
- Bu olmadan iOS push notification **kesinlikle** çalışmaz!
