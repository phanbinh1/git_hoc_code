let interval = null;

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const cssRuleSet = (selector, property, value, important) => {
    try {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var ss = document.styleSheets[i];
            var r = ss.cssRules ? ss.cssRules : ss.rules;

            for (var j = 0; j < r.length; j++) {
                if (r[j].selectorText && r[j].selectorText == selector) {
                    if (typeof important == 'undefined') { r[j].style.setProperty(property, value); }
                    else { r[j].style.setProperty(property, value, 'important'); }
                    break;
                }
            }
        }
    }
    catch (e) { if (e.name !== 'SecurityError') { console.log('Developer: ' + e); } }
}

window.onblur = () => document.body.setAttribute("_focus", "0");
window.onfocus = () => document.body.setAttribute("_focus", "1");
window.addEventListener('DOMNodeInserted', (e) => {
    const tblHeaders = document.querySelectorAll(".ant-table-header.ant-table-hide-scrollbar:not([_height])");
    tblHeaders.forEach((elm, i) => {
        elm.setAttribute("_height", elm.clientHeight);
        elm.id = makeid(10);
        new ResizeObserver(() => {
            elm.setAttribute("_height", elm.clientHeight);
        }).observe(elm);
    })
}, false)

window.onload = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (!Notification) {
            console.warn('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    });
    document.body.setAttribute("_focus", "1")
    if (navigator.userAgent.search("Chrome") > -1) {
        document.body.setAttribute("_browser", "chrome");
    } else if (navigator.userAgent.search("Firefox") > -1) {
        document.body.setAttribute("_browser", "firefox");
    } else if (navigator.userAgent.search("MSIE 9.0") > -1) {
        document.body.setAttribute("_browser", "MSIE");
        document.body.setAttribute("_browser-version", "9.0");
    } else if (navigator.userAgent.search("MSIE 8.0") > -1) {
        document.body.setAttribute("_browser", "MSIE");
        document.body.setAttribute("_browser-version", "8.0");
    }
} 