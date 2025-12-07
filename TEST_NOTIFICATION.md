# Push Notification Test Rehberi

## Token Kopyalama

1. Profile ekranına gidin
2. "Push Notification Debug" bölümünü açın
3. FCM Token veya APNs Token'ın yanındaki **kopyala butonuna** tıklayın
4. Token panoya kopyalanır

## Firebase Console'dan Test Bildirimi Gönderme

### Adım 1: Firebase Console'a Gidin
- Firebase Console → Cloud Messaging → Send test message

### Adım 2: Token'ı Girin
- Profile ekranından FCM Token'ı kopyalayın
- Firebase Console'daki "FCM registration token" alanına yapıştırın

### Adım 3: Bildirim Formatı (ÖNEMLİ!)

**✅ DOĞRU Format (iOS için zorunlu):**
```
Notification title: Test Bildirimi
Notification text: Bu bir test bildirimidir
```

**❌ YANLIŞ Format (sadece data):**
- Sadece "Additional options" → "Custom data" kullanmayın
- iOS'ta bildirim gösterilmez!

### Adım 4: Test Senaryoları

#### Senaryo 1: Foreground (Uygulama Açık)
1. Uygulamayı açık tutun
2. Firebase Console'dan bildirim gönderin
3. Console'da şu logları görmelisiniz:
   ```
   🔔 Foreground notification received: {...}
   📱 Showing local notification: {...}
   ✅ Local notification scheduled successfully
   ```
4. Bildirim ekranda görünmelidir

#### Senaryo 2: Background (Uygulama Arka Planda)
1. Uygulamayı arka plana alın (home tuşuna basın)
2. Firebase Console'dan bildirim gönderin
3. Console'da şu logları görmelisiniz:
   ```
   🔔 Background notification received: {...}
   🔔 Background notification title: ...
   🔔 Background notification body: ...
   ```
4. iOS otomatik olarak bildirimi gösterir (bildirim merkezinde)

#### Senaryo 3: Terminated (Uygulama Kapatılmış)
1. Uygulamayı tamamen kapatın
2. Firebase Console'dan bildirim gönderin
3. iOS otomatik olarak bildirimi gösterir
4. Bildirime tıklarsanız uygulama açılır
5. Console'da `🔔 App opened from notification` logunu görmelisiniz

## Sorun Giderme

### Bildirim Gelmiyor

1. **Token Kontrolü:**
   - Profile → Push Notification Debug
   - FCM Token ve APNs Token mevcut mu?
   - APNs Token yoksa → Fiziksel cihaz kullanın (Simulator çalışmaz)

2. **Firebase Console Format:**
   - "Notification title" ve "Notification text" doldurulmuş mu?
   - Sadece "Custom data" kullanmayın!

3. **APNs Sertifikaları:**
   - Firebase Console → Project Settings → Cloud Messaging
   - iOS app için APNs Authentication Key veya Certificates yapılandırılmış mı?

4. **Console Logları:**
   - Uygulama açıkken console loglarını kontrol edin
   - `🔔 Foreground notification received` görünüyor mu?
   - `🔔 Background notification received` görünüyor mu?

5. **Test Ortamı:**
   - Fiziksel iOS cihaz kullanılıyor mu? (Simulator çalışmaz)
   - Development build yüklü mü?

### Bildirim Geliyor Ama Gösterilmiyor

1. **Foreground:**
   - Local notification gösterilir
   - `expo-notifications` handler çalışıyor mu?

2. **Background:**
   - iOS otomatik gösterir
   - Bildirim merkezini kontrol edin

3. **Permissions:**
   - Ayarlar → [Uygulama Adı] → Bildirimler
   - Bildirimler açık mı?

## Debug Checklist

- [ ] FCM Token mevcut
- [ ] APNs Token mevcut (iOS)
- [ ] Notification permissions granted
- [ ] Firebase Console'da APNs sertifikaları yapılandırılmış
- [ ] Firebase Console'dan gönderilen bildirimde "Notification title" ve "text" var
- [ ] Fiziksel cihaz kullanılıyor (Simulator değil)
- [ ] Console loglarında bildirim alındı mesajları görünüyor
