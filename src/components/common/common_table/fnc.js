import * as main from "./../../../constants/main";
import moment from 'moment';
import { dateFormat } from "./../../../constants/controll";
import _ from "lodash";

/**
 * 
 * @param {*} controllerKey 
 * 
 *  CancelRequest
 *  lấy controller dựa vào controllers(redux) và controolerKey(props)
 *  nếu có thì controller.abort();
 */
export const cancelRequest = (controllerKey) => state => {
    const controllers = state.core.controllers;
    const index = controllers.findIndex(item => item.key === controllerKey);
    if (index !== -1 && controllers[index].controller) {
        controllers[index].controller.abort();
    }
};


/**
 * 
 * @param {*} format 
 */
export const formatClassName = (format) => {
    let result = "";
    if (format) {
        result += format.font_b ? " font-b" : "";
        result += format.font_i ? " font-i" : "";
        result += format.font_u ? " font-u" : "";
    }
    return result;
};

/**
 * 
 * @param {*} arrIndex 
 * @param {*} colKeys 
 * @param {*} callback 
 * @param {*} columns 
 * @param {*} pageKey 
 */
export const handleResize = (arrIndex, colKeys, callback, columns = [], pageKey) => (e, { size }) => {
    let nextColumns1 = [...columns], nextColumns2 = [], nextColumns3 = [], nextColumns4 = [], nextColumns5 = [];
    let columnWidth = main.getColumnsLocalStorage({ pageKey }).width;
    let i1 = -1, i2 = -1, i3 = -1, i4 = -1, i5 = -1;
    switch (arrIndex.length) {
        case 1:
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            nextColumns1[i1] = {
                ...nextColumns1[i1],
                width: size.width,
            };
            columnWidth[colKeys[0]] = { width: nextColumns1[i1].width };
            break;
        case 2:
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            nextColumns2 = [...nextColumns1[i1].children];
            i2 = nextColumns2.findIndex(item => item.colKey === colKeys[1]);
            nextColumns2[i2] = {
                ...nextColumns2[i2],
                width: size.width,
            };
            columnWidth[colKeys[1]] = { width: nextColumns2[i2].width };
            nextColumns1[i1] = {
                ...nextColumns1[i1],
                children: [...nextColumns2]
            };
            columnWidth[colKeys[0]] = { width: nextColumns1[i1].width };
            break;
        case 3:
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            nextColumns2 = [...nextColumns1[i1].children];

            i2 = nextColumns2.findIndex(item => item.colKey === colKeys[1]);
            nextColumns3 = [...nextColumns2[i2].children];

            i3 = nextColumns3.findIndex(item => item.colKey === colKeys[2]);

            nextColumns3[i3] = {
                ...nextColumns3[i3],
                width: size.width
            };
            columnWidth[colKeys[2]] = { width: nextColumns3[i3].width };
            nextColumns2[i2] = {
                ...nextColumns2[i2],
                children: [
                    ...nextColumns3
                ]
            };
            columnWidth[colKeys[1]] = { width: nextColumns2[i2].width };
            nextColumns1[i1] = {
                ...nextColumns1[i1],
                children: [...nextColumns2]
            };
            columnWidth[colKeys[0]] = { width: nextColumns1[i1].width };
            break;
        case 4:
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            nextColumns2 = [...nextColumns1[i1].children];

            i2 = nextColumns2.findIndex(item => item.colKey === colKeys[1]);
            nextColumns3 = [...nextColumns2[i2].children];

            nextColumns4 = [...nextColumns3[i3].children];
            i3 = nextColumns3.findIndex(item => item.colKey === colKeys[2]);

            i4 = nextColumns4.findIndex(item => item.colKey === colKeys[3]);

            nextColumns4[i4] = {
                ...nextColumns4[i4],
                width: size.width
            };
            columnWidth[colKeys[3]] = { width: nextColumns4[i4].width };
            nextColumns3[i3] = {
                ...nextColumns3[i3],
                children: [...nextColumns4]
            };
            columnWidth[colKeys[2]] = { width: nextColumns3[i3].width };
            nextColumns2[i2] = {
                ...nextColumns2[i2],
                children: [...nextColumns3]
            };
            columnWidth[colKeys[1]] = { width: nextColumns2[i2].width };
            nextColumns1[i1] = {
                ...nextColumns1[i1],
                children: [...nextColumns2]
            };
            columnWidth[colKeys[0]] = { width: nextColumns1[i1].width };
            break;
        case 5:
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            nextColumns2 = [...nextColumns1[i1].children];

            i2 = nextColumns2.findIndex(item => item.colKey === colKeys[1]);
            nextColumns3 = [...nextColumns2[i2].children];

            i3 = nextColumns3.findIndex(item => item.colKey === colKeys[2]);
            nextColumns4 = [...nextColumns3[i3].children];

            i4 = nextColumns4.findIndex(item => item.colKey === colKeys[3]);
            nextColumns5 = [...nextColumns4[i4].children];

            i5 = nextColumns5.findIndex(item => item.colKey === colKeys[4]);

            nextColumns5[i5] = {
                ...nextColumns5[i5],
                width: size.width
            };
            columnWidth[colKeys[4]] = { width: nextColumns5[i5].width };
            nextColumns4[i4] = {
                ...nextColumns4[i4],
                children: [...nextColumns5]
            };

            columnWidth[colKeys[3]] = { width: nextColumns4[i4].width };
            nextColumns3[i3] = {
                ...nextColumns3[i3],
                children: [...nextColumns4]
            };
            columnWidth[colKeys[2]] = { width: nextColumns3[i3].width };
            nextColumns2[i2] = {
                ...nextColumns2[i2],
                children: [...nextColumns3]
            };
            columnWidth[colKeys[1]] = { width: nextColumns2[i2].width };
            nextColumns1[i1] = {
                ...nextColumns1[i1],
                children: [...nextColumns2]
            };
            columnWidth[colKeys[0]] = { width: nextColumns1[1].width };
            break;
        default:
            nextColumns1 = [...nextColumns1];
            i1 = nextColumns1.findIndex(item => item.colKey === colKeys[0]);
            columnWidth[colKeys[0]] = { width: nextColumns1[i1].width };
    }
    main.setColumnsLocalStorage({
        columnsWidth: columnWidth,
        pageKey
    });
    callback && callback(nextColumns1);
};

