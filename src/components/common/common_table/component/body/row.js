import React from "react";
import { SortableHandle, SortableElement } from 'react-sortable-hoc';

const Row = ({ dataSource = [], index, allowSortRow, ...props }) => {
    return allowSortRow ? <Item  {...props} row-index={index} index={index} /> : <tr {...props} />;
}

const Item = SortableElement(props => {
    return <DragHandle {...props} />
});

const DragHandle = SortableHandle((props) => {
    return <tr {...props} />
});

export default Row;