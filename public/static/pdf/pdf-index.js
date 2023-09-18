let qrCode = {
    url: null,
    width: 100,
    height: 100
}
const zoom = 1;
const showPDF = (pdf_url) => {
    PDFJS.getDocument({ url: pdf_url }).then((pdfDoc) => {
        loadPdf(pdfDoc);
    }).catch(function (error) {
        alert(error.message);
    });
}

const getCursorPosition = (element, event) => {
    var rect = element.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {
        x,
        y,
        left: rect.left,
        top: rect.top,
        clientX: element.clientX,
        clientY: element.clientY,
        clientHeight: element.clientHeight,
        clientWidth: element.clientWidth,
    };
}

const onStartLoading = () => {
    document.getElementById("loading").style.display = "block";
}
const onEndLoading = () => {
    document.getElementById("loading").style.display = "none";
}
const loadPdf = (pdfDoc) => {
    const imgWrapper = document.getElementById("img-wrapper");
    onStartLoading();
    for (let page_no = 1; page_no <= pdfDoc.numPages; page_no++) {
        const pdfContent = document.getElementById("pdf-content");
        const canvas = document.createElement("canvas");
        canvas.id = `pdf-canvas-${page_no}`;
        canvas.setAttribute("width", `${794 * zoom}`);
        canvas.style.width = "794px";
        pdfContent.appendChild(canvas);
        const canvasCtx = canvas.getContext('2d');
        // Fetch the page
        pdfDoc.getPage(page_no).then(function (page) {
            var scale_required = canvas.width / page.getViewport(1).width;
            var viewport = page.getViewport(scale_required);
            canvas.height = viewport.height;

            var renderContext = {
                canvasContext: canvasCtx,
                viewport: viewport
            };
            page.render(renderContext).then(function () {
                const imgContainer = document.createElement("div");
                imgContainer.style.position = "relative";
                const imgElm = document.createElement("img");
                imgContainer.addEventListener("mouseenter", (e) => {
                    if (qrCode.url) {
                        const imgQrcode = document.createElement("img");
                        imgQrcode.setAttribute("src", qrCode.url);
                        imgQrcode.style.width = `${qrCode.width}px`;
                        imgQrcode.style.height = `${qrCode.height}px`;


                        let qrcodeBorder = document.getElementById(`pdf-qrcode-border-${page_no}`);
                        if (!qrcodeBorder) {
                            qrcodeBorder = document.createElement("span");
                            qrcodeBorder.id = `pdf-qrcode-border-${page_no}`;
                            qrcodeBorder.style.position = "absolute";
                            qrcodeBorder.style.width = `${qrCode.width}px`;
                            qrcodeBorder.style.height = `${qrCode.height}px`;
                            qrcodeBorder.style.border = "1px solid #ccc";
                            qrcodeBorder.style.display = "none";

                            imgContainer.appendChild(qrcodeBorder);
                        }

                        const { x, y, clientWidth, clientHeight } = getCursorPosition(imgContainer, e);
                        imgContainer.clientHeight

                        qrcodeBorder.style.display = "block";
                        qrcodeBorder.style.top = `${y <= (qrCode.height / 2) ? 0 : y >= clientHeight - (qrCode.height / 2) ? clientHeight - qrCode.height : y - (qrCode.height / 2)}px`;
                        qrcodeBorder.style.left = `${x <= (qrCode.width / 2) ? 0 : x >= clientWidth - (qrCode.width / 2) ? clientWidth - qrCode.width : x - (qrCode.width / 2)}px`;
                        qrcodeBorder.innerHTML = "";
                        qrcodeBorder.appendChild(imgQrcode);
                    }
                })
                imgContainer.addEventListener("mousemove", (e) => {
                    if (qrCode.url) {
                        const { x, y, clientWidth, clientHeight } = getCursorPosition(imgContainer, e);
                        const qrcodeBorder = document.getElementById(`pdf-qrcode-border-${page_no}`);
                        qrcodeBorder.style.top = `${y <= (qrCode.height / 2) ? 0 : y >= clientHeight - (qrCode.height / 2) ? clientHeight - qrCode.height : y - (qrCode.height / 2)}px`;
                        qrcodeBorder.style.left = `${x <= (qrCode.width / 2) ? 0 : x >= clientWidth - (qrCode.width / 2) ? clientWidth - qrCode.width : x - (qrCode.width / 2)}px`;
                    }
                })
                imgContainer.addEventListener("mouseleave", (e) => {
                    if (qrCode.url) {
                        const qrcodeBorder = document.getElementById(`pdf-qrcode-border-${page_no}`);
                        qrcodeBorder.style.display = "none";
                    }
                })
                imgContainer.addEventListener("click", (e) => {
                    if (qrCode.url) {
                        const { x, y, clientWidth, clientHeight } = getCursorPosition(imgContainer, e);
                        const qrcodeBorder = document.getElementById(`pdf-qrcode-border-${page_no}`);
                        qrcodeBorder.innerHTML = "loading...";
                        onStartLoading();
                        const _canvas = document.getElementById(`pdf-canvas-${page_no}`);
                        const _canvasCtx = _canvas.getContext('2d');
                        var img = new Image;
                        img.src = qrCode.url;
                        img.className = "img-qrcode-canvas";
                        img.alt = "loading...";
                        img.height = `${qrCode.height}px`;
                        img.width = `${qrCode.width}`
                        img.style.border = "10px solid #ccc";
                        img.style.borderRadius = "50px";
                        img.onload = function () {
                            const { x, y } = getCursorPosition(imgElm, e);
                            const _x = x <= (qrCode.width / 2) ? 0 : x >= clientWidth - (qrCode.width / 2) ? clientWidth - qrCode.width : x - (qrCode.width / 2);
                            const _y = y <= (qrCode.height / 2) ? 0 : y >= clientHeight - (qrCode.height / 2) ? clientHeight - qrCode.height : y - (qrCode.height / 2);
                            _canvasCtx.drawImage(img, _x * zoom * zoom, _y * zoom * zoom, qrCode.width * zoom * zoom, qrCode.height * zoom * zoom);
                            _canvasCtx.scale(1 / zoom, 1 / zoom)
                            imgElm.setAttribute("src", _canvas.toDataURL());
                            onEndLoading();
                            qrcodeBorder.innerHTML = "";
                            qrcodeBorder.style.display = "none";
                            qrCode.url = null;
                        };
                    }
                })
                imgContainer.style.width = "794px";
                imgElm.style.width = "100%";
                imgContainer.style.border = "1px solid";
                imgContainer.appendChild(imgElm);
                imgWrapper.appendChild(imgContainer);
                imgElm.setAttribute("alt", "loading...");
                canvasCtx.scale(1 / zoom, 1 / zoom)
                imgElm.setAttribute("src", canvas.toDataURL());
                if (page_no === pdfDoc.numPages) {
                    onEndLoading();
                }
            });
        });
    }

}

