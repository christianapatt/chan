document.addEventListener('DOMContentLoaded', () => {
    const letterC = document.querySelector('.letter-c');
    const mainHeart = document.getElementById('mainHeart');
    const sunsetBg = document.querySelector('.sunset-bg');
    let currentBackground = 0;
    const backgrounds = ['sunset-1', 'sunset-2', 'sunset-3', 'sunset-4'];

    // Create initial background hearts
    createBackgroundHearts();

    // Handle background change when clicking 'C'
    letterC.addEventListener('click', () => {
        sunsetBg.classList.remove(backgrounds[currentBackground]);
        currentBackground = (currentBackground + 1) % backgrounds.length;
        sunsetBg.classList.add(backgrounds[currentBackground]);
    });

    // Create floating hearts when clicking the main heart
    mainHeart.addEventListener('click', () => {
        createFloatingHearts();
    });

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
        }, 250);
    });
}); 