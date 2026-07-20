/* Rottenberg's Catering — shared behavior */
(function () {
    // footer year
    document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // mobile nav
    var mb = document.getElementById('menuBtn');
    var nav = document.querySelector('.nav');
    if (mb && nav) {
        mb.addEventListener('click', function () { nav.classList.toggle('open'); });
        nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') nav.classList.remove('open'); });
    }

    // active nav link (match by pathname)
    var page = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav a').forEach(function (a) {
        var href = (a.getAttribute('href') || '').split('#')[0];
        if (href && href === page && !a.classList.contains('nav-order')) a.classList.add('active');
    });

    // back to top
    var btn = document.getElementById('backToTop');
    if (btn) {
        var toggle = function () { btn.classList.toggle('visible', window.scrollY > 500); };
        window.addEventListener('scroll', toggle, { passive: true });
        btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        toggle();
    }

    // reveal on scroll
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
})();

/* Linen color modal (used on linens.html) */
function openColorModal(color, name) {
    var m = document.getElementById('colorModal');
    if (!m) return;
    document.getElementById('modalBigDot').style.background = color;
    document.getElementById('modalName').textContent = name;
    m.classList.add('active');
}
function closeColorModal() {
    var m = document.getElementById('colorModal');
    if (m) m.classList.remove('active');
}
