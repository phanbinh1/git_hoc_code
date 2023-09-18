import React, { lazy, Suspense } from "react";
import Item from "./item";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
const ColumnView = lazy(() => import("./column_view"));

const SortItem = sortableElement(props => <Item {...props} />)
const SortableContainer = sortableContainer(props => <div {...props} />);

export { SortItem, SortableContainer }
export default ({
    columns = [],
    onSortChange,
    onShowChange,
    setColumns,
    pageKey,
}) => <Suspense fallback={<button className="btn-skeleton w-100 h-30 ant-btn" ><span /></button>}>
        <ColumnView
            columns={columns}
            onSortChange={onSortChange}
            onShowChange={onShowChange}
            setColumns={setColumns}
            pageKey={pageKey}
        />
    </ Suspense>