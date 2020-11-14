import * as TaskManager from 'expo-task-manager';

export const createTask = async () => {
  TaskManager.defineTask(
    'to_aqui_app_geolocalizacao',
    ({ data: { locations }, error }: any) => {
      if (error) {
        // check `error.message` for more details.
        return;
      }
      console.log('Received new locations', locations);
    },
  );
};
