import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Register() {
	const [name, set_name] = useState('');
	const [email, set_email] = useState('');
	const [whatsapp, set_whatsapp] = useState('');
	const [city, set_city] = useState('');
	const [uf, set_uf] = useState('');

	const history = useHistory();

	async function handleRegister(e) {
		e.preventDefault();
	
		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const response = await api.post('ongs', data);
			
			alert(`seu id aí desgraba: ${response.data.id}`);
			history.push('/');
		} catch (err) {
			alert('deu merda, faz dnv aí');
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be cha" />

					<h1>quer entrar no meu sistema??</h1>
					<p>vai bota bota tudo no meu sisteminha vai preenche meus formularios nhhhggmm,,</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						ok tchau gato..
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						placeholder="ong"
						value={name}
						onChange={e => set_name(e.target.value)}
					/>

					<input 
						type="e-mail" 
						placeholder="e-melho"
						value={email}
						onChange={e => set_email(e.target.value)}
					/>

					<input 
						placeholder="zap effron" 
						value={whatsapp}
						onChange={e => set_whatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input 
							placeholder="cidade" 
							value={city}
							onChange={e => set_city(e.target.value)}
						/>
						<input 
							placeholder="UF" style={{ width: 80 }}
							value={uf}
							onChange={e => set_uf(e.target.value)}
						/>
					</div>

					<button className="button" type="submit">BOTA!</button>
				</form>
			</div>
		</div>
	);
}