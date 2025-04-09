// Truck Animation
document.addEventListener('DOMContentLoaded', function() {
    // Animasyonları başlat
    initTruckAnimations();
    
    // Tekerlekleri döndür
    animateWheels();
});

// Kamyon animasyonlarını başlatan ve yöneten fonksiyon
function initTruckAnimations() {
    // Tüm kamyonlar için seçiciler
    const trucks = [
        document.querySelector('.truck-1'),
        document.querySelector('.truck-2'),
        document.querySelector('.truck-3'),
        document.querySelector('.truck-4'),
        document.querySelector('.truck-5')
    ];
    
    // Her kamyon için farklı gecikme değerleri (saniye cinsinden)
    const delays = [0, 6, 12, 18, 24];
    
    // Her kamyonu konumlandır ve animasyonunu başlat
    trucks.forEach((truck, index) => {
        // Animasyonu sıfırla
        truck.style.animation = 'none';
        truck.style.right = '-400px';
        void truck.offsetWidth; // Reflow
        
        // Animasyonu başlat
        truck.style.animation = `moveTruckRightToLeft 30s linear infinite ${delays[index]}s`;
        
        // Animasyon tamamlandığında sıfırlama
        truck.addEventListener('animationiteration', function() {
            console.log(`Truck ${index + 1} animation completed`);
            // Kamyonu yeniden konumlandır
            this.style.animation = 'none';
            this.style.right = '-400px';
            void this.offsetWidth; // Reflow
            this.style.animation = `moveTruckRightToLeft 30s linear infinite`;
        });
    });
}

// Sayfayı yenilemeden animasyonları tekrar başlatmak için bir EventListener
window.addEventListener('resize', function() {
    // Ekran boyutu değiştiğinde animasyonları sıfırla
    initTruckAnimations();
});

// Tekerlekleri döndüren fonksiyon
function animateWheels() {
    // Get all wheels
    const wheels = document.querySelectorAll('.wheel');
    
    // Tekerlekleri döndüren CSS animasyonu ekle
    wheels.forEach(wheel => {
        wheel.style.animation = 'wheelRotation 1.5s linear infinite';
    });
}

// Tekerlek animasyonu için CSS ekle
if (!document.getElementById('wheel-animation-style')) {
    const style = document.createElement('style');
    style.id = 'wheel-animation-style';
    style.textContent = `
        @keyframes wheelRotation {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .wheel {
            transform-origin: center center;
        }
    `;
    document.head.appendChild(style);
} 