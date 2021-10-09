import React, { useEffect, useState } from 'react';
import {  
    View,
    Text,
    StyleSheet,
    FlatList, // renderiza lista na tela
    ActivityIndicator,
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';
import { Load } from '../components/Load';

import api from '../services/api';

import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface EnvironmentProps {
    key: string;
    title: string;
}
interface PlantProps {
      id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string];
      frequency: {
        times: number;
        repeat_every: string; 
    }
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    function handleEnvironmentSelected(environment: string){
        setEnvironmentSelected(environment);

        if (environment == 'all' )
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)    
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

        if(!data)
            return(true);

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else {
            setPlants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false);  // controla a animação da planta nascendo
        setLoadingMore(false);          
    }

 // recarregar trazendo mais dados
    function handleFetchMore(distance: number) {
        if(distance < 1) // se a distancia é menor que 1 significa que ele está indo para o primeiro item.
            return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

     // carrega antes de montar a tela
    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.
            get('plants_environments?_sort=title&order=asc');
            setEnvironments([
                { 
                    key: 'all',
                    title: 'todos',
                },
                ...data
            ]);            
        }

        fetchEnvironment()

    }, [])

    useEffect(() => {
        

        fetchPlants()

    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Text>
                    <Header />
                </Text>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>
            <View>
               <FlatList
                    data={environments} //vetor
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal 
                    showsHorizontalScrollIndicator= {false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                    <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={ item }
                        />
                    )}
                    showsVerticalScrollIndicator= {false}
                    numColumns={2}
                    onEndReachedThreshold={0.1} // quando o usuario chegar a 10% da tela
                    onEndReached={({ distanceFromEnd }) => //distância para a parte de baixo 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore //só aparece quando o loadingMore for verdadeiro
                        ? <ActivityIndicator color={colors.green} />
                        : <></> //desfragment só para não carregar mais nada
                    }
                    />                    
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {    
        flex: 1, //ocupar a tela toda
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
    },
    title: {    
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
    },
    subtitle: { 
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
    },
    environmentList: {
        height: 45,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 10,
        marginVertical: 16,
    },
    plants: {
        flex: 1,
        paddingVertical: 1,
        justifyContent: 'center',
    },
})