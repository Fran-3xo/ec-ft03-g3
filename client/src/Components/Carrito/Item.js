import React, {useState, useEffect} from 'react';
import './Item.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCarrito, deleteProdCart, setCantidad} from '../../Actions/index';

function Item({titulo, descripcion, imagen, precio, id, deleteProdCart}) {
	console.log(titulo);
	// let num;
	// if (productsCar[0]?.precio && productsCar[0]?.lineorder?.cantidad)
	// 	num = productsCar[0]?.precio * productsCar[0]?.lineorder?.cantidad;
	const [cantidades, setCantidades] = useState({});
	const [can, setCantid] = useState(1);

	// useEffect(() => {
	// 	getCarrito(userId);
	// 	for (let i = 0; i < productsCar.length; i++) {
	// 		setCantidades((cantidades[productsCar[i].id] = 1));
	// 		console.log(cantidades);
	// 	}
	// }, [can]);
	// console.log(cantidades);

	const handleOnCLickCantidad = (prodId, type) => {
		// 	let cantidad = productsCar?.filter(prod => prod.id == prodId);
		// 	let stock = cantidad[0]?.stock;
		// 	cantidad = cantidad[0]?.lineorder?.cantidad;
		// 	console.log(prodId);
		// 	console.log(cantidades);
		// 	if (type === 'menos' && cantidad > 1) {
		// 		setCantidades({
		// 			...(cantidades ? cantidades[1] : cantidades[1] - 1),
		// 		});
		// 	} else if (type === 'mas' && stock > cantidad) {
		// 		setCantidades({
		// 			...(cantidades ? cantidades[prodId] : cantidades[prodId] + 1),
		// 		});
	};
	// 	console.log(cantidades);

	// 	// setCantidad(prodId, cantidad, type);
	// 	// axios
	// 	// 	.put(`http://localhost:3005/users/1/cart`, {id: parseInt(prodId), cantidad: cantidad})
	// 	// 	.then(res => res.data)
	// 	// 	.catch(err => console.log(err));
	// };
	// console.log(productsCar);
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
							onClick={e => handleOnCLickCantidad(e.target.name, 'menos')}
							name={id}>
							-
						</button>
						<p className="acomodo">{cantidades}</p>
						<button
							className="btn botoncart"
							onClick={e => handleOnCLickCantidad(e.target.name, 'mas')}
							name={id}>
							+
						</button>
					</div>
					<div className="precioboton">
						<p id="precio">$ {precio} </p>
						<button id="boton1" name={id} onClick={e => deleteProdCart(e.target.name)}>
							X
						</button>
					</div>
				</li>
			</ul>
			<p>{/* Total:{total} */}</p>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		productsCar: state.productsCar,
		total: state.totalCarrito,
	};
};
export default connect(null, {getCarrito, deleteProdCart, setCantidad})(Item);
