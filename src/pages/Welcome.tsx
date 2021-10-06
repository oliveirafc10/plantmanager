import React from 'react';
import { 
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification');
    }
    
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>  
            <Text style={styles.title}>
                Gerencie {'\n'} 
                suas plantas de {'\n'} 
                forma fácil  
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
                onPress={handleStart}           >
                <Text >
                    <MaterialIcons 
                        name= "arrow-forward-ios"
                        style={styles.buttonIcon}
                    />
                </Text>
                
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {    
        flex: 1, //ocupar a tela toda

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around', //espacos iguais e não colar nas pontas
        //'space-between' espacos iguais e colar nas pontas
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        lineHeight: 34,
    },
    subtitle: {
        fontFamily: fonts.text,
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
    buttonIcon: {
        color: colors.white,
        fontSize: 24,
    }
})