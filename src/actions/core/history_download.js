import * as type from "./../../constants/type";

export const handleGetAll = (values) => {
    return {
        type: type.TYPE_HISTORY_DOWNLOAD_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_HISTORY_DOWNLOAD_EDIT,
        value
    }
}

export const handleCreate = (value) => {
    return {
        type: type.TYPE_HISTORY_DOWNLOAD_CREATE,
        value
    }
}

export const handleUpdate = (value) => {
    return {
        type: type.TYPE_HISTORY_DOWNLOAD_UPDATE,
        value
    }
}

export const handleDelete = (value) => {
    return {
        type: type.TYPE_HISTORY_DOWNLOAD_DELETE,
        value
    }
}