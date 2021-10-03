import React from 'react';
import { 
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native'

import { Button } from '../components/Button'
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'} 
                suas plantas {'\n'} 
                de forma fácil  
            </Text>
            
            <Image
               source={wateringImg} 
               style={styles.image}
               resizeMode="contain" //ajuda a recalcular a imagem
            />
            
            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. {'\n'} 
                Nós cuidamos de lembrar você sempre que precisar. 
            </Text>

            <TouchableOpacity 
                style={styles.button}
                activeOpacity= {0.7} //opacidade quando clicar de 70%
            >
                <Text style={styles.buttonText} >
                    >
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {    
        flex: 1, //ocupar a tela toda
        alignItems: 'center',
        justifyContent: 'space-around' //espacos iguais e não colar nas pontas
        //'space-between' espacos iguais e colar nas pontas
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20,
        color: colors.heading,
    },
    image: {
        height: Dimensions.get('window').width * 0.7, //calcula a imagem conforme a tela
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24,
    }
})