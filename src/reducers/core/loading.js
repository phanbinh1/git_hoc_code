import * as type from './../../constants/type';

export default (state = 0, action) => {
    const body = document.body;
    switch (action.type) {
        case type.TYPE_START_LOADING:
            if (body) {
                body.classList.add("loading");
            }
            state++;
            return state;
        case type.TYPE_END_LOADING:
            state--;
            if (state === 0 && body) {
                body.classList.remove("loading");
            }
            return state < 0 ? 0 : state;
        default:
            return state;
    }
}