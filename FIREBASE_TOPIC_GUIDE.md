# Firebase Topic Bildirim Rehberi

## ✅ Topic Subscription

Uygulama otomatik olarak "test" topic'ine abone oluyor:
- Login olduğunuzda veya FCM token alındığında
- Console'da `✅ Successfully subscribed to topic: test` logunu görmelisiniz

## 📤 Firebase Console'dan Topic'e Bildirim Gönderme

### Adım 1: Firebase Console'a Gidin
- Firebase Console → Cloud Messaging → **"Send test message"** veya **"New notification"**

### Adım 2: Topic Seçin
- **"Send to"** → **"Topic"** seçin
- Topic adını girin: **`test`**

### Adım 3: Bildirim İçeriğini Girin (KRİTİK!)

**✅ DOĞRU Format:**

1. **"Notification title"** alanına bir başlık girin:
   ```
   Test Topic Bildirimi
   ```

2. **"Notification text"** alanına bir metin girin:
   ```
   Bu bir topic bildirimidir
   ```

**❌ YANLIŞ Format (iOS'ta çalışmaz!):**
- Sadece "Custom data" kullanmak
- "Notification title" ve "Notification text" boş bırakmak

### Adım 4: Send

## 🔍 Sorun Giderme

### Topic Subscription Kontrolü

**Console loglarını kontrol edin:**
```
📡 Subscribing to topic: test...
✅ Successfully subscribed to topic: test
```

**Eğer bu loglar görünmüyorsa:**
- FCM token alınamamış olabilir
- Topic subscription başarısız olmuş olabilir
- Hata loglarını kontrol edin

### Firebase Console - Topic Bildirimi Gönderme

**Firebase Console → Cloud Messaging → New notification:**

1. **"Send to"** → **"Topic"** seçildi mi?
2. Topic adı: **`test`** yazıldı mı?
3. **"Notification title"** dolduruldu mu?
4. **"Notification text"** dolduruldu mu?

### Console Logları Kontrolü

Uygulamayı açık tutup Firebase Console'dan topic'e bildirim gönderin:

**Foreground (Uygulama açık):**
```
🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
🔔 Topic: /topics/test
```

**Background (Uygulama arka planda):**
```
🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
🔔 Topic: /topics/test
```

**Eğer bu loglar görünmüyorsa:**
- Topic subscription başarısız olmuş olabilir
- Firebase Console'da APNs sertifikaları eksik olabilir
- Bildirim formatı yanlış olabilir

## 🚨 Yaygın Sorunlar

### Sorun 1: "Topic subscription başarısız"
**Çözüm:**
- FCM token alınabiliyor mu kontrol edin
- Console'da hata loglarını kontrol edin
- Firebase Console'da APNs sertifikalarını kontrol edin

### Sorun 2: "Topic'e bildirim gönderildi ama gelmiyor"
**Çözüm:**
- Firebase Console'da "Notification title" ve "text" doldurun
- Console loglarını kontrol edin
- Topic subscription başarılı mı kontrol edin

### Sorun 3: "Topic subscription logu görünmüyor"
**Çözüm:**
- FCM token alınabiliyor mu kontrol edin
- `getFCMToken()` fonksiyonu çağrılıyor mu?
- Login sonrası token alınıyor mu?

## ✅ Kontrol Listesi

- [ ] Console'da `✅ Successfully subscribed to topic: test` logunu görüyor musunuz?
- [ ] Firebase Console → New notification → Topic: `test` seçildi mi?
- [ ] Firebase Console'da "Notification title" ve "text" dolduruldu mu?
- [ ] Firebase Console'da APNs sertifikaları yapılandırılmış mı?
- [ ] Console loglarında bildirim alındı mesajları görünüyor mu?

## 💡 İpucu

**Topic subscription başarılı olduğunda:**
- Console'da `✅ Successfully subscribed to topic: test` logunu görmelisiniz
- Firebase Console'dan topic'e bildirim gönderebilirsiniz
- Bildirim geldiğinde `🔔 Topic: /topics/test` logunu görmelisiniz
