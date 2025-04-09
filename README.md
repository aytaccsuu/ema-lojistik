# EMA Lojistik Web Sitesi

Bu proje, EMA Lojistik şirketi için oluşturulmuş kurumsal web sitesidir.

## Özellikler

- Responsive tasarım - tüm cihazlarda uyumlu çalışır
- Dinamik harita animasyonu - dünya üzerinde gerçekleşen taşımacılık operasyonlarını görselleştirir
- İletişim formu - müşterilerin kolay iletişim kurabilmesini sağlar
- Teklif alma formu - hem bireysel hem kurumsal müşteriler için özelleştirilmiş teklif talep formu
- Modern ve hızlı arayüz
- SEO optimizasyonu

## Kurulum

1. Repoyu klonlayın:
   ```
   git clone https://github.com/kullanıcıadı/emalojistik.git
   cd emalojistik
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```

4. Üretim için build almak için:
   ```
   npm run build
   ```

## Proje Yapısı

```
emalojistik/
├── frontend/              # Web sitesi frontend dosyaları
│   ├── about.html         # Hakkımızda sayfası
│   ├── contact.html       # İletişim sayfası
│   ├── index.html         # Ana sayfa
│   ├── quote.html         # Teklif alma formu
│   ├── references.html    # Referanslar sayfası
│   ├── services.html      # Hizmetler sayfası
│   ├── css/               # CSS dosyaları
│   ├── js/                # JavaScript dosyaları
│   ├── images/            # Görseller
│   └── scss/              # SCSS dosyaları
├── .gitignore             # Git tarafından göz ardı edilecek dosyaları belirtir
├── gulpfile.js            # Gulp yapılandırma dosyası
├── package.json           # Node.js bağımlılıkları ve komutları
├── README.md              # Proje açıklaması (bu dosya)
├── .htaccess              # Apache web sunucusu yapılandırması
├── robots.txt             # Arama motoru robotları için yönergeler
└── sitemap.xml            # Site haritası
```

## Kullanılan Teknolojiler

- HTML5, CSS3, JavaScript ES6+
- SCSS - CSS Ön işlemcisi
- Gulp - Task runner
- Three.js - 3D animasyonlar için
- Bootstrap - Responsive layout için
- jQuery - DOM manipülasyonu
- Swiper - Slider ve carousel için

## Canlıya Alma

Deploy etmek için aşağıdaki adımları takip edin:

1. Üretim build'ini alın: `npm run build`
2. `dist` klasöründeki dosyaları web sunucunuza aktarın.

## İletişim

EMA Lojistik A.Ş.
Web: https://emalojistik.com
E-posta: info@emalojistik.com
