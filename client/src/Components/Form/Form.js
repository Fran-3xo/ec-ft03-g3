import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Form.css';
import {
	deleteProduct,
	setCategory,
	deleteProdCategory,
	postProducts,
	putProducts,
} from '../../Actions/index.js';
import {connect} from 'react-redux';

function Form({products, setCategory, deleteProdCategory, postProducts, putProducts}) {
	const [input, setInput] = useState({});
	const [select, setSelect] = useState('post');
	const [id, setId] = useState();
	const [catId, setCatId] = useState();
	const [selectCat, setSelectCat] = useState('post');
	const handleInputChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});
	};

	const handleOnClick = e => {
		axios
			.delete(`http://localhost:3005/products/${e.target.name}`)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const handleOnClickEdit = (e, state) => {
		axios
			.put(`http://localhost:3005/products/${id}`, state)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const handleSubmit = (e, state) => {
		e.preventDefault();
		switch (select) {
			case 'post':
				postProducts(state);
				break;
			case 'put':
				putProducts(state, id);
				break;
			case 'delete':
				deleteProduct(id);
				break;
		}
	};

	const handleCatSubmit = event => {
		event.preventDefault();
		switch (selectCat) {
			case 'post':
				setCategory(id, catId);
			case 'delete':
				deleteProdCategory(id, catId);
				break;
		}
	};
	return (
		<div>
			<table class="table table-striped table-dark">
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Titulo</th>
						<th scope="col">Descripcion</th>
						<th scope="col">Precio</th>
						<th scope="col">Stock</th>
						<th scope="col">Imagen</th>
						<th scope="col">Categoría</th>
						<th scope="col">Acción</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((p, i) => (
						<tr>
							<th scope="row">{p.id}</th>
							<td contenteditable="true">{p.titulo}</td>
							<td contenteditable="true">{p.descripcion}</td>
							<td contenteditable="true">{p.precio}</td>
							<td contenteditable="true">{p.stock}</td>
							<td contenteditable="true">{p.imagen}</td>
							<td contenteditable="true">{p.categoria}</td>
							<td>
								<button onClick={e => deleteProduct(e.target.name)} name={p.id}>
									Del
								</button>
								<button onClick={e => handleOnClickEdit(e)} name={p.id}>
									Edit
								</button>
							</td>
							<td></td>
						</tr>
					))}
				</tbody>
			</table>
			<form className="formulario" onSubmit={e => handleSubmit(e, input)}>
				<span className="clase">
					<label> Acción </label>
					{select !== 'delete' && (
						<span className="labels">
							<label> Titulo </label>
							<label> Descripcion </label>
							<label> Precio </label>
							<label> Stock </label>
							<label> Imagen</label>
							<label> Id Categ</label>
						</span>
					)}
					{select !== 'post' && <label> Id </label>}
				</span>
				<span className="clase">
					<select name="options" onChange={e => setSelect(e.target.value)}>
						<option value="post">Crear</option>
						<option value="put">Modificar</option>
						<option value="delete">Borrar</option>
					</select>

					{select !== 'delete' && (
						<span className="inputs">
							<input
								type="text"
								name="titulo"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="descripcion"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
							<input
								type="number"
								name="precio"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
							<input
								type="number"
								name="stock"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="imagen"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="categoria"
								placeholder="Agregar..."
								onChange={handleInputChange}
							/>
						</span>
					)}
					{select !== 'post' && (
						<input
							type="number"
							name="id"
							placeholder="Agregar..."
							onChange={e => setId(e.target.value)}
						/>
					)}
					<input type="submit" value="+" className="btn btn-success" />
				</span>
			</form>

			<form onSubmit={e => handleCatSubmit(e)} className="formcont">
				<h2 className="tit"> Agregar Categorías a un Producto</h2>
				<span className="labelcat">
					<label> Acción </label>
					<label> Id Producto </label>
					<label> Id Categoria </label>
				</span>
				<span className="inputcat">
					<select name="options" onChange={e => setSelectCat(e.target.value)}>
						<option value="post">Agregar</option>
						<option value="delete">Eliminar</option>
					</select>
					<input
						type="number"
						name="productId"
						placeholder="Agregar..."
						onChange={e => setId(e.target.value)}
					/>
					<input
						type="number"
						name="catId"
						placeholder="Agregar..."
						onChange={e => setCatId(e.target.value)}
					/>
					<input type="submit" value="+" className="bot btn-success" />
				</span>
			</form>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		products: state.products,
		product: state.product,
		putProduct: state.putProduct,
	};
};
export default connect(mapStateToProps, {
	setCategory,
	deleteProdCategory,
	postProducts,
	putProducts,
})(Form);
