import axios from 'axios';
import {
	GET_PRODUCTS,
	PUT_PRODUCT,
	DELETE_PRODUCT,
	SET_CATEGORY,
	DELETE_PROD_CATEGORY,
	POST_CATEGORY,
	PUT_CATEGORY,
	FILTER_BY_CATEGORY,
	GET_CATEGORIES,
	GET_CARRITO,
	DELETE_PROD_CART,
	ADD_TO_CART,
	GET_ORDER,
	SEARCH_PRODUCT,
	EMPTY_CART,
	GET_ORDERS,
	GET_USER,
	LOGIN,
	LOGOUT,
	SETCANTIDAD,
	GET_USERS,
	DELETE_USERS,
} from '../Constants/ProductsConstants';

//* PRODUCTS

export function emptyCart(id) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3005/users/${id}/cart`, {withCredentials: true})
			.then(res => {
				dispatch({type: EMPTY_CART, cart: []});
			})
			.catch(err => console.log(err));
	};
}

export function searchProduct(buscar) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3005/search?valor=${buscar}`, {withCredentials: true})
			.then(res => {
				dispatch({type: SEARCH_PRODUCT, product: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function getProducts() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/products', {withCredentials: true})
			.then(res => {
				dispatch({type: GET_PRODUCTS, products: res.data});
			})
			.catch(err => console.log(err));
	};
}
export function addProduct(product) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3005/products', product, {withCredentials: true})
			.then(res => {
				dispatch({type: 'ADD_PRODUCT', product: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function putProduct(product, id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3005/products/${id}`, product, {withCredentials: true})
			.then(res => {
				dispatch({type: PUT_PRODUCT, product: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function deleteProduct(id) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3005/products/${id}`, {withCredentials: true})
			.then(res => {
				dispatch({type: DELETE_PRODUCT, product: res.data});
			})
			.catch(err => console.log(err));
	};
}

//* CATEGORY
export function getCategories() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/category', {withCredentials: true})
			.then(res => {
				dispatch({type: GET_CATEGORIES, categories: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function postCategory(category) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3005/category', category, {withCredentials: true})
			.then(res => {
				dispatch({type: POST_CATEGORY, category});
			})
			.catch(err => console.log(err));
	};
}

export function putCategory(category, id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3005/category/${id}`, category, {withCredentials: true})
			.then(res => {
				dispatch({type: PUT_CATEGORY, category: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function deleteCategory(id) {
	return function (dispatch) {
		return axios
			.delete('http://localhost:3005/category/' + id, {withCredentials: true})
			.then(res => {
				dispatch({type: 'DELETE_CATEGORY', category: res.data});
			})
			.catch(err => console.log(err));
	};
}

//* PRODUCT-CATEGORY
export function setCategory(prodId, catId) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3005/products/${prodId}/category/${catId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: SET_CATEGORY});
			})
			.catch(err => console.log(err));
	};
}
export function deleteProdCategory(prodId, catId) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3005/products/${prodId}/category/${catId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: DELETE_PROD_CATEGORY});
			})
			.catch(err => console.log(err));
	};
}

export function filterByCategory(categoria) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3005/products/category/${categoria}`, {withCredentials: true})
			.then(res => {
				dispatch({type: FILTER_BY_CATEGORY, catProducts: res.data});
			})
			.catch(err => console.log(err));
	};
}

//* CARRITO
export function getCarrito(userId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3005/users/${userId}/cart`, {withCredentials: true})
			.then(res => dispatch({type: GET_CARRITO, productsCar: res.data}))
			.catch(err => console.log(err));
	};
}

export function addToCart(userId, prodId) {
	return function (dispatch) {
		return axios
			.post(
				`http://localhost:3005/users/${userId}/cart`,
				{id: parseInt(prodId)},
				{withCredentials: true},
			)
			.then(res => {
				if (res.data.carritos.length) {
					res.data.lineorder = res.data.carritos[0].lineorder;
				} else {
					res.data.lineorder = {cantidad: 1};
				}
				dispatch({type: ADD_TO_CART, product: res.data});
			});
	};
}

export function setCantidad(userId, prodId, cantidades) {
	return function (dispatch) {
		axios
			.put(
				`http://localhost:3005/users/${userId}/cart`,
				{id: parseInt(prodId), cantidad: cantidades},
				{withCredentials: true},
			)
			.then(res => dispatch({type: SETCANTIDAD, product: res.data}))
			.catch(err => console.log(err));
	};
}

export function deleteProdCart(prodId) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3005/users/1/cart/${prodId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: DELETE_PROD_CART, productCar: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function getOrder(id) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3005/orders/${id}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_ORDER, orders: res.data});
			})
			.catch(err => console.log(err));
	};
}

//* ORDERS
export function getOrders() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/orders', {withCredentials: true})
			.then(res => {
				dispatch({type: GET_ORDERS, orders: res.data});
			})
			.catch(err => {
				console.log(err);
			});
	};
}

//* USERS

export function login(user) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3005/auth/login', user, {withCredentials: true})
			.then(res => {
				if (localStorage.getItem('productos') !== null) {
					let products = JSON.parse(localStorage.getItem('productos'));
					products.map(prod => addToCart(res.data.id, prod.id));
					localStorage.clear();
				}
				dispatch({type: LOGIN, user: res.data});
			})
			.catch(error => console.log(error));
	};
}

export function getUser() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/auth/me', {withCredentials: true})
			.then(res => {
				dispatch({type: GET_USER, user: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function logout() {
	return function (dispatch) {
		return axios
			.get('http://localhost:3005/auth/logout', {withCredentials: true})
			.then(res => dispatch({type: LOGOUT}))
			.catch(error => console.log(error));
	};
}
export function getUsers () {
	return function (dispatch) {
		return axios
		.get("http://localhost:3005/users", {withCredentials:true})
		.then (res => dispatch({type:GET_USERS, users: res.data}))
		.catch (err => console.log(err));
	}
}
export function deleteUsers (id) {
	return function (dispatch) {
		return axios
		.get (`http://localhost:3005/users/${id}`, {withCredentials: true})
		.then (res => dispatch({type: DELETE_USERS, deleteUser: res.data}))
		.catch (err => console.log(err))
	}
}
