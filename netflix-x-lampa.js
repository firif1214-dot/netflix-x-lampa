(function () {
    'use strict';

    // SVG-иконка в стиле Netflix N
    var netflixSvg = '<svg viewBox="0 0 111 190" width="26" height="36" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));">' +
        '<path d="M0 0h36.5l38 106.5V0H111v190H75.5L36.5 81.5V190H0V0z" fill="#E50914"/>' +
        '<path d="M0 0h36.5l38 106.5L36.5 190H0V0z" fill="#B1060F" fill-opacity="0.35"/>' +
    '</svg>';

    function applyNetflixLogo() {
        // Ищем контейнер логотипа в шапке Lampa (подходит для старой и новой версий UI)
        var logoSelectors = [
            '.head__logo-icon',
            '.head__logo svg',
            '.head-logo__icon'
        ];

        logoSelectors.forEach(function (selector) {
            var el = document.querySelector(selector);
            if (el && !el.dataset.netflixPatched) {
                if (el.tagName.toLowerCase() === 'svg') {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = netflixSvg;
                    wrapper.dataset.netflixPatched = 'true';
                    el.parentNode.replaceChild(wrapper.firstChild, el);
                } else {
                    el.innerHTML = netflixSvg;
                    el.dataset.netflixPatched = 'true';
                }
            }
        });
    }

    function startPlugin() {
        // Запускаем при старте
        applyNetflixLogo();

        // Наблюдаем за DOM, если Lampa перерисует шапку
        var observer = new MutationObserver(function () {
            applyNetflixLogo();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Стандартная инициализация для плагинов Lampa
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();
