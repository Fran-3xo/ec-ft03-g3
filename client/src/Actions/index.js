import axios from 'axios';
import {
	GET_PRODUCTS,
	DELETE_PRODUCT,
	POST_PRODUCTS,
	SET_CATEGORY,
	DELETE_PROD_CATEGORY,
	PUT_PRODUCTS,
	POST_CATEGORY,
	PUT_CATEGORY,
	FILTER_BY_CATEGORY,
} from '../Constants/ProductsConstants';

export function getProducts() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/products')
			.then(res => {
				dispatch({type: GET_PRODUCTS, products: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function deleteProduct(id) {
	return axios.delete('http://localhost:3005/products/' + id);
}

export function deleteCategory(id) {
	return axios.delete('http://localhost:3005/category/' + id);
}

export function setCategory(prodId, catId) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3005/products/${prodId}/category/${catId}`)
			.then(res => {
				dispatch({type: SET_CATEGORY});
			})
			.catch(err => console.log(err));
	};
}

export function deleteProdCategory(prodId, catId) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3005/products/${prodId}/category/${catId}`)
			.then(res => {
				dispatch({type: DELETE_PROD_CATEGORY});
			})
			.catch(err => console.log(err));
	};
}

export function postProducts(product) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3005/products', product)
			.then(res => {
				dispatch({type: POST_PRODUCTS, product});
			})
			.catch(err => console.log(err));
	};
}

export function postCategory(category) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3005/category', category)
			.then(res => {
				dispatch({type: POST_CATEGORY, category});
			})
			.catch(err => console.log(err));
	};
}

export function putCategory(category, id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3005/category/${id}`, category)
			.then(res => {
				dispatch({type: PUT_CATEGORY, category});
			})
			.catch(err => console.log(err));
	};
}

export function putProducts(product, id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3005/products/${id}`, product)
			.then(res => {
				dispatch({type: PUT_PRODUCTS, product});
			})
			.catch(err => console.log(err));
	};
}

export function filterByCategory(categoria) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3005/products/category/${categoria}`)
			.then(res => {
				dispatch({type: FILTER_BY_CATEGORY, catProducts: res.data});
			})
			.catch(err => console.log(err));
	};
}
