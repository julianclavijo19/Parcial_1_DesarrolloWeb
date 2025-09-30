export const initAnimations = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }

    const loginLink = document.getElementById('login-link');
    if (loginLink && mainContent) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.classList.remove('fade-in');
            mainContent.classList.add('fade-out');
            setTimeout(() => { window.location.href = loginLink.href; }, 500);
        });
    }

    const mainContainer = document.querySelector('.main-container');
    const bannerSection = document.getElementById('banner-section-container');
    if (mainContainer && bannerSection) {
        const handleScrollAnimation = () => {
            if (window.scrollY > bannerSection.offsetHeight * 0.5) {
                mainContainer.classList.add('show-content');
                window.removeEventListener('scroll', handleScrollAnimation);
            }
        };
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation();
    }
};