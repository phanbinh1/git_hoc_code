import React, { useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import * as main from "./../../../constants/main";
import { Spin } from 'antd';
import { CONST_PLUGINS_DEFAULT, CONST_TOOLBAR_DEFAULT } from "./constants";

const CommonEditor = ({
    content = "",
    onChange,
    resize = false,
    plugins = CONST_PLUGINS_DEFAULT,
    toolbar = CONST_TOOLBAR_DEFAULT,
    readOnly = false,
    height = "calc(100vh - 158px)",
    width = "calc(100% - 2px)",
    disabled = false,
    id = main.createID()
}) => {
    const [loading, setLoading] = useState(true);
    const getPlugins = () => {
        const _plugins = { ...CONST_PLUGINS_DEFAULT, ...plugins }
        return readOnly ? [] : [
            _plugins.textcolor ? "textcolor" : "",
            _plugins.print ? "print" : "",
            _plugins.preview ? "preview" : "",
            _plugins.paste ? "paste" : "",
            _plugins.importcss ? "importcss" : "",
            _plugins.searchreplace ? "searchreplace" : "",
            _plugins.autolink ? "autolink" : "",
            _plugins.directionality ? "directionality" : "",
            _plugins.code ? "code" : "",
            _plugins.visualblocks ? "visualblocks" : "",
            _plugins.visualchars ? "visualchars" : "",
            _plugins.fullscreen ? "fullscreen" : "",
            _plugins.image ? "image" : "",
            _plugins.link ? "link" : "",
            _plugins.media ? "media" : "",
            _plugins.template ? "template" : "",
            _plugins.codesample ? "codesample" : "",
            _plugins.table ? "table" : "",
            _plugins.charmap ? "charmap" : "",
            _plugins.hr ? "hr" : "",
            _plugins.pagebreak ? "pagebreak" : "",
            _plugins.nonbreaking ? "nonbreaking" : "",
            _plugins.anchor ? "anchor" : "",
            _plugins.toc ? "toc" : "",
            _plugins.insertdatetime ? "insertdatetime" : "",
            _plugins.advlist ? "advlist" : "",
            _plugins.lists ? "lists" : "",
            _plugins.wordcount ? "wordcount" : "",
            _plugins.imagetools ? "imagetools" : "",
            _plugins.textpattern ? "textpattern" : "",
            _plugins.noneditable ? "noneditable" : "",
            _plugins.help ? "help" : "",
            _plugins.charmap ? "charmap" : "",
            _plugins.quickbars ? "quickbars" : "",
            _plugins.emoticons ? "emoticons" : "",
        ];
    }

    const getToolBar = () => {
        const _toolbar = { ...CONST_TOOLBAR_DEFAULT, ...toolbar };
        return readOnly ? [] : [
            `
            ${_toolbar.bold ? "bold " : " "}
            ${_toolbar.italic ? "italic " : " "}
            ${_toolbar.underline ? "underline " : " "}
            ${_toolbar.strikethrough ? "strikethrough " : " "}
            | 
            ${_toolbar.fontselect ? "fontselect " : " "}
            ${_toolbar.fontsizeselect ? "fontsizeselect " : " "}
            ${_toolbar.formatselect ? "formatselect " : " "}
            | 
            ${_toolbar.alignleft ? "alignleft " : " "}
            ${_toolbar.aligncenter ? "aligncenter " : " "}
            ${_toolbar.alignright ? "alignright " : " "} 
            ${_toolbar.alignjustify ? "alignjustify " : " "}
            | 
            ${_toolbar.outdent ? "outdent " : " "}
            ${_toolbar.indent ? "indent " : " "}
            | 
            ${_toolbar.numlist ? "numlist " : ""}
            ${_toolbar.bullist ? "bullist " : ""}
            | 
            ${_toolbar.forecolor ? "forecolor " : ""}
            ${_toolbar.backcolor ? "backcolor " : ""}
            ${_toolbar.removeformat ? "removeformat " : ""}
            |
             `,
            `
            ${_toolbar.undo ? "undo " : " "}
            ${_toolbar.redo ? "redo " : " "}
            | 
            ${_toolbar.pagebreak ? "pagebreak " : " "}
            | 
            ${_toolbar.charmap ? "charmap " : " "}
            ${_toolbar.emoticons ? "emoticons " : " "}
            | 
            ${_toolbar.preview ? "preview " : " "}
            ${_toolbar.print ? "print " : " "}
            | 
            ${_toolbar.fullscreen ? "fullscreen " : " "}
            | 
            ${_toolbar.insertfile ? "insertfile " : " "}
            ${_toolbar.image ? "image " : " "}
            ${_toolbar.media ? "media " : " "}
            ${_toolbar.template ? "template " : " "}
            ${_toolbar.link ? "link " : " "}
            ${_toolbar.anchor ? "anchor " : " "}
            ${_toolbar.codesample ? "codesample " : " "}
            `,
        ];
    }

    return <div className={`${readOnly ? "ck-read-only" : ""} ${disabled ? "ck-disabled" : ""}`}>
        <Spin spinning={loading}>
            <Editor

                id={id}
                initialValue={content}
                onChange={e => {
                    onChange && onChange(e.target.getContent(), e)
                }}
                disabled={readOnly || disabled}
                apiKey="h0v8kz1clxerx9ccwm3h8bn8ho8hc4hfjmwwmwezy9bwrt16"
                init={{
                    strict_loading_mode: true,
                    language_url: "/static/tiny-editor/language/vi.min.js",
                    resize,
                    height,
                    width,
                    plugins: getPlugins(),
                    toolbar: getToolBar(),
                    init_instance_callback: (editor) => setLoading(false),
                    fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 36pt",
                    style_formats: [
                        { title: 'Line height 20px', selector: 'p,div,h1,h2,h3,h4,h5,h6', styles: { lineHeight: '20px' } },
                        { title: 'Line height 30px', selector: 'p,div,h1,h2,h3,h4,h5,h6', styles: { lineHeight: '30px' } }
                    ],
                    content_css: "/static/tiny-editor/css/custom.css",
                }}
            />
        </Spin>
    </div>
}

export default CommonEditor;