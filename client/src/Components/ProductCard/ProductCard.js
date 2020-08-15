import React from 'react';
import './ProductCard.css';

export default function ProductCard({imagen, titulo, precio, id}) {
	return (
		<div className="card">
			<img className="img" src={imagen} alt="" />
			<h1 className="titulo"> {titulo} </h1>
			<p> {precio} </p>
			<button className="boton">Add to cart</button>
		</div>
	);
}
