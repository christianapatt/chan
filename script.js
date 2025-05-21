document.addEventListener('DOMContentLoaded', () => {
    const letterC = document.querySelector('.letter-c');
    const mainHeart = document.getElementById('mainHeart');
    const sunsetBg = document.querySelector('.sunset-bg');
    let currentBackground = 0;
    const backgrounds = ['sunset-1', 'sunset-2', 'sunset-3', 'sunset-4'];

    // Create initial effects
    createBackgroundHearts();
    createParticles();
    createSnowfall();

    // Create snowfall effect
    function createSnowfall() {
        const snowflakes = ['❄', '❅', '❆'];
        const numSnowflakes = 30;
        
        for (let i = 0; i < numSnowflakes; i++) {
            createSnowflake(snowflakes);
        }
    }

    function createSnowflake(snowflakes) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        
        // Random position
        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;
        
        // Random size
        const size = 0.8 + Math.random() * 1.2;
        snowflake.style.fontSize = `${size}rem`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 10;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Random opacity
        snowflake.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        document.body.appendChild(snowflake);
        
        // Remove and recreate snowflake after animation
        setTimeout(() => {
            snowflake.remove();
            createSnowflake(snowflakes);
        }, duration * 1000);
    }

    // Enhanced sparkle creation
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 16; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random direction and distance
            const angle = (i * 22.5) + Math.random() * 15;
            const distance = 40 + Math.random() * 40;
            const tx = Math.cos(angle * Math.PI / 180) * distance;
            const ty = Math.sin(angle * Math.PI / 180) * distance;
            
            // Random size
            const size = 2 + Math.random() * 3;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            sparkle.style.left = `${centerX}px`;
            sparkle.style.top = `${centerY}px`;
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // Handle background change when clicking 'C'
    letterC.addEventListener('click', () => {
        sunsetBg.classList.remove(backgrounds[currentBackground]);
        currentBackground = (currentBackground + 1) % backgrounds.length;
        sunsetBg.classList.add(backgrounds[currentBackground]);
        createSparkles(letterC);
    });

    // Create floating hearts and sparkles when clicking the main heart
    mainHeart.addEventListener('click', () => {
        createFloatingHearts();
        createSparkles(mainHeart);
        mainHeart.classList.add('clicked');
        setTimeout(() => mainHeart.classList.remove('clicked'), 1000);
    });

    // Create floating particles in the background
    function createParticles() {
        const numParticles = 15;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Random size
            const size = 20 + Math.random() * 30;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position and animation delay
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            document.body.appendChild(particle);
        }
    }

    function createBackgroundHearts() {
        const numHearts = 20; // Increased number of background hearts
        const container = document.querySelector('.floating-hearts-container');
        
        for (let i = 0; i < numHearts; i++) {
            createHeart(container, true);
        }
    }

    function createHeart(container, isBackground = false) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Get viewport dimensions
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        // Random position across the entire viewport
        const startX = Math.random() * viewportWidth;
        const startY = Math.random() * viewportHeight;
        
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        
        // Random size between 0.8rem and 2.5rem
        const size = 0.8 + Math.random() * 1.7;
        heart.style.fontSize = `${size}rem`;
        
        // Random animation duration
        const duration = isBackground ? (4 + Math.random() * 6) : (3 + Math.random() * 4);
        heart.style.animationDuration = `${duration}s`;
        
        // Random animation delay for background hearts
        if (isBackground) {
            heart.style.animationDelay = `${Math.random() * 8}s`;
            heart.style.opacity = '0.6';
        }

        // Random animation type for more variety
        const animations = ['float-up', 'float-up-left', 'float-up-right'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        heart.style.animationName = randomAnimation;
        
        // Random rotation
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(heart);
        
        // Remove heart after animation and create new one if it's a background heart
        setTimeout(() => {
            heart.remove();
            if (isBackground) {
                createHeart(container, true);
            }
        }, duration * 1000);
    }

    function createFloatingHearts() {
        const numHearts = 50; // Increased number of hearts
        const container = document.querySelector('.floating-hearts-container');
        
        // Create hearts in bursts
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                for (let i = 0; i < numHearts / 3; i++) {
                    createHeart(container, false);
                }
            }, burst * 300); // Stagger the bursts
        }
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const container = document.querySelector('.floating-hearts-container');
            container.innerHTML = ''; // Clear existing hearts
            createBackgroundHearts(); // Recreate background hearts
            
            // Remove and recreate particles and snowflakes
            document.querySelectorAll('.particle, .snowflake').forEach(p => p.remove());
            createParticles();
            createSnowfall();
        }, 250);
    });
}); 
