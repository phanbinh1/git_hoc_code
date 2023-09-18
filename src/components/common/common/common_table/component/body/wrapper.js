import React from "react";
import { SortableContainer } from 'react-sortable-hoc';

const Container = SortableContainer(({ tblId, ...props }) => {
    return <tbody
        {...props}
        tbl-id={tblId}
    />
});

const Wrapper = ({ tblId, allowSortRow, ...props }) => {
    return allowSortRow ? <Container
        axis="y"
        lockAxis="y"
        useDragHandle
        disableAutoscroll
        helperClass="column-view-dragging"
        onSortStart={({ index }) => {
            document.body.classList.add("dragging")
        }}
        onSortEnd={({ newIndex, oldIndex }) => {
            console.log(newIndex, oldIndex);
            document.body.classList.remove("dragging");
        }}
        tblId={tblId}
        {...props}
    /> : <tbody
            {...props}
            tbl-id={tblId}
        />
}

export default Wrapper;