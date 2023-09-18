/**
 * 
 *      <CommonTable
 *          columns                 Array       |   Default []
 *          dataSource              Array       |   Default []
 *          loading                 Boolean     |   Default false
 *          bordered                Boolean     |   Default true
 *          isPagination            Boolean     |   Default True
 *          onChange                Function    |
 *          pageKey                 String      |   Default
 *          controllerKey           String      |   Default
 *          wrapperClassName        String      |   Default "wrapper-list"    
 *          onSelectRow             Function    |
 *          expanded                Boolean     |   Default false
 *          defaultExpandedRowKeys  Array       |   Default []
 *          scrollY                 Boolean     |   Default true
 *          scrollX                 Boolean     |   Default true
 *          countLabel              String      |   Default "Tổng số" ex: countLabel = "Count" => result : Count 123
 *          countLabelExtend        String      |   Default "" ex: countLabelExtend="người" => reuslt "Tổng số 10 người"
 *          hasSelectRow            Boolean     |   Default true
 *          emptyText               String      |   Default "Không có dữ liệu"
 *          paginationPlacement
 *          showHeader              Boolean     |   Default true
 *          displayType             String      |   ("block","inline") ** block:full-text
 *          tdMinHeight             Number      |   Chiều cao tối thiểu của 1 dòng
 *      />
 * 
 *  ===============================
 * 
 * 		description = {
 * 			sum:{
 * 				label:String|React Node,
 * 				labelExtend: String | React Node,
 * 				type:	string ("number" | "currency")
 * 			},
 * 			max:{
 * 				type: "number" | "currency" | "date",
 * 				label: String | ReactNode
 * 			},
 * 			min:{
 * 				type: "number" | "currency" | "date",
 * 				label: String | ReactNode
 * 			}
 * 		}
 *      columns             Array                   Default []
 *      -   {
 *          title           String | React Node     
 *          dataIndex       String
 * 			description
 *          width           number                  required = !children.length > 0
 *          children        Array                   //-- columnsArray
 * 
 *      }
*/

import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table, Spin, Layout, Card, ConfigProvider, Empty } from 'antd';
import {
	cancelRequest,
	handleResize as _handleResize,
	getValueMax as _getValueMax,
	getValueMin as _getValueMin,
	sumData as _sumData,
	findTitle as _findTitle,
	getWidthTable as _getWidthTable,
	getHeightHeader as _getHeightHeader,
	getHeightTableScroll as _getHeightTableScroll,
	renderColums,
	getHideKeys,
	sortColumns,
	sortFixedColumns
} from "./fnc";
import { AntIcon } from '../../antd';
import * as constants from "./../../../constants/constants";
import * as pageKeys from "./../../../constants/page_key";
import * as main from "./../../../constants/main";
import _ from "lodash";
import elementResizeEvent from "element-resize-event";
import ColumnView from './column_view';
import ColumnIndex from './column_index';
import Pagination from "./pagination";
import { BodyCell, BodyRow, BodyWrapper, HeaderCell, HeaderRow, HeaderWrapper } from './component';

