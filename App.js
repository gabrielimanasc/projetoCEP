import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App(){
const[cep, setCep] = useState('');
const[cepUser, setCepUser] = useState(null);


  function limpar(){
    setCep('');
    setCepUser(null);
  }

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep válido');
      setCep('');
      return;
    }

    try{
    const response = await api.get(`/${cep}/json`);
    console.log(response.data);
    setCepUser(response.data);

    Keyboard.dismiss();
    }catch(error){
      console.log('ERROR' + error);
    }
  }

  return(
    <SafeAreaView style={styles.container}>
    <View style={{alignItems:'center'}}>
      <Text style={styles.text}>Digite o CEP desejado</Text>
      <TextInput
      style={styles.input}
      placeholder= "Ex: 99010034"
      value={cep}
      onChangeText={(texto) => setCep(texto) }
      keyboardType="numeric"
      />
    </View>
    <View style={styles.areaBtn}>
      <TouchableOpacity
      style={[ styles.botao, {backgroundColor: '#1d75cd'} ]}
      onPress={ buscar }
      >
        <Text style={styles.botaoText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={[ styles.botao, {backgroundColor: '#FF0000'} ]}
      onPress={ limpar }
      >
        <Text style={styles.botaoText}>Limpar</Text>
      </TouchableOpacity>

    </View>

    {cepUser &&
    <View style={styles.resultado}>
      <Text style={styles.itemText}>CEP: {cepUser.cep} </Text>
      <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
      <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
      <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
      <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
    </View>
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    borderRadius: 2,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '90%',
    padding: 10,
    fontSize: 18,

  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText:{
    fontSize: 15,
    color:'#FFF'
  },
  resultado:{
    Flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },  
  itemText:{
    fontSize: 22,
  }
})