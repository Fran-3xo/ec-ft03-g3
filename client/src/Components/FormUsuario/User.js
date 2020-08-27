import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

function user({user}) {
	const handleOnClick = () => {
		axios
			.get('http://localhost:3005/auth/logout', {withCredentials: true})
			.then(res => console.log(res))
			.catch(error => console.log(error));
	};
	return (
		<div>
			<h1>
				{user.nombre} {user.apellido}
			</h1>
			<p> {user.email} </p>
			<button onClick={handleOnClick}> Cerran Sesión </button>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default connect(mapStateToProps)(user);