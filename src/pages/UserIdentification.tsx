import React, { useState } from 'react';
import {  
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false); // filled = conteudo
    const [name, setName] = useState<string>(); //<> para colocar tipo
    const navigation = useNavigation();    

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name); //se tiver conteudo, ja pega o nome
    }
    function handleInputFocus() {
        setIsFocused(true);
    }
    function handleInputChange(value: string) { //quando i input mudar
        setIsFilled(!!value); //transforma value em verdadeiro ou falso,
        setName(value);       //se tem conteudo é verdadeiro
    }   
    
    function handleSubmit() {
        navigation.navigate('Confirmation');
    }

    return (
        <SafeAreaView style={styles.container} >
          <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // teclado
            > 

            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.emoji}>
                            {isFilled ? '😄' : '😀'}
                        </Text>
                        <Text style={styles.title}>
                            Como podemos {'\n'}
                            chamar você ?
                        </Text>
                    </View>    
                        <TextInput 
                            style={[
                                styles.input,  //&& = verdadeiro
                                (isFocused || isFilled) && // || = or , ou esta ou ...
                                { borderColor: colors.green } //se estiver no campo
                                                            //e for preenchido
                            ]}
                            placeholder= "Digite um nome"
                            onBlur={handleInputBlur}   //quando sai do input
                            onFocus={handleInputFocus} //vai para o input
                            onChangeText={handleInputChange} //
                        />
                    <View style={styles.footer}>
                        <Button
                            title="Confirmar"
                            onPress={handleSubmit} 
                        />
                    </View>
                </View>


            </View>
         </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 54,
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
        alignItems: 'center',
    },
    input: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    }, 
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },
});
