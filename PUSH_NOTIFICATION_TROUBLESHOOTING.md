# Push Notification Troubleshooting

## iOS Push Notification Sorun Giderme

### 1. APNs Sertifikaları Kontrolü

Firebase Console'da APNs sertifikalarının yapılandırıldığından emin olun:

1. Firebase Console → Project Settings → Cloud Messaging
2. iOS app bölümünde **APNs Authentication Key** veya **APNs Certificates** yapılandırılmış olmalı
3. Eğer yoksa:
   - Apple Developer Console'dan APNs Key oluşturun
   - Firebase Console'a yükleyin

### 2. Test Ortamı

**ÖNEMLİ:** iOS Simulator'da push notification **ÇALIŞMAZ**!
- Mutlaka **fiziksel iOS cihaz** kullanın
- Development build yüklü olmalı

### 3. Firebase Console'dan Test Bildirimi Gönderme

Firebase Console → Cloud Messaging → Send test message

**Doğru Format:**

```json
{
  "notification": {
    "title": "Test Bildirimi",
    "body": "Bu bir test bildirimidir"
  },
  "data": {
    "customKey": "customValue"
  }
}
```

**YANLIŞ Format (sadece data):**
```json
{
  "data": {
    "title": "Test",
    "body": "Test"
  }
}
```

**Not:** iOS'ta bildirim göstermek için `notification` payload'u **mutlaka** olmalı!

### 4. Token Kontrolü

Profile ekranında "Push Notification Debug" bölümünü açın:
- **FCM Token**: Backend'e kaydedilen token
- **APNs Token**: iOS için gerekli token (fiziksel cihazda olmalı)

Eğer APNs Token yoksa:
- Fiziksel cihaz kullanıldığından emin olun
- Firebase Console'da APNs sertifikalarını kontrol edin
- Uygulamayı yeniden başlatın

### 5. Bildirim Durumları

#### Foreground (Uygulama Açık)
- Bildirim `onMessage` handler'ına gelir
- Local notification olarak gösterilir
- Console'da `🔔 Foreground notification received` logunu görmelisiniz

#### Background (Uygulama Arka Planda)
- iOS otomatik olarak bildirimi gösterir
- `setBackgroundMessageHandler` çalışır
- Console'da `🔔 Background notification received` logunu görmelisiniz

#### Terminated (Uygulama Kapatılmış)
- iOS otomatik olarak bildirimi gösterir
- Kullanıcı bildirime tıklarsa uygulama açılır
- `getInitialNotification` ile kontrol edilir

### 6. Debug Logları

Uygulamayı çalıştırdığınızda şu logları kontrol edin:

```
📱 Notification permission status: 1 (AUTHORIZED)
✅ Notification permissions granted
🔔 Setting up notification listeners...
✅ Notification listeners set up successfully
📱 FCM Token retrieved: <token>
✅ APNs Token available: <token> (iOS only)
```

### 7. Yaygın Sorunlar

#### Bildirim Gelmiyor
- [ ] Fiziksel cihaz kullanılıyor mu? (Simulator çalışmaz)
- [ ] APNs sertifikaları Firebase Console'da yapılandırılmış mı?
- [ ] Firebase Console'dan gönderilen bildirimde `notification` payload'u var mı?
- [ ] Notification permissions verilmiş mi?
- [ ] APNs Token alınabiliyor mu? (Profile → Push Notification Debug)

#### Bildirim Geliyor Ama Gösterilmiyor
- [ ] Foreground'da mı test ediliyor? (Local notification gösterilir)
- [ ] Background'da mı test ediliyor? (iOS otomatik gösterir)
- [ ] Console loglarını kontrol edin

#### Token Backend'e Kaydedilmiyor
- [ ] Login sonrası console'da `📤 FCM Token Backend'e gönderiliyor` logunu görüyor musunuz?
- [ ] Backend endpoint'i çalışıyor mu?
- [ ] Network hatası var mı?

### 8. Test Adımları

1. **Uygulamayı fiziksel cihazda açın**
2. **Login yapın** - FCM token backend'e kaydedilmeli
3. **Profile → Push Notification Debug** açın
4. **APNs Token** kontrol edin (varsa ✅)
5. **Firebase Console** → Cloud Messaging → Send test message
6. **FCM Token'ı** kopyalayıp yapıştırın
7. **Notification title ve body** girin
8. **Send** butonuna tıklayın
9. **Console loglarını** kontrol edin
10. **Bildirimi** kontrol edin (foreground/background/terminated)

### 9. Production Build

Production build için:
- `app.json` → `ios.entitlements.aps-environment` → `"production"` olmalı
- Firebase Console'da production APNs sertifikaları yapılandırılmalı
