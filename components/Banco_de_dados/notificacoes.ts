import * as Notifications from 'expo-notifications';

export const agendarNotificacao = async (
  id: number,
  nome: string,
  hora: string,
  descricao: string
) => {
  const [hh, mm] = hora.split(':').map(Number);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hábito!',
      body: `Hora de: ${nome} \n${descricao}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hh,
      minute: mm,
      channelId: 'default'
    },
  });
  return notificationId;
};

export const apagarNotificacao = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
