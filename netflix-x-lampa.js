(function () {
    'use strict';

    var netflixSvg = '<svg viewBox="0 0 111 190" width="26" height="36" xmlns="http://www.w3.org/2000/svg" data-netflix-logo="true" style="display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.6))">' +
        '<path d="M0 0h36.5l38 106.5V0H111v190H75.5L36.5 81.5V190H0V0z" fill="#E50914"/>' +
        '<path d="M0 0h36.5l38 106.5L36.5 190H0V0z" fill="#B1060F" fill-opacity=".35"/>' +
        '</svg>';

    function applyNetflixLogo() {
        var selectors = ['.head__logo-icon', '.head-logo__icon', '.head__logo svg'];

        for (var i = 0; i < selectors.length; i++) {
            var elements = document.querySelectorAll(selectors[i]);

            for (var j = 0; j < elements.length; j++) {
                var el = elements[j];
                if (el.getAttribute('data-netflix-logo') === 'true') continue;

                if (el.tagName && el.tagName.toLowerCase() === 'svg') {
                    var container = document.createElement('div');
                    container.innerHTML = netflixSvg;
                    if (el.parentNode) el.parentNode.replaceChild(container.firstChild, el);
                } else {
                    el.setAttribute('data-netflix-logo', 'true');
                    el.innerHTML = netflixSvg;
                }
            }
        }
    }

    function start() {
        applyNetflixLogo();

        if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function () {
                applyNetflixLogo();
            });
            observer.observe(document.body || document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    }

    function waitForLampa() {
        if (window.appready) {
            start();
        } else if (window.Lampa && window.Lampa.Listener && typeof window.Lampa.Listener.follow === 'function') {
            window.Lampa.Listener.follow('app', function (event) {
                if (event && event.type === 'ready') start();
            });
        } else if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', start);
        } else {
            start();
        }
    }

    waitForLampa();
})();
