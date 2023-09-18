if (/UnitechApp/i.test(navigator.userAgent) || /UnitechAppIos/i.test(navigator.userAgent)) {
    document.body.setAttribute("_enviroment", "app")
    document.body.setAttribute("_operating-system", /UnitechApp/i.test(navigator.userAgent) ? "android" : "ios");
}
else {
    document.body.setAttribute("_enviroment", "web");
    document.body.setAttribute("_operating-system", "");
}