import React from 'react';
import './ProductCard.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function ProductCard({imagen, titulo, precio, review, id}) {
	// const handleOnCLick(userId){
	// 	axios.get('http://localhost:3005/users//')
	// 	axios.post(`http://localhost:3005/users/${userId}/cart`)
	// }
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
					<button className="btn btn-sm btn-primary float-right">Order Now</button>
					<div className="price-wrap h5">
						<span className="price-new">${precio}</span>
					</div>
				</div>
			</figure>
		</div>
	);
}
