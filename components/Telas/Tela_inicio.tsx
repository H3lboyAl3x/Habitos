import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { getUsers, initDB, deleteUser } from "../Banco_de_dados/database";
import { Habitos } from "../Banco_de_dados/types";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';


export function Tela_inicio({navigation}: any){
  const [habitos, sethabitos] = useState<Habitos[]>([]);

  const handleLongPress = (item: Habitos) => {
    Alert.alert(
      "O que deseja fazer?",
      `Hábito: ${item.nome}`,
      [
        { text: "Editar", onPress: () => navigation.navigate('Adicionar_habito', { habito: item }) },
        { text: "Apagar", onPress: () => apagarHabito(item.id!), style: "destructive" },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };
  const apagarHabito = async (id: number) => {
    await deleteUser(id);
    carregarHabitos(); // atualiza a lista
  };

  const carregarHabitos = async () => {
    const lista = await getUsers();
    sethabitos(lista);
  };

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        await initDB();       
        await carregarHabitos(); 
      };
      carregar();
    }, [])
  );

  return (
    <View style={styles.Container}>
      <View style={styles.Conteudo}>
        <Text style={styles.Texto}>Todos os seus hábitos estão listados aqui</Text>

        <FlatList
          data={habitos}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.Habitos} onLongPress={() => handleLongPress(item)}>
              <Text style={[styles.Texto, {marginVertical: 0}]}>{item.nome}</Text>
              <Text style={[styles.Texto, {marginVertical: 0}]}>{item.hora}</Text>
            </TouchableOpacity>
          )}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>

      <View style={styles.Base}>
        <TouchableOpacity style={styles.Botao} onPress={() => navigation.navigate('Adicionar_habito')}>
          <Text style={styles.Texto_botao}>Criar Hábito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  Conteudo:{
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    height: '75%',
    width: '90%',
    marginVertical: '3%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Texto:{
    fontSize: 15,
    marginVertical: '10%',
    fontWeight: 'bold'
  },
  Scroll:{
    width: '90%',
    marginBottom: '5%',
    flex: 1
  },
  ScrollContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  Habitos:{
    height: 70,
    width: '100%',
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 50,
    marginVertical: '1%',
    alignItems: "center",
    justifyContent: "center",
  },
  Base:{
    height: '10%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Botao:{
    backgroundColor: '#0091FF',
    height: '80%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  Texto_botao:{
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
