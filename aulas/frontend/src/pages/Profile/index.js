import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile() {
	const [incidents, set_incidents] = useState([]); 
	
	const history = useHistory();

	const ong_id = localStorage.getItem('ong_id');
	const ong_name = localStorage.getItem('ong_name');

	useEffect(() => {
		api.get('profile', {
			headers: {
				Authorization: ong_id,
			}
		}).then(response => {
			set_incidents(response.data);
		});
	}, [ong_id]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers : {
					Authorization : ong_id,
				}
			});

			set_incidents(incidents.filter(incident => incident.id !== id));
		} catch (err) {
			alert('n deu p deletar n binho, tenta dnv ai');
		}
	}

	function handleLogout(){
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be cha" />
				<span>coe, {ong_name} (sua puta..)</span>

				<Link className="button" to="/incidents/new">bota mais..</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#e02048" />
				</button>
			</header>

			<h1>EU N AGUENTO MAIS PORRA</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASY:</strong>
						<p>{incident.title}</p>

						<strong>DESCRYCAO</strong>
						<p>{incident.description}</p>

						<strong>VALYR</strong>
						<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

						<button onClick={() => handleDeleteIncident(incident.id)} type="button">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}