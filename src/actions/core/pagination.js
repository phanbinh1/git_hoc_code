import * as constants from "./../../constants/constants";
import * as main from "./../../constants/main";
import * as type from "./../../constants/type";

export const Pagination = (pagination = constants.CONST_PAGINATION, key = constants.CONST_PAGINATION_KEY_DEFAULT) => {
	if (pagination.hasOwnProperty("totalItemsCount")) {
		pagination.total = pagination.totalItemsCount;
	}
	if (pagination.hasOwnProperty("itemsCountPerPage")) {
		pagination.pageSize = pagination.itemsCountPerPage;
	}
	if (pagination.hasOwnProperty("pageRangeDisplayed")) {
		pagination.totalPage = pagination.pageRangeDisplayed;
	}

	var _pagination = {
		total: pagination.total,
		pageSize: pagination.pageSize,
		totalPage: pagination.totalPage,
		currentPage: pagination.currentPage
	}

	if (_pagination.currentPage > _pagination.total) {
		_pagination.currentPage = _pagination.total;
	}

	main.setPaginationLocalStorage(pagination, key);
	return {
		type: type.TYPE_PAGINATION,
		pagination: _pagination,
		key
	};
}