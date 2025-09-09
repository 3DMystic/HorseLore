const mobileNav = document.querySelector('.mobileNav');

mobileNav.addEventListener('click', () => {
    const navMenu = document.querySelector('.navList');
    if (navMenu.style.display === "none") {
        navMenu.style.display = "flex";
    } else {
        navMenu.style.display = "none";
    }
});