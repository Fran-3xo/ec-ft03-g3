import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {filterByCategory} from '../../Actions/index';

function NavBar({search, category, filterByCategory}) {
	return (
		<nav class="navigatorbar">
			<Link to="/">
				<a href="#home">Home</a>
			</Link>
			<Link to="/form">
				<a href="#form">Form</a>
			</Link>
			<div class="dropd">
				<button class="dropdbtn">
					Categorias
					<i class="fa fa-caret-down"></i>
				</button>
				<div class="dropd-cont">
					{category?.map(c => (
						<Link to={c.titulo} onClick={e => filterByCategory(c.titulo)}>
							{c.titulo}
						</Link>
					))}
				</div>
			</div>
			<SearchBar search={search} />
		</nav>
	);
}

export default connect(null, {filterByCategory})(NavBar);
