import * as Notifications from 'expo-notifications';

export const agendarNotificacao = async (
  id: number,
  nome: string,
  hora: string
) => {
  const [hh, mm] = hora.split(':').map(Number);

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Hábito!', body: `Hora de: ${nome}` },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hh,
      minute: mm
    },
  });
}