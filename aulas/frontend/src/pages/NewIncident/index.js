import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
	const [title, set_title] = useState('');
	const [description, set_description] = useState('');
	const [value, set_value] = useState('');

	const ong_id = localStorage.getItem('ong_id');

	const history = useHistory();

	async function handleNewIncident(e){
		e.preventDefault();

		const data = {
			title,
			description,
			value
		}

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization : ong_id,
				}
			});

			history.push('/profile');
		} catch (err) {
			alert('n deu p botar seu caso n viadinho, tente nvmnt');
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be cha" />

					<h1>bota mais caso vai</h1>
					<p>me diz exatamente oi q vc vai fzr cmg hggmhgmgh...</p>

					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
						volta pra outra, cafajeste
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input 
						placeholder="titulo"
						value={title}
						onChange={e => set_title(e.target.value)}
					/>
					<textarea 
						placeholder="aqui q vc diz como que mai me *****"
						value={description}
						onChange={e => set_description(e.target.value)}
					/>
					<input 
						placeholder="qto que ce vai me pagar"
						value={value}
						onChange={e => set_value(e.target.value)}
					/>

					<button className="button" type="submit">BOTA!</button>
				</form>
			</div>
		</div>
	);
}