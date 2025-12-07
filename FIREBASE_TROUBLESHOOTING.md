# Firebase Console Bildirim Sorun Giderme

## ✅ Durum
- APNs Console çalışıyor ✅
- Bildirim cihaza ulaşıyor ✅
- Firebase Console'dan bildirim gelmiyor ❌

## 🔍 Firebase Tarafında Olası Sorunlar

### 1. **Firebase Console - APNs Sertifikaları (EN KRİTİK!)**

Firebase Console, iOS bildirimleri göndermek için APNs sertifikalarına ihtiyaç duyar.

**Kontrol:**
1. Firebase Console → Project Settings → Cloud Messaging
2. iOS app bölümüne gidin
3. **APNs Authentication Key** veya **APNs Certificates** yapılandırılmış mı?

**Eğer yoksa:**
- APNs Console çalışıyor ama Firebase Console çalışmıyor
- Firebase Console'a APNs sertifikalarını yüklemelisiniz
- Apple Developer Console → Keys → APNs Key oluşturun
- Firebase Console → Cloud Messaging → iOS app → Upload

**⚠️ BU OLMADAN FIREBASE CONSOLE'DAN BİLDİRİM GÖNDERİLEMEZ!**

### 2. **FCM Token Kontrolü**

**Profile → Push Notification Debug:**
- [ ] FCM Token mevcut mu?
- [ ] FCM Token Firebase Console'a doğru kopyalandı mı?
- [ ] Token geçerli mi? (uygulamayı yeniden başlatıp yeni token alın)

### 3. **Firebase Console - Bildirim Formatı**

**Firebase Console → Cloud Messaging → Send test message:**

- [ ] **"Notification title"** doldurulmuş mu?
- [ ] **"Notification text"** doldurulmuş mu?
- [ ] Sadece "Custom data" kullanılmıyor mu?

**iOS'ta bildirim göstermek için `notification` payload'u MUTLAKA olmalı!**

### 4. **Console Logları Kontrolü**

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

### 5. **Firebase Projesi Kontrolü**

**GoogleService-Info.plist:**
- [ ] `PROJECT_ID` doğru mu?
- [ ] `BUNDLE_ID` doğru mu? (`app.wapoints.com`)
- [ ] `GOOGLE_APP_ID` doğru mu?

**Firebase Console:**
- [ ] Doğru projede misiniz?
- [ ] iOS app yapılandırılmış mı?

## 🎯 Adım Adım Kontrol

### Adım 1: Firebase Console - APNs Sertifikaları
1. Firebase Console → Project Settings → Cloud Messaging
2. iOS app bölümüne gidin
3. APNs Authentication Key veya Certificates var mı?
4. **Yoksa:** Apple Developer Console'dan APNs Key oluşturup Firebase'e yükleyin

### Adım 2: FCM Token Kontrolü
1. Profile → Push Notification Debug
2. FCM Token'ı kopyalayın
3. Firebase Console → Send test message
4. FCM Token'ı yapıştırın

### Adım 3: Bildirim Formatı
1. Firebase Console → Send test message
2. **"Notification title"** doldurun
3. **"Notification text"** doldurun
4. Send butonuna tıklayın

### Adım 4: Console Logları
1. Uygulamayı açık tutun
2. Firebase Console'dan bildirim gönderin
3. Console loglarını kontrol edin
4. `🔔 FOREGROUND NOTIFICATION RECEIVED` görünüyor mu?

## 🚨 En Yaygın Sorun

### "Firebase Console'dan bildirim gelmiyor ama APNs Console çalışıyor"

**Neden:**
- Firebase Console'da APNs sertifikaları yapılandırılmamış
- Firebase, APNs'e bağlanamıyor

**Çözüm:**
1. Firebase Console → Project Settings → Cloud Messaging → iOS app
2. APNs Authentication Key veya Certificates yükleyin
3. APNs Console'da kullandığınız aynı sertifikaları kullanın

## ✅ Kontrol Listesi

- [ ] Firebase Console'da APNs sertifikaları yapılandırılmış
- [ ] FCM Token mevcut ve doğru kopyalanmış
- [ ] Firebase Console'dan gönderirken "Notification title" ve "text" doldurulmuş
- [ ] Console loglarında bildirim alındı mesajları görünüyor
- [ ] Firebase projesi doğru
- [ ] GoogleService-Info.plist doğru

## 💡 İpucu

**APNs Console çalışıyorsa:**
- APNs sertifikaları doğru
- Device token doğru
- Environment doğru

**Firebase Console çalışmıyorsa:**
- Firebase Console'da APNs sertifikaları eksik olabilir
- Firebase Console'a APNs sertifikalarını yüklemelisiniz
