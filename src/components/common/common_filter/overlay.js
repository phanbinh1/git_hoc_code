import React from "react";
import ScrollArea from "react-perfect-scrollbar";

const FilterOverlay = ({
    selectedKeys = [],
    menus = [],
    onSelect,
    loading,
    setMouseEnter
}) => {
    return <div
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
    >
        <ScrollArea
            style={{ height: "100%", maxHeight: "100vh" }}
            onScroll={({ target }) => {
                const { scrollTop } = target;
                console.log(document.getElementById(`filter-item-0`).offsetTop, scrollTop);
            }}
        >
            <ul
                className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical menu-filter"
                role="menu"
                tabindex="0"
            >
                {
                    menus.map((item, i) => {
                        const selected = selectedKeys.findIndex(key => key === (item.isTitle ? i : item.key)) >= 0
                        const disabled = item.disabled || loading;

                        return item.type === "divider" ?
                            // <li className=" ant-dropdown-menu-item-divider" key={i} id={`filter-item-${i}`} /> :
                            null :
                            <li
                                key={item.isTitle ? i : item.key}
                                _key={item.key}
                                className={`${item.isTitle ? "item-title" : ""} ${selected ? "ant-dropdown-menu-item-selected" : ""} ${disabled ? "ant-dropdown-menu-item-disabled" : ""} ant-dropdown-menu-item`}
                                onClick={() => !disabled && onSelect(item.isTitle ? i : item.key, item)}
                                id={`filter-item-${i}`}
                            >
                                <i className={`fa ${item.iconCls || (selected ? "fa-check" : "fa-check fa-hide")} m-r-10`} />{item.label}
                            </li>
                    })
                }
            </ul>
        </ScrollArea>
    </div>
}

export default FilterOverlay;