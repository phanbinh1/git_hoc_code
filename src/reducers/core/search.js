import * as type from './../../constants/type';
import * as constants from './../../constants/constants';

const dataInit = [
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra/nghiep-vu-thanh-tra/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    },
    {
        title: 'Ant Design Title 1',
        href: "/nghiep-vu-thanh-tra.csdf",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
    }
]

const resultInit = {
    total: 0,
    data: Object.keys(constants.CONST_SEARCH).map((item) => {
        return {
            key: constants.CONST_SEARCH[item].KEY,
            title: constants.CONST_SEARCH[item].TITLE,
            default: constants.CONST_SEARCH[item].DEFAULT,
            data: [],
            page: 1,
            pageSize: 12,
            hasMore: true
        }
    })
}

export default (state = resultInit, action) => {
    const page = action.page && typeof action.page === "number" ? parseInt(action.page, 0) : 1;
    const pageSize = action.pageSize || 12;
    const data = action.data || dataInit;
    const key = action.key || "SEARCH_KEY_ALL";

    switch (action.type) {
        case type.TYPE_COMMON_SEARCH_REFRESH:
            return {
                ...state, data: state.data.map(item => {
                    if (item.key === key) {
                        return {
                            ...item,
                            data: [],
                            page: 1,
                            pageSize
                        }
                    }
                    else {
                        return item;
                    }
                })
            }
        case type.TYPE_COMMON_SEARCH:
            return {
                ...state, data: state.data.map(item => {
                    if (item.key === key) {
                        return {
                            ...item,
                            data: [...item.data, ...data],
                            page,
                            pageSize
                        }
                    }
                    else {
                        return item;
                    }
                })
            }
        default:
            return state;
    }
}