const onBtnClick = (id) => {
    const file = document.getElementById(id);
    file.click();
}

const onFileChange = (type) => {
    if (type === 1) {
        const fileElm = document.getElementById("file-to-upload");
        const file = fileElm.files[0];
        const fileUrl = URL.createObjectURL(file);
        showPDF(fileUrl);
    }
    if (type === 2) {
        const fileElm = document.getElementById("qrcode-to-upload");
        const file = fileElm.files[0];
        const fileUrl = URL.createObjectURL(file);
        qrCode.url = fileUrl;
    }
}

const downloadPdf = async () => {
    onStartLoading();
    const wrapperElm = document.getElementById("pdf-content");
    var pdf = new jsPDF('p', 'px', 'a4');
    let canvas = [];
    wrapperElm.childNodes.forEach(item => {
        if (item.nodeName === "CANVAS") {
            canvas.push(item);
        }
    })
    for (var i = 0; i < canvas.length; i++) {
        const _canvas = canvas[i];
        const __canvasCtx = _canvas.getContext('2d');
        __canvasCtx.scale(1 / zoom, 1 / zoom)
        pdf.addImage(_canvas.toDataURL(), 'JPG', 0, 0);
        if (i !== canvas.length - 1) {
            pdf.addPage();
        }
    }
    await pdf.save(window.prompt("Nhập tên file muốn lưu trữ"));
    onEndLoading();
}