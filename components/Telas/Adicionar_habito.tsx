import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addUser, updateUser, getUsers } from "../Banco_de_dados/database";
import { agendarNotificacao } from "../Banco_de_dados/notificacoes";
import { useState } from "react";

export function Adicionar_habito({ navigation, route }: any) {
  const habitToEdit = route.params?.habito; // se houver, é edição

  const [nome, setnome] = useState(habitToEdit?.nome || '');
  const [hora, sethora] = useState(habitToEdit?.hora || '');
  const [descricao, setdescricao] = useState(habitToEdit?.descricao || '');

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(habitToEdit ? new Date(`1970-01-01T${habitToEdit.hora}:00`) : new Date());

  const adicionarOuEditar = async () => {
    if(nome && hora && descricao){
      if(habitToEdit){ 
        await updateUser(habitToEdit.id!, nome, hora, descricao);
        await agendarNotificacao(habitToEdit.id!, nome, hora);
      } else { 
        await addUser(nome, hora, descricao);
        // buscar o último hábito criado para pegar o id
        const lista = await getUsers();
        const ultimo = lista[lista.length - 1];
        await agendarNotificacao(ultimo.id!, nome, hora);
      }
      navigation.goBack();
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if(selectedTime){
      setTime(selectedTime);
      const horaString = selectedTime.getHours().toString().padStart(2,'0') + ':' +
                         selectedTime.getMinutes().toString().padStart(2,'0');
      sethora(horaString);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Conteudo}>
        <Text style={styles.Texto}>Nome</Text>
        <TextInput style={styles.Coixa_de_texto} value={nome} onChangeText={setnome} />

        <Text style={styles.Texto}>Hora</Text>
        <TouchableOpacity style={styles.Coixa_de_texto} onPress={() => setShowTimePicker(true)}>
          <Text>{hora || 'Selecionar hora'}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChangeTime}
          />
        )}

        <Text style={styles.Texto}>Descrição</Text>
        <TextInput multiline style={[styles.Coixa_de_texto, {height: 100}]} value={descricao} onChangeText={setdescricao}/>

        <TouchableOpacity style={styles.Botao} onPress={adicionarOuEditar}>
          <Text style={styles.Texto_botao}>{habitToEdit ? 'Salvar alterações' : 'Criar'}</Text>
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
    backgroundColor: '#FFFFFF',
    height: '90%',
    width: '90%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  Texto:{
    fontSize: 15,
    marginVertical: '5%',
    marginHorizontal: '5%',
    fontWeight: 'bold'
  },
  Coixa_de_texto:{
    width: '90%',
    height: 60,
    marginHorizontal: '5%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
  },
  Botao:{
    backgroundColor: '#0091FF',
    height: 60,
    width: '90%',
    marginHorizontal: '5%',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  Texto_botao:{
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
});