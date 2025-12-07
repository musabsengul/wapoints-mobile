# APNs Console'da Başarılı Ama Bildirim Görünmüyor

## ✅ Durum
- APNs Console'da bildirim **başarıyla gönderildi**
- Cihaza **başarıyla ulaştı**
- Ama uygulamada **görünmüyor**

## 🔍 Sorun Nerede?

Bildirim cihaza ulaşıyor ama uygulamada görünmüyorsa, sorun **uygulama tarafında**.

## 📋 Kontrol Listesi

### 1. Console Loglarını Kontrol Edin

Uygulamayı açık tutup APNs Console'dan bildirim gönderin:

**Foreground (Uygulama açık):**
```
🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========
```

**Background (Uygulama arka planda):**
```
🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========
```

**Eğer bu loglar görünmüyorsa:**
- Handler'lar çalışmıyor
- Uygulama bildirimi almıyor
- Firebase Messaging yapılandırması sorunlu olabilir

### 2. Test Senaryoları

#### Senaryo A: Foreground Test
1. Uygulamayı **açık tutun**
2. APNs Console'dan bildirim gönderin
3. **Console loglarını kontrol edin:**
   - `🔔 FOREGROUND NOTIFICATION RECEIVED` görünüyor mu?
   - `✅ Local notification scheduled successfully` görünüyor mu?
4. **Bildirim ekranda görünmeli** (local notification olarak)

**iOS'ta foreground'da bildirim:**
- iOS otomatik göstermez
- `onMessage` handler'ına gelir
- Biz local notification olarak gösteriyoruz

#### Senaryo B: Background Test
1. Uygulamayı **arka plana alın** (home tuşuna basın)
2. APNs Console'dan bildirim gönderin
3. **Console loglarını kontrol edin:**
   - `🔔 BACKGROUND NOTIFICATION RECEIVED` görünüyor mu?
4. **iOS bildirim merkezinde görünmeli**

**iOS'ta background'da bildirim:**
- iOS otomatik gösterir
- `setBackgroundMessageHandler` çalışır
- Bildirim merkezinde görünür

#### Senaryo C: Terminated Test
1. Uygulamayı **tamamen kapatın**
2. APNs Console'dan bildirim gönderin
3. **iOS bildirim merkezinde görünmeli**

### 3. Notification Permissions

**Ayarlar → [Uygulama Adı] → Bildirimler**
- [ ] Bildirimler açık mı?
- [ ] İzinler verilmiş mi?

### 4. Uygulama State Kontrolü

**Foreground'da test ediyorsanız:**
- iOS otomatik bildirim göstermez
- Console'da `🔔 FOREGROUND NOTIFICATION RECEIVED` logunu görmelisiniz
- Local notification olarak gösterilir

**Background'da test ediyorsanız:**
- iOS otomatik bildirim gösterir
- Console'da `🔔 BACKGROUND NOTIFICATION RECEIVED` logunu görmelisiniz
- Bildirim merkezinde görünür

## 🚨 Yaygın Sorunlar

### Sorun 1: "Console'da hiç log görünmüyor"
**Çözüm:**
- Handler'lar düzgün kurulmamış olabilir
- Uygulamayı yeniden başlatın
- `setupNotificationListeners()` çalışıyor mu kontrol edin

### Sorun 2: "Foreground'da bildirim görünmüyor"
**Çözüm:**
- iOS foreground'da otomatik göstermez
- Console'da `🔔 FOREGROUND NOTIFICATION RECEIVED` logunu kontrol edin
- Local notification gösteriliyor mu kontrol edin

### Sorun 3: "Background'da bildirim görünmüyor"
**Çözüm:**
- Bildirim merkezini kontrol edin (ekranın üstünden aşağı kaydırın)
- Ayarlar → Bildirimler → [Uygulama Adı] → Bildirimler açık mı?

## ✅ Debug Adımları

1. **Uygulamayı açık tutun**
2. **APNs Console'dan bildirim gönderin**
3. **Console loglarını kontrol edin:**
   - Log görünüyor mu?
   - Hangi handler çalışıyor?
   - Hata var mı?

4. **Uygulamayı arka plana alın**
5. **APNs Console'dan bildirim gönderin**
6. **Bildirim merkezini kontrol edin**

## 💡 İpucu

**Foreground'da test ediyorsanız:**
- Console'da log görünmeli
- Local notification ekranda görünmeli

**Background'da test ediyorsanız:**
- Console'da log görünmeli (arka planda çalışıyorsa)
- Bildirim merkezinde görünmeli

**Terminated'da test ediyorsanız:**
- Bildirim merkezinde görünmeli
- Bildirime tıklarsanız uygulama açılır
