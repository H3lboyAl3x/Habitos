// index.tsx
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// Importação das Telas
import { Tela_inicio } from '@/components/Telas/Tela_inicio';
import { Adicionar_habito } from '@/components/Telas/Adicionar_habito';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,   // este é obrigatório
    shouldShowBanner: true,  // obrigatório no Android 13+
    shouldShowList: true,    // obrigatório
  }),
});

export default function HomeScreen() {

  useEffect(() => {
    (async () => {

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        alert('Permissão para notificações não concedida!');
      }
    })();
  }, []);


  return (
      <Stack.Navigator initialRouteName='Tela_inicio'>
        <Stack.Screen 
          name="Tela_inicio" 
          component={Tela_inicio} 
          options={{
            title: 'Hábitos',
            headerTitleStyle: { fontSize: 25, fontWeight: 'bold' }
          }}
        />
        <Stack.Screen 
          name="Adicionar_habito" 
          component={Adicionar_habito} 
          options={{
            title: 'Adicionar Hábito',
            headerTitleStyle: { fontSize: 25, fontWeight: 'bold' }
          }}
        />
      </Stack.Navigator>
  );
}
