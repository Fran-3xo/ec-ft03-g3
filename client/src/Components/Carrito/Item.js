import React, {useState} from 'react';
import './Item.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteProdCart, setCantidad} from '../../Actions/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Item({
	titulo,
	descripcion,
	imagen,
	precio,
	id,
	deleteProdCart,
	stock,
	cantidad,
	hand,
	setCantidad,
	user,
}) {
	const [cantidades, setCantidades] = useState(cantidad);
	const handleOnCLickCantidad = (prodId, type) => {
		if (type === 'menos' && cantidades > 1) {
			setCantidades(cantidades - 1);
			hand(cantidades - 1, id, precio);
			setCantidad(user.id, prodId, cantidades - 1);
			// axios
			// 	.put(
			// 		`http://localhost:3005/users/1/cart`,
			// 		{id: parseInt(prodId), cantidad: cantidades - 1},
			// 		{withCredentials: true},
			// 	)
			// 	.then(res => res.data)
			// 	.catch(err => console.log(err));
		} else if (type === 'mas' && stock > cantidades) {
			setCantidades(cantidades + 1);
			hand();
			setCantidad(user.id, prodId, cantidades + 1);
			// axios
			// 	.put(
			// 		`http://localhost:3005/users/1/cart`,
			// 		{id: parseInt(prodId), cantidad: cantidades + 1},
			// 		{withCredentials: true},
			// 	)
			// 	.then(res => res.data)
			// 	.catch(err => console.log(err));
		}
	};
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className="carritoItem">
			<ul className="list-group list-group-flush cartitem">
				<li className="list-group-item disp itemind">
					<img className="imgCart" src={imagen} />
					<div className="titdes">
						<p className="tituloo">{titulo}</p>
						<p>{descripcion}</p>
					</div>
					<div className="botooon">
						<button
							className="btn botoncart"
							onClick={e => {
								handleOnCLickCantidad(e.target.name, 'menos');
							}}
							name={id}>
							-
						</button>
						<p className="acomodo">{cantidades}</p>
						<button
							className="btn botoncart"
							onClick={e => {
								handleOnCLickCantidad(e.target.name, 'mas');
							}}
							name={id}>
							+
						</button>
					</div>
					<div className="precioboton">
						<p id="precio">$ {precio} </p>
						<button
							id="boton1"
							variant="outlined"
							color="primary"
							onClick={() => handleClickOpen()}>
							X
						</button>
						<Dialog
							open={open}
							TransitionComponent={Transition}
							keepMounted
							onClose={handleClose}
							aria-labelledby="alert-dialog-slide-title"
							aria-describedby="alert-dialog-slide-description">
							<DialogTitle id="alert-dialog-slide-title">{'Eliminar Producto'}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-slide-description">
									¿Estas seguro que deseas eliminar el producto
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<button id="boton2" onClick={handleClose} color="primary">
									Cancelar
								</button>
								<button
									id="boton1"
									variant="outlined"
									color="primary"
									name={id}
									onClick={e => {
										deleteProdCart(e.target.name);
										handleClose();
									}}>
									Aceptar
								</button>
							</DialogActions>
						</Dialog>
					</div>
				</li>
			</ul>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		user: state.user,
	};
}
export default connect(mapStateToProps, {deleteProdCart, setCantidad})(Item);
