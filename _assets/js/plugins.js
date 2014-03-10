/* ==========================================================================
   /* Avoid `console` errors in browsers that lack a console.
========================================================================== */
    (function() {
        var method;
        var noop = function noop() {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());

/* ==========================================================================
   /* Carrega os plugins que serão usados no site
========================================================================== */
    // Determina o caminho padrão da pasta de plugins
        function getPathPlugins(plugins){
            for (i in plugins) {
                plugins[i] = '_assets/plugins/' + plugins[i] + "/scripts.min.js";
            }
            return plugins;
        }

    // Determina os plugins que serão carregados pelo nome da pasta onde está localizado
        $(document).ready(function() {
            Modernizr.load({
                load: getPathPlugins( [ 'carouFredSel', 'Fancybox', 'jScrollPane', 'Mouse-wheel', 'Roundabout', 'touchSwipe'] ),
                complete: function(){
                    initPage();                             
                }
            });
        });
