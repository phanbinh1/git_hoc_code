import React, { Fragment, useEffect, useState } from "react";
import { Tag, Input, Dropdown, Menu, Layout, Tree, Select, Button } from 'antd';
import { createID } from "../constants/main";
import { SortableHandle, SortableElement, SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from "moment";
import { dateFormat } from "../constants/controll";
import { download } from "../util/api_call";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const PageTest = () => {
    const ngay = "01/04/2021";
    const month = moment(ngay, dateFormat).month();
    useEffect(() => {
        alert(month + 1);
    }, [])
    return <Fragment>
        <Select
            onPopupScroll={e => console.log(e)}
        >
            {
                arr.map((item, i) => <Select.Option value={i}>{i}</Select.Option>)
            }
        </Select>
        <Button
            onClick={() => download({
                url: "http://192.168.2.188:8081/business/downloadfile/4"
            })}
        >
            Download
            </Button>
    </Fragment>
}

const DragHandle = SortableHandle(({ onEdit, onDelete, ...props }) => {
    return <Dropdown
        trigger={["contextMenu"]}
        overlay={<Menu>
            <Menu.Item onClick={onEdit}><i className="fa fa-pencil-square-o m-r-5" />Chỉnh sửa</Menu.Item>
            <Menu.Item onClick={onDelete}><i className="fa fa-trash m-r-5" />Xoá</Menu.Item>
        </Menu>}
    >
        <Tag {...props} />
    </Dropdown>;
});

const Item = SortableElement(props => {
    return <DragHandle {...props} />
});

const Container = SortableContainer((props) => {
    return <div {...props} style={{ display: "inline-block" }} />
});

const parameter = [
    {
        code: "thongBao",
        name: "Thông báo",
        children: [
            {
                code: "maThongBao",
                name: "Mã Thông Báo"
            },
            {
                code: "nguoiGui",
                name: "Người gửi",
                children: [
                    {
                        code: "fullName",
                        name: "Tên"
                    },
                    {
                        code: "avatar",
                        name: "Ảnh đại diện"
                    },
                ]
            },
            {
                code: "ngayTao",
                name: "Ngày tạo"
            },
            {
                code: "noiDungChiTiet",
                name: "Nội dung chi tiết"
            }
        ]
    }
]

const EditableTagGroup = () => {
    const [tags, setTags] = useState([]);
    const [id] = useState(createID())
    const [input, setInput] = useState({
        tag: null,
        label: null,
        focus: false,
        visible: false,
        code: null,
        type: 0,
        onShow: ({ type = 0 }) => setInput(input => ({ ...input, focus: true, visible: true, type, })),
        onEdit: (data) => setInput(input => ({ ...input, ...data, focus: true, visible: true, })),
        onChange: tag => setInput(input => ({ ...input, tag })),
        onBlur: () => {
            setInput(input => {
                if (input.tag) {
                    setTags(tags => {
                        const index = tags.findIndex(_t => _t.code === input.code);
                        if (index >= 0) {
                            tags[index].tag = input.tag;
                            tags[index].label = input.tag;
                            return tags;
                        }
                        else {
                            const tag = {
                                code: tags.length,
                                tag: input.tag,
                                label: input.tag,
                                type: input.type
                            };
                            return [...tags, tag];
                        }
                    })
                }
                return { ...input, visible: false, tag: null, label: null, focus: false, code: null }
            })
        },

    });
    const handleClose = (item_del) => setTags(tags => tags.filter(item => item.code !== item_del.code).map((item, code) => ({ ...item, code })))

    useEffect(() => {
        if (input.focus) {
            document.getElementById(id).focus();
        }
    }, [input.focus])

    useEffect(() => {
        console.log(tags);
    }, [tags])

    const renderTreeData = (data, level = 1, parent = "") => {
        if (Array.isArray(data) && data.length > 0) {
            return data.map((item, i) => <Tree.TreeNode
                title={item.name}
                key={`${level}-${i}`}
                {...item}
                parent={parent}
            >
                {renderTreeData(item.children, level + 1, `${parent}${item.code}.`)}
            </Tree.TreeNode>)
        }
        return null;
    }

    return <Fragment>
        <Layout>
            <Layout.Sider style={{ background: "none" }} width={input.type === 1 ? 300 : 0}>
                <Tree
                    autoExpandParent
                    onClick={(e, node) => {
                        const { props } = node;
                        const { code, parent, name, children } = props;
                        if (!children) {
                            setTags(tags => {
                                const tag = {
                                    code: tags.length,
                                    tag: `${parent}${code}`,
                                    type: 1,
                                    label: name
                                };
                                return [...tags, tag];
                            })
                        }
                    }} selectedKeys={[]}>
                    {renderTreeData(parameter)}
                </Tree>
            </Layout.Sider>
            <Layout.Sider style={{ background: "none" }}>
                {
                    input.visible ?
                        <Input
                            id={id}
                            type="text"
                            size="small"
                            value={input.tag}
                            onChange={e => input.onChange(e.target.value)}
                            onBlur={input.onBlur}
                        /> :
                        <Dropdown.Button
                            onClick={() => input.onShow({ type: input.type })}
                            trigger={["click"]}
                            overlay={<Menu>
                                <Menu.Item onClick={() => input.onShow({ type: 0 })}>
                                    Text
                        </Menu.Item>
                                <Menu.Item onClick={() => input.onShow({ type: 1 })}>
                                    Parameter
                        </Menu.Item>
                            </Menu>}
                        >
                            <i className="fa fa-plus m-r-5" /> Thêm {input.type === 0 ? "Chuỗi" : "Biến"}
                        </Dropdown.Button>
                }
            </Layout.Sider>
            <Layout>
                <Container
                    axis="xy"
                    useDragHandle
                    disableAutoscroll
                    helperClass="column-view-dragging"
                    onSortStart={() => document.body.classList.add("dragging")}
                    onSortEnd={({ newIndex, oldIndex }) => {
                        setTags(tags => arrayMove(tags, oldIndex, newIndex).map((item, code) => ({ ...item, code })));
                        document.body.classList.remove("dragging");
                    }}
                >
                    {tags.map((item, i) => <Item
                        index={i}
                        onDelete={() => handleClose(item)}
                        onEdit={() => input.onEdit(item)}
                        className={item.type === 0 ? "tag-text" : "tag-param"}
                    >
                        {item.label}
                    </Item>)}
                </Container>
            </Layout>
        </Layout>


    </Fragment >
}
export default PageTest;