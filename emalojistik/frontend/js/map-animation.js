// Basit Dünya Haritası Animasyonu
document.addEventListener('DOMContentLoaded', function() {
    console.log('Harita animasyonu başlatılıyor...');
    
    const worldMapStatic = document.querySelector('.world-map-static');
    
    if (!worldMapStatic) {
        console.error('Dünya haritası öğesi bulunamadı!');
        return;
    }
    
    // Var olan içeriği temizle
    const existingPoints = worldMapStatic.querySelectorAll('.location-point, .route-line, .package-animation');
    existingPoints.forEach(point => point.remove());
    
    // Rota noktaları ve hedef
    const routes = [
        { from: { x: 55.5, y: 39 }, to: { x: 82, y: 41 }, name: "İstanbul-Tokyo" },
        { from: { x: 23, y: 40 }, to: { x: 47, y: 37 }, name: "New York-Londra" },
        { from: { x: 70, y: 46 }, to: { x: 77, y: 42 }, name: "Delhi-Şangay" },
        { from: { x: 16, y: 42 }, to: { x: 35, y: 63 }, name: "Los Angeles-Rio" },
        { from: { x: 49, y: 38 }, to: { x: 59, y: 36 }, name: "Paris-Moskova" },
        { from: { x: 52, y: 70 }, to: { x: 85, y: 66 }, name: "Cape Town-Sydney" },
        { from: { x: 55.5, y: 39 }, to: { x: 47, y: 54 }, name: "İstanbul-Lagos" },
        { from: { x: 82, y: 41 }, to: { x: 16, y: 42 }, name: "Tokyo-San Francisco" }
    ];
    
    // Stil ekleyelim
    const styles = document.createElement('style');
    styles.innerHTML = `
        .location-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: rgba(230, 57, 70, 0.7);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(230, 57, 70, 0.5), 0 0 20px rgba(230, 57, 70, 0.3);
            z-index: 10;
            transform: translate(-50%, -50%);
            animation: pulse 2s infinite alternate;
        }
        
        .location-point:after {
            content: '';
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: rgba(230, 57, 70, 0.2);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: pulseRing 2s infinite;
        }
        
        .route-line {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, rgba(230,57,70,0.6) 0%, rgba(230,57,70,0.3) 100%);
            z-index: 9;
            transform-origin: left center;
        }
        
        .package-animation {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: rgba(255, 204, 0, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 15px rgba(255, 204, 0, 0.5), 0 0 30px rgba(255, 204, 0, 0.3);
            z-index: 11;
        }
        
        .route-label {
            position: absolute;
            font-size: 10px;
            color: rgba(20, 20, 20, 0.6);
            font-weight: bold;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            z-index: 12;
            pointer-events: none;
            text-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
            background-color: rgba(255, 255, 255, 0.5);
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                box-shadow: 0 0 10px rgba(230, 57, 70, 0.5), 0 0 20px rgba(230, 57, 70, 0.3);
            }
            100% {
                transform: translate(-50%, -50%) scale(1.3);
                box-shadow: 0 0 15px rgba(230, 57, 70, 0.5), 0 0 30px rgba(230, 57, 70, 0.3);
            }
        }
        
        @keyframes pulseRing {
            0% {
                width: 10px;
                height: 10px;
                opacity: 0.4;
            }
            100% {
                width: 25px;
                height: 25px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styles);
    
    // Nokta ve hatları oluştur
    routes.forEach((route, index) => {
        // Başlangıç noktası
        const startPoint = document.createElement('div');
        startPoint.className = 'location-point';
        startPoint.style.left = `${route.from.x}%`;
        startPoint.style.top = `${route.from.y}%`;
        worldMapStatic.appendChild(startPoint);
        
        // Başlangıç noktası etiketi
        const startLabel = document.createElement('div');
        startLabel.className = 'route-label';
        startLabel.style.left = `${route.from.x}%`;
        startLabel.style.top = `${route.from.y - 2}%`;
        startLabel.textContent = route.name.split('-')[0];
        worldMapStatic.appendChild(startLabel);
        
        // Hedef noktası
        const endPoint = document.createElement('div');
        endPoint.className = 'location-point';
        endPoint.style.left = `${route.to.x}%`;
        endPoint.style.top = `${route.to.y}%`;
        worldMapStatic.appendChild(endPoint);
        
        // Hedef noktası etiketi
        const endLabel = document.createElement('div');
        endLabel.className = 'route-label';
        endLabel.style.left = `${route.to.x}%`;
        endLabel.style.top = `${route.to.y - 2}%`;
        endLabel.textContent = route.name.split('-')[1];
        worldMapStatic.appendChild(endLabel);
        
        // Rota çizgisi (hat)
        const line = document.createElement('div');
        line.className = 'route-line';
        
        // Hat konumu ve uzunluk/açı hesaplamaları
        const deltaX = route.to.x - route.from.x;
        const deltaY = route.to.y - route.from.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        line.style.width = `${distance}%`;
        line.style.left = `${route.from.x}%`;
        line.style.top = `${route.from.y}%`;
        line.style.transform = `rotate(${angle}deg)`;
        
        // Uzun rotalar için dashed stil, kısa rotalar için solid stil
        if (distance > 30) {
            line.style.backgroundImage = 'linear-gradient(90deg, rgba(230,57,70,0.8) 50%, rgba(230,57,70,0) 0%)';
            line.style.backgroundSize = '14px 1px';
            line.style.backgroundRepeat = 'repeat-x';
        }
        
        worldMapStatic.appendChild(line);
        
        // Her bir rota için kendi animasyon keyframe'ini oluştur
        const keyframes = document.createElement('style');
        keyframes.innerHTML = `
            @keyframes movePackage${index} {
                0% { 
                    left: ${route.from.x}%; 
                    top: ${route.from.y}%;
                    opacity: 0;
                }
                5% {
                    opacity: 1;
                }
                95% {
                    opacity: 1;
                }
                100% { 
                    left: ${route.to.x}%; 
                    top: ${route.to.y}%;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(keyframes);
        
        // Paket sayısını rotanın uzunluğuna göre ayarla
        const packetCount = Math.ceil(distance / 20); // Her 20 birim için 1 paket
        
        // Paketleri oluştur
        for (let i = 0; i < packetCount; i++) {
            const pkg = document.createElement('div');
            pkg.className = 'package-animation';
            pkg.style.left = `${route.from.x}%`;
            pkg.style.top = `${route.from.y}%`;
            
            // Farklı hızlarda ve gecikmelerle animasyon
            const duration = 5 + (distance / 10); // Uzun rotalar için daha uzun süre
            const delay = (i * 3) + (index * 1.5); // Paketler ve rotalar arasında farklı gecikmeler
            
            pkg.style.animation = `movePackage${index} ${duration}s linear infinite`;
            pkg.style.animationDelay = `${delay}s`;
            
            worldMapStatic.appendChild(pkg);
        }
    });
    
    console.log('Harita animasyonu yüklendi!');
});
