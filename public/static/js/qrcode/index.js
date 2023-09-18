
const onScanQRCodeSuccess = () => {
    var qrcode = Android.getQRCode();
    document.getElementById("qrcode").value = qrcode;
    const qrCodeElement = document.getElementById(qrcode);
    const redirect = qrCodeElement && qrCodeElement.getAttribute("redirect");
    window.location.hash = `qrcodeUrl=${encodeURIComponent(qrcode)}&redirect=${redirect}`;
}

const onIOSScanQRCodeSuccess = (qrcode) => {
    const qrCodeElement = document.getElementById(qrcode);
    const redirect = qrCodeElement && qrCodeElement.getAttribute("redirect");
    window.location.hash = `qrcodeUrl=${encodeURIComponent(qrcode)}&redirect=${redirect}`;
}

const showQR = () => {
    if (/UnitechAppIos/i.test(navigator.userAgent)) {
        return window.webkit.messageHandlers.scanHandler.postMessage({ callbackFunctionName: "onIOSScanQRCodeSuccess" });
    }
    if (/UnitechApp/i.test(navigator.userAgent)) {
        return Android.startScanQRCode();
    }
}