/**
 * 
 * @param {*} param0 
 */
export const renderColums = ({
    columns = [],
    pageKey,
    allowFixed,
    expanded,
    parentClassName = "",
    parentIndexs = [],
    parentColKeys = []
}) => ({
    getValueMax,
    getValueMin,
    sumData,
    findTitle,
    setColumns,
    handleResize
}) => {
        return columns
            .filter(item => isChecked(item) !== 0)
            .map((col, x) => {
                col.title = findTitle(col.colKey);
                return {
                    ...col,
                    rowIndex: x,
                    fixed: (expanded || !allowFixed) ? false : (col._format && col._format.hasOwnProperty("fixed") ? col._format.fixed : col.fixed),
                    align: col._format && col._format.text_align ? col._format.text_align : col.align,
                    className: `${parentClassName} ${formatClassName(col._format)} ${col.className || ""}`,
                    onHeaderCell: col => ({
                        width: col.width,
                        allowResize: col.allowResize,
                        onResize: handleResize([...parentIndexs, x], [...parentColKeys, col.colKey]),
                        col,
                    }),
                    onCell: (cell, rowIndex) => ({ cell, rowIndex, colKey: col.colKey, col, cellDropdown: col.dataIndex === "actions" ? false : true }),
                    children: Array.isArray(col.children) ?
                        renderColums({
                            columns: col.children,
                            pageKey,
                            allowFixed,
                            expanded,
                            parentClassName: `${parentClassName} ${formatClassName(col._format)}`,
                            parentIndexs: [...parentIndexs, x],
                            parentColKeys: [...parentColKeys, col.colKey]
                        })({
                            getValueMax,
                            getValueMin,
                            sumData,
                            findTitle,
                            setColumns,
                            handleResize
                        }) :
                        undefined
                }
            })
    };

/**
 * 
 * @param {*} item 
 * @param {*} dataIndex 
 *  
 */
export const getValue = (item, dataIndex) => {
    const keyArr = dataIndex.split(".");
    let res = item;
    keyArr.map((val) => {
        return res = res[val];
    })
    return res;
};

