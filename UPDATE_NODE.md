# Node.js Güncelleme Talimatları

Expo SDK 54 için Node.js >= 20.19.4 gerekiyor. Şu anki versiyonunuz: 20.19.2

## nvm ile Güncelleme (Önerilen)

1. En son LTS versiyonunu yükleyin:
```bash
nvm install --lts
nvm use --lts
```

veya belirli bir versiyon:
```bash
nvm install 20.19.4
nvm use 20.19.4
```

2. Varsayılan versiyon olarak ayarlayın:
```bash
nvm alias default 20.19.4
```

3. Versiyonu kontrol edin:
```bash
node --version
```

## Homebrew ile Güncelleme

```bash
brew upgrade node
```

## Sonraki Adımlar

Node.js'i güncelledikten sonra:

```bash
npm install
npx expo install --fix
```

Bu komutlar Expo SDK 54 ile uyumlu tüm paketleri otomatik olarak yükleyecektir.

