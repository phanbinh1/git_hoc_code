import React, { useState, Fragment } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { Document, Page, pdfjs, } from 'react-pdf';

const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}



const CommonViewPdf = ({
    url,
    viewPage,
    allowCoppy,
    height = "calc(100vh - 100px)"
}) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `/static/js/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pages, setPages] = useState([]);

    /*When document gets loaded successfully*/
    const onDocumentLoadSuccess = ({ numPages }) => {
        setPages(range(1, numPages));
    }

    const onLoadPage = (p) => {
        const page = document.querySelector(`.preview-pdf-page-${p}`);
        page && page.scrollIntoView();
    }
    return <Fragment>
        {viewPage && <Dropdown trigger={["click"]} overlay={<Menu>{pages.map(p => <Menu.Item key={p} onClick={() => onLoadPage(p)}>Trang {p}</Menu.Item>)}</Menu>}><Button>Trang <i className="fa fa-angle-down m-l-5" /></Button></Dropdown>}
        <div
            style={{
                height,
                overflow: "auto",
                userSelect: allowCoppy ? undefined : "none"
            }}
        >
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                className="preview-pdf"
            >
                {
                    pages.map(p => <Page
                        className={`preview-pdf-page-${p}`}
                        pageNumber={p}
                        key={p}
                        style={{ fontSize: 30 }}
                        object-fit="fill"
                        size="A4"
                    >
                    </Page>)
                }
            </Document>
        </div>
    </Fragment>
}

export default CommonViewPdf