/**
 * 
 * @param {*} dataIndex 
 * @param {*} maxType 
 */
export const getValueMax = (dataIndex, maxType = "number") => (dataSource) => {
    let max = null, value = null;
    dataSource.map((item) => {
        value = getValue(item, dataIndex);
        if (maxType === "number") {
            max = max ?
                (parseInt(max, 0) < parseInt(value, 0) ? value : max) :
                value;
        }
        else if (maxType === "currency") {
            max = max ?
                (main.convertCurrencyToNumber(max) < main.convertCurrencyToNumber(value) ? value : max) :
                value;
        }
        else if (maxType === "date") {
            max = moment(value, dateFormat).isValid() ?
                (max ?
                    ((
                        moment(max, dateFormat).isValid()
                        && new Date(moment(value, dateFormat).format()).getTime() > new Date(moment(max, dateFormat).format()).getTime()
                    ) ?
                        value :
                        max) :
                    value) :
                max;
        }
        return null;
    })
    return max;
};

/**
 * 
 * @param {*} dataIndex 
 * @param {*} minType 
 */
export const getValueMin = (dataIndex, minType = "number") => (dataSource) => {
    let min = null, value = null;
    dataSource.map((item) => {
        value = getValue(item, dataIndex);
        if (minType === "number") {
            min = min ?
                (parseInt(min, 0) > parseInt(value, 0) ? value : min) :
                value;
        }
        else if (minType === "currency") {
            min = min ?
                (main.convertCurrencyToNumber(min) > main.convertCurrencyToNumber(value) ? value : min) :
                value;
        }
        else if (minType === "date") {
            min = moment(value, dateFormat).isValid() ?
                (min ?
                    ((
                        moment(min, dateFormat).isValid() &&
                        new Date(moment(value, dateFormat).format()).getTime() < new Date(moment(min, dateFormat).format()).getTime()
                    ) ?
                        value :
                        min) :
                    value) :
                min;
        }
        return null;
    })
    return min;
};

/**
 * 
 * @param {*} dataIndex 
 * @param {*} sumType 
 */
export const sumData = (dataIndex, sumType = "number") => (dataSource = []) => {
    let result = 0, value = null;
    dataSource.map((item) => {
        value = getValue(item, dataIndex);
        if (sumType === "number" && typeof value === "number") {
            result += value;
        }
        else if (sumType === "currency") {
            result += main.convertCurrencyToNumber(value);
        }
        return null;
    })
    return sumType === "currency" ? main.convertNumberToCurrency(result) : result;
};

/**
 * 
 * @param {*} colKey 
 * @param {*} columns 
 */
export const findTitle = (colKey, columns = []) => {
    const result = main.flatten(columns).find(item => item.colKey === colKey);
    return result ? result.title : null;
}

/**
 * 
 * @param {*} cols 
 */
export const getWidthTable = (cols = []) => {
    let result = 0;
    cols.filter(item => !item._hidden).map(col => {
        return result += (col.children && Array.isArray(col.children)) ? getWidthTable(col.children) : (col.width ? col.width : 0);
    });
    return result;
};


/**
 * 
 * @param {*} key 
 * @param {*} columns 
 */
const checkDisplayType = (key, columns = []) => {
    let displayType = "string";
    columns.map((col) => {
        if (col.hasOwnProperty("children") && Array.isArray(col.children)) {
            displayType = checkDisplayType(key, col.children);
        }
        else if (col.colKey === key && col.hasOwnProperty("displayType")) {
            displayType = col.displayType;
        }
        return null;
    })
    return displayType;
};

/**
 * 
 * @param {*} columns 
 * @param {*} tdMinHeight 
 * 
 *  -   rowHeader   |   count số tr trong header qua countRowHeader();
 *  -   height      |   Tính chiều cao của header = số tr (rowHeight) * 35,25+1
 ***    35.25   : chiều cao của td khi hiển thị trên 1 dòng. trên nhiều dòng không biết
 ***    1       : border của thead
 */
export const getHeightHeader = (columns = [], tdMinHeight = 0) => {
    const rowHeader = main.countTreeMaxLevel(columns.filter(item => isChecked(item) !== 0));
    return rowHeader * tdMinHeight + 1;
};


