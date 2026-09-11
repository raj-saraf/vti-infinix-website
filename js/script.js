document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js-ready');
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const year = document.querySelectorAll('[data-year]');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = menu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            menu.classList.remove('open');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }));
    }

    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    });

    year.forEach(el => el.textContent = new Date().getFullYear());

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, {threshold: .12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    document.querySelectorAll('form[data-demo-form]').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const status = form.querySelector('.form-status');
            if (status) {
                status.textContent = 'Thank you. Your enquiry form is ready to be connected to the company email/backend.';
                status.style.color = '#04a53d';
            }
            form.reset();
        });
    });
});
