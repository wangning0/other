;(function(window) {
    var EventUtil = {
        addHandler: function(elem, type, handler) {
            if(elem.addEventListener) {
                elem.addEventListener(type, handler);
            } else if(elem.attachEvent) {
                elem.attachEvent('on' + type, handler);
            } else {
                elem['on' + type] = handler;
            }
        },
        removeHandler: function(elem, type, handler) {
            if(elem.removeEventListener) {
                elem.removeEventListener(type, handler);
            } else if(elem.detachEvent) {
                elem.detachEvent('on' + type, handler);
            } else {
                elem['on' + type] = handler;
            }
        }
    }

    if(typeof define === 'function' && define.amd) {
        define(EventUtil);
    } else if(typeof module !== 'undefined' && module.exports) {
        module.exports = EventUtil;
    } else {
        window.EventUtil = EventUtil;
    }
})(window);