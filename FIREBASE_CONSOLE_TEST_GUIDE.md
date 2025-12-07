# Firebase Console'dan Test Bildirimi Gönderme - Detaylı Rehber

## ⚠️ ÖNEMLİ: iOS için Bildirim Formatı

iOS'ta push notification göndermek için **MUTLAKA** `notification` payload'u olmalıdır. Sadece `data` payload'u ile iOS bildirim göstermez!

## Adım Adım Test

### 1. Firebase Console'a Gidin
- Firebase Console → Cloud Messaging → **"Send test message"** butonuna tıklayın

### 2. Token'ı Girin
- Profile ekranından FCM Token'ı kopyalayın
- Firebase Console'daki **"FCM registration token"** alanına yapıştırın

### 3. Bildirim İçeriğini Girin (KRİTİK!)

**✅ DOĞRU Format:**

1. **"Notification title"** alanına bir başlık girin:
   ```
   Test Bildirimi
   ```

2. **"Notification text"** alanına bir metin girin:
   ```
   Bu bir test bildirimidir
   ```

3. **"Additional options"** → **"Custom data"** (opsiyonel):
   ```
   Key: testKey
   Value: testValue
   ```

**❌ YANLIŞ Format (iOS'ta çalışmaz!):**

- Sadece "Custom data" kullanmak
- "Notification title" ve "Notification text" boş bırakmak
- Sadece data payload'u göndermek

### 4. Test Senaryoları

#### Senaryo A: Foreground (Uygulama Açık)
1. Uygulamayı açık tutun
2. Firebase Console'dan "Send" butonuna tıklayın
3. **Console loglarını kontrol edin:**
   ```
   🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
   🔔 Full message: {...}
   🔔 Notification title: Test Bildirimi
   🔔 Notification body: Bu bir test bildirimidir
   ✅ Local notification scheduled successfully
   ```
4. **Bildirim ekranda görünmelidir**

#### Senaryo B: Background (Uygulama Arka Planda)
1. Uygulamayı arka plana alın (home tuşuna basın)
2. Firebase Console'dan "Send" butonuna tıklayın
3. **Console loglarını kontrol edin:**
   ```
   🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
   🔔 Full message: {...}
   🔔 Notification title: Test Bildirimi
   🔔 Notification body: Bu bir test bildirimidir
   ```
4. **iOS bildirim merkezinde bildirim görünmelidir**

#### Senaryo C: Terminated (Uygulama Kapatılmış)
1. Uygulamayı tamamen kapatın (swipe up)
2. Firebase Console'dan "Send" butonuna tıklayın
3. **iOS bildirim merkezinde bildirim görünmelidir**
4. Bildirime tıklarsanız uygulama açılır
5. Console'da `🔔 App opened from notification` logunu görmelisiniz

## Sorun Giderme

### Bildirim Gelmiyor

#### 1. Firebase Console Format Kontrolü
- [ ] "Notification title" doldurulmuş mu?
- [ ] "Notification text" doldurulmuş mu?
- [ ] Sadece "Custom data" kullanılmıyor mu?

#### 2. APNs Sertifikaları
Firebase Console → Project Settings → Cloud Messaging → iOS app
- [ ] APNs Authentication Key yapılandırılmış mı?
- [ ] VEYA APNs Certificates yapılandırılmış mı?
- [ ] Development/Production sertifikası doğru mu?

#### 3. Token Kontrolü
Profile → Push Notification Debug
- [ ] FCM Token mevcut mu?
- [ ] APNs Token mevcut mu? (iOS için zorunlu)
- [ ] Token'lar Firebase Console'a doğru kopyalandı mı?

#### 4. Test Ortamı
- [ ] Fiziksel iOS cihaz kullanılıyor mu? (Simulator çalışmaz!)
- [ ] Development build yüklü mü?
- [ ] `app.json` → `ios.entitlements.aps-environment` → `"development"` mu?

#### 5. Console Logları
Uygulama açıkken console'u kontrol edin:
- [ ] `🔔 Foreground notification received` görünüyor mu?
- [ ] `🔔 Background notification received` görünüyor mu?
- [ ] Herhangi bir hata mesajı var mı?

### Bildirim Geliyor Ama Gösterilmiyor

#### Foreground
- Local notification gösterilir
- `expo-notifications` handler çalışıyor mu?
- Console'da `✅ Local notification scheduled successfully` görünüyor mu?

#### Background
- iOS otomatik gösterir
- Bildirim merkezini kontrol edin (ekranın üstünden aşağı kaydırın)
- Ayarlar → Bildirimler → [Uygulama Adı] → Bildirimler açık mı?

### Yaygın Hatalar

#### Hata 1: "Invalid registration token"
- Token yanlış kopyalanmış olabilir
- Token'ı yeniden kopyalayın
- Uygulamayı yeniden başlatıp yeni token alın

#### Hata 2: "MismatchSenderId"
- Firebase projesi yanlış olabilir
- `GoogleService-Info.plist` dosyasını kontrol edin

#### Hata 3: Bildirim geliyor ama görünmüyor
- iOS'ta sadece data payload gönderilmiş olabilir
- "Notification title" ve "text" mutlaka doldurulmalı

## Debug Checklist

Test öncesi kontrol listesi:

- [ ] Fiziksel iOS cihaz kullanılıyor (Simulator değil)
- [ ] Development build yüklü
- [ ] FCM Token mevcut ve kopyalandı
- [ ] APNs Token mevcut (iOS için zorunlu)
- [ ] Firebase Console'da APNs sertifikaları yapılandırılmış
- [ ] Firebase Console'dan gönderilen bildirimde "Notification title" ve "text" var
- [ ] Notification permissions verilmiş
- [ ] Console logları açık ve kontrol ediliyor

## Test Sonrası

Bildirim geldiğinde console'da şunları görmelisiniz:

**Foreground:**
```
🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
🔔 Full message: {...}
🔔 Notification title: Test Bildirimi
🔔 Notification body: Bu bir test bildirimidir
✅ Local notification scheduled successfully
```

**Background:**
```
🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
🔔 Full message: {...}
🔔 Notification title: Test Bildirimi
🔔 Notification body: Bu bir test bildirimidir
```

Eğer bu loglar görünmüyorsa, bildirim Firebase'den uygulamaya ulaşmıyor demektir. APNs sertifikalarını ve token'ları kontrol edin.
