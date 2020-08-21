const server = require('express').Router();
const {Op} = require('sequelize');
const {User, Carrito, Product, lineorder} = require('../db.js');

server.get('/', (req, res) => {
	User.findAll()
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			console.log(err);
		});
});

server.post('/', (req, res) => {
	User.create(req.body)
		.then(user => {
			res.status(201).send(user);
		})
		.catch(err => {
			console.log(err);
		});
});

server.put('/:id', (req, res) => {
	var newEmail = req.body.email;
	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then(user => {
			user.update({
				email: newEmail,
			});
			user.save();
			res.status(200).send('Usuario actualizado');
		})
		.catch(err => {
			res.send('Usuario inexistente');
		});
});

server.delete('/:id', (req, res) => {
	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then(user => {
			if (!user) {
				res.send('Usuario inexistente');
			} else {
				user.destroy();
				res.status(200).send('Usuario eliminado');
			}
		})
		.catch(err => {
			console.log(err);
		});
});

server.post('/:ids/cart', (req, res) => {
	var ids = req.params.ids;
	const {id} = req.body;
	let pProduct = Product.findByPk(id);
	let pCarrito = Carrito.findOrCreate({
		where: {
			userId: ids,
			estado: 'activo',
		},
	});
	Promise.all([pCarrito, pProduct])
		.then(values => {
			console.log(values[1]);
			let carrito = values[0][0];
			let producto = values[1];
			producto.addCarritos(carrito, {through: {cantidad: 1, precio: producto.precio}});
			res.send(carrito);
		})
		.catch(err => console.log(err));
});

server.get('/:ids/cart', (req, res) => {
	var ids = req.params.ids;
	Carrito.findOne({
		where: {
			userId: ids,
			[Op.or]: [{estado: 'activo'}, {estado: 'completa'}],
		},
		include: {
			model: Product,
		},
	})
		.then(carrito => {
			res.send(carrito.products);
		})
		.catch(err => {
			console.log(err);
		});
});

server.delete('/:ids/cart', (req, res) => {
	var ids = req.params.ids;
	Carrito.findOne({
		where: {
			userId: ids,
			estado: 'activo',
		},
	})
		.then(carrito => {
			carrito.destroy();
			res.status(201).send('Carrito vaciado.');
		})
		.catch(err => {
			console.log(err);
		});
});

server.put('/:ids/cart', (req, res) => {
	var ids = req.params.ids;
	var data = req.body;
	Carrito.findOne({
		where: {
			userId: ids,
			estado: 'activo',
		},
		include: {
			model: Product,
		},
	})
		.then(carrito => {
			let result = carrito.products.filter(el => el.id === data.id);
			result[0].lineorder.update({
				cantidad: data.cantidad,
			});
			result[0].lineorder.save();
			res.send('Cantidad actualizada');
		})
		.catch(err => {
			console.log(err);
		});
});

server.get('/:ids/orders', (req, res) => {
	//Ruta trae toda las ordenes de un usuario.
	Carrito.findAll({
		where: {
			userId: req.params.ids,
			estado: 'completa',
		},
	})
		.then(completados => {
			res.send(completados);
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = server;
