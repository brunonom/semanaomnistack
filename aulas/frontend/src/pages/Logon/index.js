import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import { FiLogIn } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
	const [id, set_id] = useState('');
	const history = useHistory();

	async function handleLogin(e){
		e.preventDefault();	

		try {
			const response = await api.post('sessions', { id });

			localStorage.setItem('ong_id', id);
			localStorage.setItem('ong_name', response.data.name);

			history.push('/profile');
		} catch (err) {
			alert('faio o login..');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Be cha" />

				<form onSubmit={handleLogin}>
					<h1>nome porra</h1>

					<input 
						placeholder="bota seu id aq porra" 
						value={id}
						onChange={e => set_id(e.target.value)}
					/>
					
					<button className="button" type="submit">bora</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#E02041" />nunca entrei nessa mizera n
					</Link>
				</form>

			</section>
			<img src={heroesImg} alt="bando de viadinho" />
		</div>
	);
}