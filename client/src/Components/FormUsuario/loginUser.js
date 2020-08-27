import React, {useState} from 'react';
import axios from 'axios';
import './Form.css';
import {login} from '../../Actions/index'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

 export function Alert(props) {
 	return <MuiAlert elevation={6} variant="filled" {...props} />;
 }
 const useStyles = makeStyles((theme) => ({
 	root: {
 	width: "100%",
 	"& > * + *": {
 		marginTop: theme.spacing(2),
 	},
 	},
 }));

function LoginUser({login}) {
	//const [email, setEmail] = useState({email: ''});
  const [state, setState] = useState({});

	const handleOnChange = (e) => {
		setState({
		 ...state,
		 [e.target.name]: e.target.value
	  })
	}

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
		};
		const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		};

	return (
		<div className="Formm">
			<form onSubmit={() => login(state)}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
					  name='email'
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={e => handleOnChange(e)}
					/>
					<label htmlFor="exampleInputPassword">Contraseña</label>
					<input
					  name='password'
						type="password"
						className="form-control"
						id="exampleInputPassword"
						onChange={e => handleOnChange(e)}
					/>
					<small id="emailHelp" className="form-text text-muted">
						No compartiremos tus datos con nadie.
					</small>
				</div>
				<Button onClick = {handleClick}variant="contained" color="primary" type="submit"  value="Submit">
					Submit
				</Button>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            	<Alert onClose={handleClose} severity="success">
                Usuario creado!
            	</Alert>
            </Snackbar>
			</form>
		</div>
	);
}

export default connect(null, {login})(LoginUser)