// Mobil menü kontrolü
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    const header = document.querySelector('.header');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            navbarToggler.classList.toggle('active');
        });
        
        // Sayfa dışına tıklandığında menüyü kapat
        document.addEventListener('click', function(event) {
            if (!navbarNav.contains(event.target) && !navbarToggler.contains(event.target)) {
                navbarNav.classList.remove('active');
                navbarToggler.classList.remove('active');
            }
        });
        
        // Pencere boyutu değiştiğinde menüyü kontrol et
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                navbarNav.classList.remove('active');
                navbarToggler.classList.remove('active');
            }
            
            // Mobil görünümde içerik yüksekliği ayarla
            adjustContentHeight();
        });
    }
    
    // Mobil görünümde menü öğesine tıklandığında menüyü kapat
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navbarNav.classList.remove('active');
                navbarToggler.classList.remove('active');
            }
        });
    });
    
    // Scroll işlemi sırasında header'ı küçült
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('header-shrink');
        } else {
            header.classList.remove('header-shrink');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobil görünümde içerik yüksekliği ayarla
    function adjustContentHeight() {
        if (window.innerWidth <= 768) {
            const headerHeight = header ? header.offsetHeight : 0;
            document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
        }
    }
    
    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde içerik yüksekliğini ayarla
    adjustContentHeight();
}); 