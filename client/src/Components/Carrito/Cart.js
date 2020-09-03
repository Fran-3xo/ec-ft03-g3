import React, {useState, useEffect} from 'react';
import Item from './Item';
import axios from 'axios';
import './cart.css';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {emptyCart, getCarrito, addToCart} from '../../Actions/index';
import {Redirect} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
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

function Cart({emptyCart, productsCar, getCarrito, user, localStor, addToCart}) {
	const [redirect, setRedirect] = useState(false);
	let cart;
	let data = JSON.parse(localStorage.getItem('productos'));

	useEffect(() => {
		user.id && getCarrito(user.id);
		if (localStor) {
			console.log(localStor);
			localStor.map(prod => addToCart(user.id, prod.id, prod.lineorder.cantidad));
		}
	}, [user]);

	console.log(productsCar);
	if (user.id) cart = productsCar;
	else {
		cart = data;
	}
	useEffect(() => {
		// setPrecio(total);
	}, [productsCar]);

	const [open, setOpen] = React.useState(false);
	const [abrir, setAbrir] = React.useState(false);

	const handleClickOpen = () => {
		setAbrir(true);
	};

	const handleClose = () => {
		setAbrir(false);
	};
	if (redirect) {
		return <Redirect to="/sendform" />;
	}

	const handleClick = () => {
		setOpen(true);
	};

	const handleClosed = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);

	};
	return (
		<div className="flexend">
			{cart?.map((p, i) => (
				<Item
					titulo={p.titulo}
					descripcion={p.descripcion}
					imagen={p.imagen}
					precio={p.precio}
					id={p.id}
					stock={p.stock}
					cantidad={p.lineorder.cantidad}
					key={i}
				/>
			))}
			{cart?.length > 0 ? (
				<h2 id="total">
					TOTAL: $
					{cart?.reduce(
						(total, producto) => total + producto.precio * producto.lineorder.cantidad,
						0,
					)}
					{/* $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} */}
				</h2>
			) : (
				<div className="noProducts">Aún no agregaste productos al carrito.</div>
			)}
			{cart?.length > 0 ? (
				<button id="vaciar" onClick={() => handleClickOpen()}>
					Vaciar
				</button>
			) : (
				''
			)}
			<Dialog
				open={abrir}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{'Vaciar carrito'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						¿Estas seguro que quieres vaciar el carrito?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleClose();
							emptyCart(user.id);
						}}
						color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
			{cart?.length > 0 ? (
				<button
					id="compra"
					onClick={() => {
						handleClick();
						
						setTimeout(function () {
							setRedirect(true);
						}, 1000);
					}}>
					Checkout
				</button>
			) : (
				''
			)}
			
		</div>
	);
}

function mapStateToProps(state) {
	return {
		productsCar: state.productsCar,
		user: state.user,
		localStor: state.localStorage,
	};
}
export default connect(mapStateToProps, {emptyCart, getCarrito, addToCart})(Cart);
