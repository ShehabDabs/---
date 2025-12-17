// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع صُنّاع الأمل جاهز!');
    
    // عناصر التنقل
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تبديل القائمة المحمولة
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // التمرير السلس
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // ارتفاع شريط التنقل
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحديث الرابط النشط أثناء التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // تأثير شريط التنقل عند التمرير
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(46,125,50,0.95), rgba(21,101,192,0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2E7D32, #1565C0)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // تأثيرات الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر للظهور التدريجي
    const animateElements = document.querySelectorAll('.about-card, .service-card, .activity-item, .volunteer-way');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // تأثيرات إضافية للرسوم المتحركة
    const heroAnimations = document.querySelector('.hero-animations');
    if (heroAnimations) {
        // تأثير التفاعل مع الماوس
        heroAnimations.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        heroAnimations.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // تحريك العناصر العائمة بشكل عشوائي
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // تحديد مواضع عشوائية
        const randomTop = Math.random() * 80 + 10; // بين 10% و 90%
        const randomLeft = Math.random() * 80 + 10; // بين 10% و 90%
        
        element.style.top = randomTop + '%';
        element.style.left = randomLeft + '%';
        
        // تحريك مستمر
        setInterval(() => {
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;
            
            element.style.transition = 'all 10s ease-in-out';
            element.style.top = newTop + '%';
            element.style.left = newLeft + '%';
        }, 10000 + index * 2000); // تأخير مختلف لكل عنصر
    });
    
    // معالجة النماذج
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // محاكاة إرسال البيانات
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'جاري الإرسال...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    });
    
    // تأثيرات الهوفر للبطاقات
    const cards = document.querySelectorAll('.about-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير الكتابة التدريجية للعنوان الرئيسي
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // بدء الكتابة بعد تأخير قصير
        setTimeout(typeWriter, 1000);
    }
    
    // تحسين أداء الرسوم المتحركة
    let ticking = false;
    
    function updateAnimations() {
        // تحديث مواضع العناصر المتحركة
        const wheelchairIcon = document.querySelector('.wheelchair-icon');
        const walkingStick = document.querySelector('.walking-stick');
        const signLanguage = document.querySelector('.sign-language');
        const supportHands = document.querySelector('.support-hands');
        
        if (wheelchairIcon) {
            const scrollY = window.pageYOffset;
            const speed = scrollY * 0.1;
            
            wheelchairIcon.style.transform = `translateY(${Math.sin(speed * 0.01) * 10}px)`;
            
            if (walkingStick) {
                walkingStick.style.transform = `translateY(${Math.cos(speed * 0.01) * 8}px)`;
            }
            
            if (signLanguage) {
                signLanguage.style.transform = `translateY(${Math.sin(speed * 0.015) * 12}px)`;
            }
            
            if (supportHands) {
                supportHands.style.transform = `translateY(${Math.cos(speed * 0.012) * 6}px)`;
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    // تطبيق التحديثات عند التمرير
    window.addEventListener('scroll', requestTick);
    
    // تأثير الضغط على الأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // تحسين التفاعل مع لمس الشاشة
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // تحسين الهوفر للأجهزة اللمسية
        const hoverElements = document.querySelectorAll('.about-card, .service-card, .activity-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
    
    // إضافة تأثيرات صوتية (اختيارية)
    function addSoundEffects() {
        // يمكن إضافة أصوات للتفاعلات هنا
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // محاكاة صوت النقر
                if (window.AudioContext || window.webkitAudioContext) {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = 800;
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                }
            });
        });
    }
    
    // تفعيل التأثيرات الصوتية (معطلة افتراضياً)
    // addSoundEffects();
    
    // معلومات إضافية للمطورين
    console.log('🌟 موقع صُنّاع الأمل');
    console.log('💻 تم التطوير باستخدام: HTML5, CSS3, JavaScript');
    console.log('♿ مصمم لدعم ذوي الهمم');
    console.log('🎯 المبادرة: كلية الآداب - جامعة المنوفية');
    
    // إحصائيات الأداء
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ تم تحميل الموقع في: ${Math.round(loadTime)}ms`);
    });
});

// دوال مساعدة إضافية
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// تحسين إمكانية الوصول
function enhanceAccessibility() {
    // إضافة دعم لقارئ الشاشة
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.alt) {
            img.alt = 'صورة توضيحية لموقع صُنّاع الأمل';
        }
    });
    
    // تحسين التنقل بلوحة المفاتيح
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #FF6F00';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // دعم اختصارات لوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // Alt + H للانتقال للصفحة الرئيسية
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + C للانتقال لصفحة التواصل
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Escape لإغلاق القائمة المحمولة
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}

// تفعيل تحسينات إمكانية الوصول
enhanceAccessibility();

// حفظ تفضيلات المستخدم
function saveUserPreferences() {
    const preferences = {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches
    };
    
    // تطبيق التفضيلات
    if (preferences.reducedMotion) {
        document.body.classList.add('reduced-motion');
        // تقليل الرسوم المتحركة
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    if (preferences.highContrast) {
        document.body.classList.add('high-contrast');
    }
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// تحميل تفضيلات المستخدم
function loadUserPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        // تطبيق التفضيلات المحفوظة
    }
}

// تفعيل حفظ وتحميل التفضيلات
saveUserPreferences();
loadUserPreferences();