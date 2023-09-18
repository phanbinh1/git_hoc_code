
const getScrollBarWidth = () => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode && outer.parentNode.removeChild(outer);
    return `${scrollbarWidth}px`;
}

export default [
    {
        code: "--font-size",
        name: "Font size",
        value: "13px",
        type: "size",
        group: "layout"
    },
    {
        code: "--bg-primary",
        name: "Background primary",
        value: "#337ab7",
        type: "color",
        group: "layout"
    },
    {
        code: "--border-primary",
        name: "Border primary",
        value: "#2e6da4",
        type: "color",
        group: "layout"
    },
    {
        code: "--bg-success",
        name: "Background success",
        value: "#5cb85c",
        type: "color",
        group: "layout"
    },
    {
        code: "--border-success",
        name: "Border success",
        value: "#4cae4c",
        type: "color",
        group: "layout"
    },
    {
        code: "--bg-danger",
        name: "Background danger",
        value: "#d9534f",
        type: "color",
        group: "layout"
    },
    {
        code: "--border-danger",
        name: "Border danger",
        value: "#d43f3a",
        type: "color",
        group: "layout"
    },
    {
        code: "--bg-info",
        name: "Background info",
        value: "#46b8da",
        type: "color",
        group: "layout"
    },
    {
        code: "--border-info",
        name: "Border info",
        value: "#46b8da",
        type: "color",
        group: "layout"
    },
    {
        code: "--bg-warning",
        name: "Background warning",
        value: "#f0ad4e",
        type: "color",
        group: "layout"
    },
    {
        code: "--border-warning",
        name: "Border warning",
        value: "#eea236",
        type: "color",
        group: "layout"
    },
    {
        code: "--bg-img",
        name: "Background image",
        value: "url('/static/image/background.jpg')",
        type: "img",
        group: "layout"
    },
    {
        code: "--scroll-bar-width",
        name: "Scrollbar width",
        value: getScrollBarWidth(),
        type: "size",
        group: "layout"
    },
    {
        code: "--link-color",
        name: "Link color",
        value: "#189aff",
        type: "color",
        group: "layout"
    }
]