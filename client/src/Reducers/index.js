import {GET_PRODUCTS, SET_CATEGORY, DELETE_PROD_CATEGORY} from '../Constants/ProductsConstants';
const inicialState = {
	products: [],
};

export default function rootReducer(state = inicialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: action.products,
			};
		case SET_CATEGORY:
			return state;
		case DELETE_PROD_CATEGORY:
			return state;
		default:
			return state;
	}
}