const CommonTable = ({
	columns,                //  Array
	dataSource,             //  Array
	loading,                //  Boolean
	bordered,               //  Boolean
	isPagination = true,    //  Boolean
	pageKey,                //  String
	controllerKey,          //  String
	wrapperClassName,       //  String
	onChange,               //  Function
	onSelectRow,            //  Function
	selectedRowKeys,        //  Array
	expanded,               //  Boolean
	defaultExpandedRowKeys, //  Array
	scrollY,                //  Boolean
	scrollX,                //  Boolean
	countLabel,             //  String
	countLabelExtend,       //  String
	hasSelectRow,           // Boolean
	paginationPlacement = "top",
	showHeader,             //  Boolean
	displayType,            //  String
	tdMinHeight,            //  Number
	expandIcon,
	style,                  // Object
	striped = true,					//	Boolean
	title,
	firstLoad = true,
	indexFixed = true,
	rowSelectionFixed = true,
	onSelect,
	onSelectAll,
	filter,
	search,
	rowClassName,
	autoHeight,
	id,
	onExpandedRowsChange,
	expandedRowKeys,
	allowSortRow
}) => {
	/**
	 *  Declare State
	 */
	const [_tdMinHeight] = useState(tdMinHeight && typeof tdMinHeight === "number" ? tdMinHeight : 35.25)
	const [_scroll, _setScroll] = useState({});
	const [_allowFixed, _setAllowFixed] = useState(true);
	const [_tableSize, _setTableSize] = useState({ height: 0, width: 0 });

	const [_pagination, _setPagination] = useState(constants.CONST_PAGINATION);
	const [_pageKey] = useState(pageKey && typeof pageKey === "string" ? pageKey : pageKeys.PAGE_KEY_DEFAULT);
	const [_columns, _setColumns] = useState([]);

	const [_wrapperContentId] = useState("wrapper-content");
	const [_wrapperListId] = useState(id || main.createID());
	const [_paginationWrapperHeight] = useState(48);
	const [_headerHeight] = useState(50);
	const [_titleHeight] = useState(50);

	const wrapperTblId = `tbl-${_wrapperListId}`;

	const state = useSelector(state => state);
	const rows_selected = useSelector(state => state.core.rows_selected);
	const paginations = useSelector(state => state.core.paginations);
	const config = useSelector(state => state.core.config);
	const { table } = config;
	const { allowCopy } = table;

	const setColVal = (columns = [], level = 1, parentColKey = "1") => {
		const _localColumns = main.getColumnsLocalStorage({ pageKey: _pageKey });
		const columnWidth = _localColumns.width;
		const columnsSort = _localColumns.sort;
		const columnsFormat = _localColumns.format;
		const columnsShow = _localColumns.show;
		let result = {}, colKey = "", sort = 0;
		const results = columns.map((col, i) => {
			sort++;
			colKey = `${parentColKey}-${level}-${i}`;
			result = {
				...col,
				_level: level,
				_format: {
					fixed: col.dataIndex === "stt" ?
						((expanded || !_allowFixed || !indexFixed) ? false : "left") :
						col.dataIndex === "actions" ? "right" : col.fixed,
					text_align: col.dataIndex === "stt" || col.dataIndex === "actions" ? "center" : col.align === "left" || col.align === "center" || col.align === "right" ? col.align : undefined,
					...(col._format || {}),
					...(columnsFormat[colKey] || {}),
				},
				_sort: columnsSort[colKey] || sort,
				_hidden: Array.isArray(columnsShow) && columnsShow.findIndex(key => key === colKey) >= 0,
				fixed: undefined,
				align: undefined,
				allowResize: col.allowResize === false || col.dataIndex === "actions" ? false : true,
				colKey
			};
			if (col.dataIndex === "stt") {
				result.title = col.title || "STT";
				result.width = 50;
			}
			if (col.dataIndex === "actions") {
				result.title = result.title || "Thao tác";
			}
			if (columnWidth[colKey] && columnWidth[colKey].width) {
				result.width = columnWidth[colKey].width;
			}
			if (col.children && Array.isArray(col.children)) {
				result.children = setColVal(col.children, level + 1, colKey);
			}
			return result;
		});
		return _.orderBy(results, ["_sort"], "asc");
	};

	const ___columns = setColVal(columns);

	const _onChange = (a, b, c, d, e, f) => {
		if (onChange && typeof onChange === "function") {
			onChange(a, b, c, d, e, f);
			const trs = document.querySelectorAll(`${wrapperTblId ? `#${wrapperTblId} ` : ""}.table-custom .ant-table > .ant-table-content >.ant-table-scroll > .ant-table-body tr.ant-table-row`);
			trs.length > 0 && trs[0].scrollIntoView()
		}
	}

	useEffect(() => {
		const tblWrapperElm = document.getElementById(wrapperTblId);
		/**
		 *  Nếu isPagination = false thì sẽ gọi api get danh sách (onChange()) ở đây
		 *  Nếu không thì api get danh sách sẽ được gọi trong component <Pagination/>
		 */
		if (isPagination === false && typeof onChange === "function" && firstLoad) { _onChange(); }

		/**
		 *  Nếu columns (props) tồn tại và là 1 mảng thì sẽ gán cho _columns
		 *  Nếu không thì thôi. :))
		 */
		if (___columns && Array.isArray(___columns)) {
			_setColumns(___columns);
		}

		tblWrapperElm && elementResizeEvent(tblWrapperElm, () => {
			_setTableSize({ height: tblWrapperElm.clientHeight, width: tblWrapperElm.clientWidth });
		})

		return () => {
			cancelRequest(controllerKey)(state);
		}
	}, []);

	useEffect(() => {
		const tblActions = document.querySelectorAll(`#${_wrapperListId} .tbl-action-dropdown`);
		for (let i = 0; i < tblActions.length; i++) {
			tblActions[i].setAttribute("tbl-id", _wrapperListId);
		}
	}, [dataSource, _wrapperListId])

	useEffect(() => {
		let __scroll = {};

		if (scrollY !== false) {
			__scroll.y = getHeightTableScroll();
		}
		if (scrollX !== false) {
			__scroll.x = getWidthTable();
		}
		_setScroll(__scroll);
	}, [_columns, scrollX, scrollY])

	useEffect(() => {
		if (allowFixed() !== _allowFixed) {
			_setAllowFixed(allowFixed());
		}
	}, [_columns, _tableSize])

	useEffect(() => {
		const p = paginations.find(item => item.key === _pageKey);
		p && _setPagination(_pagination => ({ ..._pagination, ...p.pagination }));
	}, [paginations, _pageKey]);


	const rowSelection = hasSelectRow !== false && (Array.isArray(dataSource) ? dataSource : []).filter(item => !item.disabled).length > 0 ? {
		align: "center",
		columnWidth: 30,
		fixed: (expanded || !_allowFixed || !rowSelectionFixed) ? false : "left",
		selectedRowKeys: selectedRowKeys ? selectedRowKeys : main.getItemSelected(rows_selected, _pageKey),
		onChange: (selectedRowKeys, selectedRows) => {
			if (typeof onSelectRow === "function") {
				onSelectRow(selectedRowKeys, selectedRows);
			}
		},
		onSelect: onSelect,
		onSelectAll: onSelectAll,
		getCheckboxProps: record => ({
			disabled: record.disabled
		}),
	} : undefined;

	const getHeightHeader = () => _getHeightHeader(_columns, _tdMinHeight);

	const getHeightTableScroll = () => _getHeightTableScroll(_wrapperContentId, showHeader, _titleHeight, _paginationWrapperHeight, _headerHeight, getHeightHeader);

	/**
	 * 
	 * @param {*} arrIndex 
	 * @param {*} colKeys 
	 */
	const handleResize = (arrIndex, colKeys) => _handleResize(arrIndex, colKeys, _setColumns, _columns, _pageKey);

	/**
	 * 
	 * @param {*} dataIndex 
	 * @param {*} maxType 
	 */
	const getValueMax = (dataIndex, maxType = "number") => _getValueMax(dataIndex, maxType)(dataSource);

	/**
	 * 
	 * @param {*} dataIndex 
	 * @param {*} minType 
	 */
	const getValueMin = (dataIndex, minType = "number") => _getValueMin(dataIndex, minType)(dataSource);

	/**
	 * 
	 * @param {*} dataIndex 
	 * @param {*} sumType 
	 */
	const sumData = (dataIndex, sumType = "number") => _sumData(dataIndex, sumType)(dataSource);

	/**
	 * 
	 * @param {*} colKey 
	 */
	const findTitle = (colKey) => _findTitle(colKey, ___columns);

	/**
	 * 
	 */
	const getWidthTable = () => _getWidthTable(_columns);

	/**
	 * 
	 */
	const _dataSource = dataSource.map((item, index) => ({
		index,
		...item,
		stt: isPagination !== false ? <ColumnIndex
			currentPage={_pagination.currentPage}
			pageSize={_pagination.pageSize}
			index={index}
			isPagination={isPagination}
			key={index}
		/> :
			<ColumnIndex
				index={index}
				isPagination={isPagination}
				key={index}
			/>
	}));

	const __columns = renderColums({
		allowFixed: _allowFixed,
		columns: sortFixedColumns(sortColumns(_columns)),
		expanded,
		pageKey: _pageKey
	})({
		getValueMax,
		getValueMin,
		sumData,
		findTitle,
		setColumns: _setColumns,
		handleResize
	});

	const allowFixed = () => {
		const wrapperTable = document.getElementById(wrapperTblId);
		const tableWidth = wrapperTable ? wrapperTable.clientWidth : 0;
		const columnsWidth = getWidthTable();
		return document.body.getAttribute("_enviroment") === "app" || scrollX === false ? false : tableWidth < (columnsWidth + 70);
	}

	/**
	 *  Render Pagination
	 */
	const renderPagination = (type = "top") => {
		return (isPagination !== false ?
			<Pagination
				firstLoad={firstLoad}
				onChange={_onChange}
				paginationKey={_pageKey}
				countLabel={countLabel && typeof countLabel === "string" ? countLabel : "Tổng cộng: "}
				countLabelExtend={countLabelExtend ? countLabelExtend : ""}
				filter={<Fragment>
					<ColumnView
						wrapperId={_wrapperListId}
						columns={_columns}
						pageKey={_pageKey}
						setColumns={_setColumns}
						onShowChange={(keys, checked) => {

							_setColumns(columns => {
								const hiddenColumns = (columns = [], keys) => {
									return columns.map(item => (
										{
											...item,
											_hidden: keys.findIndex(key => key === item.colKey) >= 0 ? !checked : (item._hidden || false),
											children: Array.isArray(item.children) ? hiddenColumns(item.children, keys) : undefined
										}))
								}
								main.setColumnsLocalStorage({
									pageKey: _pageKey,
									columnsShow: getHideKeys(hiddenColumns(columns, keys))
								})
								return hiddenColumns(columns, keys);
							});
						}}
						onSortChange={(sorts) => {
							main.setColumnsLocalStorage({
								pageKey: _pageKey,
								columnsSort: sorts
							})
							_setColumns(columns => {
								const sortColumns = (columns = [], sorts) => {
									return columns.map(item => ({
										...item,
										_sort: sorts[item.colKey] || item._sort,
										children: Array.isArray(item.children) ? sortColumns(item.children, sorts) : undefined
									}))
								}
								return sortColumns(columns, sorts);
							});
						}}
					/>
					{filter ? filter : null}
				</Fragment>}
				placement={type}
				countItem={dataSource.length}
			/> :
			<div className={`pagination-wrapper  pagination-wrapper-${type} clearfix`}>
				<div className="pagination-filter">
					<ColumnView
						columns={_columns}
						pageKey={_pageKey}
						setColumns={_setColumns}
						onShowChange={(keys, checked) => {
							_setColumns(columns => {
								const hiddenColumns = (columns = [], keys) => {
									return columns.map(item => (
										{
											...item,
											_hidden: keys.findIndex(key => key === item.colKey) >= 0 ? !checked : (item._hidden || false),
											children: Array.isArray(item.children) ? hiddenColumns(item.children, keys) : undefined
										}))
								}
								main.setColumnsLocalStorage({
									pageKey: _pageKey,
									columnsShow: getHideKeys(hiddenColumns(columns, keys))
								})
								return hiddenColumns(columns, keys);
							});
						}}
						onSortChange={(sorts) => {
							main.setColumnsLocalStorage({
								pageKey: _pageKey,
								columnsSort: sorts
							})
							_setColumns(columns => {
								const sortColumns = (columns = [], sorts) => {
									return columns.map(item => ({
										...item,
										_sort: sorts[item.colKey] || item._sort,
										children: Array.isArray(item.children) ? sortColumns(item.children, sorts) : undefined
									}))
								}
								return sortColumns(columns, sorts);
							});
						}}
					/>
					{filter ? filter : null}
				</div>
				<div className="pull-right">
					{countLabel && typeof countLabel === "string" ? countLabel : "Tổng cộng: "}
					<b> {dataSource.length} </b>
					{countLabelExtend ? countLabelExtend : ""}
				</div>
			</div>);
	};

	return <div
		className={`${wrapperClassName ? wrapperClassName : ""} wrapper-list`}
		id={_wrapperListId}
		style={style ? style : {}}
		header-height={getHeightHeader()}
	>
		<Layout style={{ background: "none" }}>
			<Layout style={{ background: "none" }}>
				{(paginationPlacement === "top") && renderPagination("top")}
			</Layout>
			<Layout style={{ background: "none" }}>
				<Layout id={wrapperTblId} style={{ background: "none" }}>
					<Spin
						spinning={loading}
						size="large"
						indicator={<AntIcon className="tbl-loading-icon" type="loading" style={{ fontSize: 50 }} />}
					>
						<ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
							<Table
								key={`tbl-${table.fullText ? "tbl-full-text" : "tbl-not-full-text"}`}
								expandedRowKeys={Array.isArray(expandedRowKeys) ? expandedRowKeys : undefined}
								onExpandedRowsChange={typeof onExpandedRowsChange === "function" ? onExpandedRowsChange : undefined}
								expandIcon={expandIcon}
								showHeader={showHeader === false ? false : true}
								rowSelection={rowSelection}
								rowClassName={(record, index) => `${record.className || ""} ${index % 2 === 0 ? " tr-even" : " tr-odd"} ${typeof rowClassName === "function" ? rowClassName(record, index) : ""}`}
								rowKey={(record, index) => { return record.key || record.id || index; }}
								expandedRowRender={expanded ? record => record.expanded : null}
								defaultExpandedRowKeys={defaultExpandedRowKeys}
								columns={__columns}
								dataSource={_dataSource}
								pagination={false}
								size="middle"
								bordered={bordered === false ? false : true}
								className={`table-custom ${striped === false ? "" : "ant-table-striped"} ${displayType === "block" ? "full-text" : (displayType === "inline" ? "" : (table.fullText ? "full-text" : ""))}`}
								components={{
									header: {
										wrapper: props => <HeaderWrapper tblId={wrapperTblId} {...props} />,
										row: props => <HeaderRow tblId={wrapperTblId} {...props} />,
										cell: props => <HeaderCell
											{...props}
											highlightOnHover={!expanded}
											tblId={wrapperTblId}
											headerHeight={getHeightHeader()}
											setColumns={_setColumns}
											expanded={expanded}
											pageKey={pageKey}
										/>,
									},
									body: expanded ?
										{
											cell: props => <BodyCell tblId={wrapperTblId} allowCoppy={allowCopy} {...props} />,
										} :
										{
											wrapper: props => <BodyWrapper allowSortRow={allowSortRow} tblId={wrapperTblId} {...props} />,
											row: props => <BodyRow allowSortRow={allowSortRow} tblId={wrapperTblId} dataSource={_dataSource} {...props} />,
											cell: props => <BodyCell tblId={wrapperTblId} allowCoppy={allowCopy} {...props} />,
										}
								}}
								onRow={(_, index) => ({ index })}
								scroll={_scroll}
								title={title}
								bodyStyle={scrollY !== false && !autoHeight ? { height: _scroll.y, overflow: "scroll !important" } : {}}
							/>
						</ConfigProvider>
					</Spin>
				</Layout>
				<Layout.Sider width={search && search.show ? (search.width ? search.width : 300) : 0} style={{ background: "none", transition: "all 0s" }}>
					<Card
						className="tbl-search-card"
						title={<Fragment> {<i className={`fa ${search && search.icon ? search.icon : "fa-search"} m-r-10`} />}{search && search.title ? search.title : "Tìm kiếm"} </Fragment>}
						size="small"
						extra={search && search.onClose && < i className="fa fa-times c-pointer" onClick={search.onClose} />}
					>
						{search && search.component}
					</Card>
				</Layout.Sider>
			</Layout>
			<Layout style={{ background: "none" }}>
				{(paginationPlacement === "bottom") && renderPagination("bottom")}
			</Layout>
		</Layout>
	</div>
}

export default CommonTable;