/**
 * 
 * @param {*} wrapperContentId 
 * @param {*} showHeader 
 * @param {*} titleHeight 
 * @param {*} paginationWrapperHeight 
 * @param {*} headerHeight 
 * @param {*} getHeightHeader 
 * 
 *  -   Lấy chiều cao của wrapperContent
 *  -   height      |   Tính chiều cao của header table bằng getHeightHeader()
 *  -   hasTitle    |   Kiểm tra nếu wrapperContent có chứa class "none-title" ? false: true
 *  -   y           |   Tính chiều cao của màn hình trừ cho body table
 *  -   scrollY     |   set chiều cao của body reponsive
 */
export const getHeightTableScroll = (wrapperContentId, showHeader, titleHeight, paginationWrapperHeight, headerHeight, getHeightHeader) => {
    const wrapperContent = document.getElementById(wrapperContentId);
    const height = showHeader === false ? 0 : getHeightHeader();
    const hasTitle = (wrapperContent && wrapperContent.classList.contains("none-title")) ? false : true;
    const y = height + paginationWrapperHeight + headerHeight + (hasTitle ? titleHeight : 0);
    const scrollY = `calc(100vh - ${y + 5}px)`;
    return scrollY;
};


/**
 * 
 * @param {*} columns 
 * @param {*} keys 
 */
export const convertColumnsShow = (columns = [], keys = []) => {
    let result = [];
    columns.map((col, i) => {
        if (Array.isArray(col.children) && col.children.length > 0) {
            result = [...result, ...convertColumnsShow(col.children, keys)];
        }
        else {
            result.push(col.colKey);
        }
        return result;
    })
    return [...keys, ...result]
}

/**
 * 
 * @param {*} columns 
 */
export const sortFixedColumns = (columns = []) => {
    const leftList = columns.filter(item => item.fixed === "left" || item._format.fixed === "left");
    const centerList = columns.filter(item => item.fixed !== "left" && item.fixed !== "right" && item._format.fixed !== "left" && item._format.fixed !== "right")
    const rightList = columns.filter(item => item.fixed === "right" || item._format.fixed === "right")
    return [...leftList, ...centerList, ...rightList];
}

/**
 * 
 * @param {*} columns 
 */
export const getHideKeys = (columns = []) => {
    return Array.isArray(columns) ? main.flatten(columns).filter(item => item._hidden).map(item => item.colKey) : [];
}

/**
 * 
 * @param {*} columns 
 */
export const sortColumns = (columns = []) => {
    return _.orderBy(columns, ["_sort"], ["asc"]).map(item => ({
        ...item,
        children: Array.isArray(item.children) ? sortColumns(item.children) : undefined
    }))
}

/**
 * 
 * @param {*} col 
 */
export const getKeys = (col) => {
    let result = [];
    if (Array.isArray(col.children) && col.children.length > 0) {
        col.children.map((_col, i) => {
            result = [...result, ...getKeys(_col)]
            return result;
        });
    }
    else {
        result = [col.colKey]
    }
    return result;
}

/**
 * 
 * @param {*} col 
 */
export const isChecked = (col) => {
    if (Array.isArray(col.children) && col.children.length > 0) {
        let count = 0;
        col.children.map((_col, i) => {
            if (isChecked(_col) !== 0) {
                count++;
            }
            return count;
        });
        return count === 0 ? 0 : (count === col.children.length ? 1 : -1);
    }

    return !col._hidden ? 1 : 0;
}

/**
 * 
 * @param {*} columns 
 */
export const isCheckedAll = (columns = []) => {
    let count = 0, countCheck = 0;
    const _columns = columns;
    _columns.map((col, i) => {
        const check = isChecked(col);
        if (check === 1) {
            count++;
        }
        else if (check === -1) {
            countCheck++;
        }
        return null;
    })
    return count === 0 && countCheck === 0 ? 0 : (count === _columns.length ? 1 : -1);
}

/**
 * 
 * @param {*} col 
 * @param {*} checked 
 * @param {*} callback 
 */
export const onCheck = (col, checked, callback) => {
    callback && callback(getKeys(col), checked)
}

/**
 * 
 * @param {*} columns 
 * @param {*} checked 
 * @param {*} callback 
 */
export const onCheckAll = (columns = [], checked, callback) => {
    columns.map(col => onCheck(col, checked, callback));
}