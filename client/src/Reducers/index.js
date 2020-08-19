import {
	PUT_CATEGORY,
	POST_CATEGORY,
	DELETE_CATEGORY,
	SET_CATEGORY,
	DELETE_PROD_CATEGORY,
	DELETE_PRODUCT,
	POST_PRODUCTS,
	PUT_PRODUCTS,
	GET_PRODUCTS,
	FILTER_BY_CATEGORY,
} from '../Constants/ProductsConstants';
const inicialState = {
	products: [],
	product: {},
	putProduct: {},
	category: {},
	putCat: {},
	catProducts: [],
};

export default function rootReducer(state = inicialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: action.products,
			};
		case DELETE_PRODUCT:
			return {
				...state,
			};
		case DELETE_CATEGORY:
			return {
				...state,
			};
		case SET_CATEGORY:
			return state;
		case DELETE_PROD_CATEGORY:
			return state;
		case POST_PRODUCTS:
			return {
				...state,
				product: action.product,
			};
		case PUT_PRODUCTS:
			return {
				...state,
				putProduct: action.putProduct,
			};
		case POST_CATEGORY:
			return {
				...state,
				category: state.category,
			};
		case PUT_CATEGORY:
			return {
				...state,
				putCat: action.putCat,
			};
		case FILTER_BY_CATEGORY:
			return {
				...state,
				catProducts: action.catProducts,
			};
		default:
			return state;
	}
}
