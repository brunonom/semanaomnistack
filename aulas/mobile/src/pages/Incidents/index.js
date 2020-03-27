import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';

import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
	const [incidents, set_incidents] = useState([]);
	const [total, set_total] = useState(0);
	const [page, set_page] = useState(1);
	const [loading, set_loading] = useState(false);

	const navigation = useNavigation();

	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });
	}

	async function loadIncidents() {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		set_loading(true);

		const response = await api.get('incidents', {
			params: { page }
		});

		
		set_incidents([... incidents, ... response.data]);
		set_total(response.headers['x-total-ocunt']);
		set_page(page + 1);
		set_loading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					tu ta com <Text style={styles.headerTextBold}>{total} BOs</Text>
				</Text>
			</View>

			<Text style={styles.title}>COOOEEEE DIZGRASSSAAAA</Text>
			<Text style={styles.description}>boa tarde sra pirocuda vai salvar q viadinho hj?</Text>


			<FlatList
				data={incidents}
				style={styles.incidentList}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>

						<Text style={styles.incidentProperty}>CASY:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>

						<Text style={styles.incidentProperty}>VALYR:</Text>
						<Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
							style: "currency",
							currency: "brl"
						}).format(incident.value)}
						</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => navigateToDetail(incident)}
						>
							<Text style={styles.detailsButtonText}>qr ver mays?..</Text>
							<Feather name='arrow-right' size={16} color="#e02041" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}