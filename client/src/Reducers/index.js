import {GET_PRODUCTS, DELETE_PRODUCT, DELETE_CATEGORY} from '../Constants/ProductsConstants';
const inicialState = {
	products: [],
};

export default function rootReducer(state = inicialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: action.products
			};
			case DELETE_PRODUCT:
				return {
					...state
				}
		    case DELETE_CATEGORY:
				return {
					...state
				}
		default:
			return state;
	}
}
