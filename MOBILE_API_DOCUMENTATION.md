# Mobil Uygulama API Dokümantasyonu

Bu dokümantasyon, resource (personel) hesapları için mobil uygulama geliştiricilerine yönelik API endpoint'lerini içermektedir.

## İçindekiler

- [Genel Bilgiler](#genel-bilgiler)
- [Kimlik Doğrulama](#kimlik-doğrulama)
- [Randevu Yönetimi](#randevu-yönetimi)
- [Hata Kodları](#hata-kodları)
- [Örnek Kullanımlar](#örnek-kullanımlar)

---

## Genel Bilgiler

### Base URL
```
http://localhost:8080/api/v1
```

### Kimlik Doğrulama
Tüm endpoint'ler (login hariç) `Authorization` header'ında Bearer token gerektirir:

```
Authorization: Bearer <access_token>
```

### Response Formatı
Tüm başarılı yanıtlar JSON formatındadır. Hata durumlarında HTTP status code ve hata mesajı döner.

---

## Kimlik Doğrulama

### Resource Login

Resource hesabı ile giriş yapma. Email veya telefon numarası ile giriş yapılabilir.

**Endpoint:** `POST /auth/resource/login`

**Authentication:** Gerekmez (Public endpoint)

**Request Body:**
```json
{
  "email_or_phone": "resource@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "full_name": "Ahmet Usta",
    "email": "resource@example.com",
    "role": ""
  },
  "resource": {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAW",
    "name": "Ahmet Usta",
    "location": "Merkez Şube"
  }
}
```

**Error Responses:**

| Status Code | Açıklama |
|------------|----------|
| 400 | Geçersiz request formatı |
| 401 | Geçersiz email/telefon veya şifre |
| 500 | Sunucu hatası |

**Örnek Kullanım:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/resource/login \
  -H "Content-Type: application/json" \
  -d '{
    "email_or_phone": "resource@example.com",
    "password": "password123"
  }'
```

**Notlar:**
- `access_token` değerini tüm sonraki isteklerde `Authorization: Bearer <token>` header'ında kullanın
- Token'ın geçerlilik süresi config'de belirlenir (varsayılan: 24 saat)
- Token süresi dolduğunda tekrar login yapılmalıdır

---

## Randevu Yönetimi

### Kendi Randevularımı Listele

Resource hesabının kendi randevularını listeler. Sadece bu resource'a ait randevular görüntülenir.

**Endpoint:** `GET /appointments/my`

**Authentication:** Gerekli (Bearer token)

**Query Parameters:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| start_date | string | Hayır | Başlangıç tarihi (YYYY-MM-DD formatında) |
| end_date | string | Hayır | Bitiş tarihi (YYYY-MM-DD formatında) |
| status | string | Hayır | Randevu durumu (PENDING, CONFIRMED, CANCELLED, REJECTED) |
| location_id | string | Hayır | Şube ID'si (filtreleme için) |
| service_id | string | Hayır | Hizmet ID'si (filtreleme için) |
| customer_id | string | Hayır | Müşteri ID'si (filtreleme için) |
| search | string | Hayır | Müşteri adı veya telefon numarası ile arama |

**Success Response (200 OK):**
```json
[
  {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAX",
    "start_at": "2025-12-15T10:00:00Z",
    "end_at": "2025-12-15T10:30:00Z",
    "status": "PENDING",
    "customer_name": "Mehmet Yılmaz",
    "service_name": "Saç Kesimi",
    "resource_name": "Ahmet Usta"
  },
  {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAY",
    "start_at": "2025-12-15T14:00:00Z",
    "end_at": "2025-12-15T14:30:00Z",
    "status": "CONFIRMED",
    "customer_name": "Ayşe Demir",
    "service_name": "Saç Kesimi",
    "resource_name": "Ahmet Usta"
  }
]
```

**Error Responses:**

| Status Code | Açıklama |
|------------|----------|
| 401 | Geçersiz veya eksik token |
| 403 | Resource hesabı değil (sadece resource hesapları erişebilir) |
| 500 | Sunucu hatası |

**Örnek Kullanım:**
```bash
curl -X GET "http://localhost:8080/api/v1/appointments/my?start_date=2025-12-01&end_date=2025-12-31&status=PENDING" \
  -H "Authorization: Bearer <access_token>"
```

**Notlar:**
- Tarih formatı ISO 8601 (UTC timezone)
- `start_date` ve `end_date` belirtilmezse tüm randevular döner
- Sadece bu resource'a ait randevular görüntülenir (güvenlik)

---

### Randevu Onaylama

Resource hesabı kendi randevularını onaylayabilir.

**Endpoint:** `PUT /appointments/{id}/confirm`

**Authentication:** Gerekli (Bearer token)

**Path Parameters:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| id | string | Randevu ID'si (UUID) |

**Success Response (204 No Content):**
Başarılı durumda body dönmez, sadece 204 status code döner.

**Error Responses:**

| Status Code | Açıklama |
|------------|----------|
| 400 | Geçersiz randevu ID'si |
| 401 | Geçersiz veya eksik token |
| 403 | Bu randevu size ait değil (sadece kendi randevularınızı onaylayabilirsiniz) |
| 404 | Randevu bulunamadı |
| 500 | Sunucu hatası |

**Örnek Kullanım:**
```bash
curl -X PUT "http://localhost:8080/api/v1/appointments/01ARZ3NDEKTSV4RRFFQ69G5FAX/confirm" \
  -H "Authorization: Bearer <access_token>"
```

**Notlar:**
- Sadece kendi randevularınızı onaylayabilirsiniz
- Randevu durumu `PENDING` ise `CONFIRMED` olarak güncellenir
- Onaylanan randevular için müşteriye WhatsApp mesajı gönderilir (eğer WhatsApp token yapılandırılmışsa)

---

### Randevu İptal Etme

Resource hesabı kendi randevularını iptal edebilir.

**Endpoint:** `PUT /appointments/{id}/cancel`

**Authentication:** Gerekli (Bearer token)

**Path Parameters:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| id | string | Randevu ID'si (UUID) |

**Success Response (204 No Content):**
Başarılı durumda body dönmez, sadece 204 status code döner.

**Error Responses:**

| Status Code | Açıklama |
|------------|----------|
| 400 | Geçersiz randevu ID'si |
| 401 | Geçersiz veya eksik token |
| 403 | Bu randevu size ait değil |
| 404 | Randevu bulunamadı |
| 500 | Sunucu hatası |

**Örnek Kullanım:**
```bash
curl -X PUT "http://localhost:8080/api/v1/appointments/01ARZ3NDEKTSV4RRFFQ69G5FAX/cancel" \
  -H "Authorization: Bearer <access_token>"
```

**Notlar:**
- Sadece kendi randevularınızı iptal edebilirsiniz
- Randevu durumu `CANCELLED` olarak güncellenir
- İptal edilen randevular için müşteriye WhatsApp mesajı gönderilir

---

### Randevu Reddetme

Resource hesabı kendi randevularını reddedebilir.

**Endpoint:** `PUT /appointments/{id}/reject`

**Authentication:** Gerekli (Bearer token)

**Path Parameters:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| id | string | Randevu ID'si (UUID) |

**Success Response (204 No Content):**
Başarılı durumda body dönmez, sadece 204 status code döner.

**Error Responses:**

| Status Code | Açıklama |
|------------|----------|
| 400 | Geçersiz randevu ID'si |
| 401 | Geçersiz veya eksik token |
| 403 | Bu randevu size ait değil |
| 404 | Randevu bulunamadı |
| 500 | Sunucu hatası |

**Örnek Kullanım:**
```bash
curl -X PUT "http://localhost:8080/api/v1/appointments/01ARZ3NDEKTSV4RRFFQ69G5FAX/reject" \
  -H "Authorization: Bearer <access_token>"
```

**Notlar:**
- Sadece kendi randevularınızı reddedebilirsiniz
- Randevu durumu `REJECTED` olarak güncellenir
- Reddedilen randevular için müşteriye WhatsApp mesajı gönderilir

---

## Hata Kodları

### HTTP Status Kodları

| Status Code | Açıklama |
|------------|----------|
| 200 | Başarılı (GET, PUT için) |
| 201 | Oluşturuldu (POST için) |
| 204 | Başarılı, içerik yok (DELETE, PUT için) |
| 400 | Geçersiz istek (validation hatası) |
| 401 | Kimlik doğrulama gerekli veya geçersiz token |
| 403 | Yetki yok (resource ownership kontrolü) |
| 404 | Kaynak bulunamadı |
| 500 | Sunucu hatası |

### Hata Response Formatı

Hata durumlarında genellikle plain text hata mesajı döner:

```
invalid credentials
```

veya

```
access denied: you can only confirm your own appointments
```

---

## Örnek Kullanımlar

### Tam Akış Örneği

#### 1. Resource Login
```bash
# Login yap ve token al
curl -X POST http://localhost:8080/api/v1/auth/resource/login \
  -H "Content-Type: application/json" \
  -d '{
    "email_or_phone": "ahmet@example.com",
    "password": "password123"
  }'

# Response:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { ... },
#   "resource": { ... }
# }
```

#### 2. Randevuları Listele
```bash
# Bugünün randevularını getir
curl -X GET "http://localhost:8080/api/v1/appointments/my?start_date=2025-12-15&end_date=2025-12-15" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 3. Randevu Onayla
```bash
# Bir randevuyu onayla
curl -X PUT "http://localhost:8080/api/v1/appointments/01ARZ3NDEKTSV4RRFFQ69G5FAX/confirm" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Güvenlik Notları

1. **Token Güvenliği:**
   - Token'ları güvenli bir şekilde saklayın (Keychain/Keystore)
   - Token'ları log'lara yazmayın
   - HTTPS kullanın (production'da)

2. **Resource Isolation:**
   - Resource hesapları sadece kendi randevularına erişebilir
   - Token'daki `resource_id` ile otomatik filtreleme yapılır
   - Başka bir resource'ın randevusuna erişim denemesi 403 hatası döner

3. **Token Yenileme:**
   - Token süresi dolduğunda kullanıcıyı tekrar login ekranına yönlendirin
   - Token'ı her istekte kontrol edin

---

## Token Payload Yapısı

JWT token decode edildiğinde aşağıdaki bilgiler bulunur:

```json
{
  "user_id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
  "tenant_id": "01ARZ3NDEKTSV4RRFFQ69G5FAW",
  "role_id": "",
  "email": "resource@example.com",
  "user_type": "resource",
  "resource_id": "01ARZ3NDEKTSV4RRFFQ69G5FAX",
  "exp": 1734567890,
  "iat": 1734481490
}
```

**Önemli Alanlar:**
- `user_type`: "resource" olmalı
- `resource_id`: Bu resource'un ID'si (randevu filtreleme için kullanılır)
- `exp`: Token'ın sona erme zamanı (Unix timestamp)

---

## Randevu Durumları

| Durum | Açıklama |
|-------|----------|
| PENDING | Beklemede (henüz onaylanmamış) |
| CONFIRMED | Onaylanmış |
| CANCELLED | İptal edilmiş |
| REJECTED | Reddedilmiş |

---

## Tarih ve Saat Formatları

- **API Request/Response:** ISO 8601 formatında UTC timezone
  - Örnek: `2025-12-15T10:00:00Z`
  
- **Query Parameters:** YYYY-MM-DD formatında
  - Örnek: `2025-12-15`

**Not:** Randevu saatleri location timezone'unda saklanır, ancak API'den UTC olarak döner. Mobil uygulamada kullanıcının timezone'una göre dönüşüm yapılmalıdır.

---

## Rate Limiting

Şu anda rate limiting uygulanmamaktadır, ancak production'da eklenmesi önerilir.

---

## Destek

API ile ilgili sorularınız için:
- Backend geliştirici ile iletişime geçin
- API versiyonu: v1
- Son güncelleme: 2025-12-15

---

## Changelog

### v1.0.0 (2025-12-15)
- İlk sürüm
- Resource login endpoint'i eklendi
- Kendi randevularını listeleme endpoint'i eklendi
- Randevu onaylama/iptal/reddetme endpoint'leri eklendi
