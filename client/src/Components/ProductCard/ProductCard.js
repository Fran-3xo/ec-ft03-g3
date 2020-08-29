import React from 'react';
import './ProductCard.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {addToCart} from '../../Actions/index';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));
function ProductCard({imagen, titulo, precio, review, id, stock, addToCart, user}) {
	// const handleOnCLick = (id, userId) => {
	//     axios.post(´http://localhost:3005/users/${userId}/cart´, {id: parseInt(id)});
	// };
	const obtenerProductos = () => {
		let products;
		if (localStorage.getItem('productos') === null) {
			products = [];
		} else {
			products = JSON.parse(localStorage.getItem('productos'));
		}
		return products;
	};
	const getProducto = prodId => {
		return axios
			.get(`http://localhost:3005/products/${prodId}`, {withCredentials: true})
			.then(res => {
				console.log(res.data);
				if (res.data.carritos.length) {
					res.data.lineorder = res.data.carritos[0].lineorder;
				} else {
					res.data.lineorder = {cantidad: 1};
				}
				let productos = obtenerProductos();
				productos.push(res.data);
				localStorage.setItem('productos', JSON.stringify(productos));
			})
			.catch(err => console.log(err));
	};
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	console.log(user);
	const handleClick = e => {
		if (user.id) {
			addToCart(user.id, e.target.name);
		} else {
			getProducto(e.target.name);
		}
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div>
			<figure className="card card-product contein">
				<Link to={`/product/${id}`}>
					<div className="img-wrap">
						<img src={imagen} className="imagen" />
					</div>
				</Link>
				<figcaption className="info-wrap">
					<h4 className="title">{titulo}</h4>
					<div className="rating-wrap">
						<div className="label-rating"> (Review) </div>
					</div>
				</figcaption>
				<div className="bottom-wrap">
					<button
						className="btn btn-sm btn-primary float-right"
						onClick={e => handleClick(e)}
						name={id}
						disabled={stock === 0 ? true : false}>
						{stock === 0 ? 'Sin Stock' : 'Comprar'}
					</button>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success">
							Agregado al carrito!
						</Alert>
					</Snackbar>
					<div className="price-wrap h5">
						<span className="price-new">${precio}</span>
					</div>
				</div>
			</figure>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}
export default connect(mapStateToProps, {addToCart})(ProductCard);
