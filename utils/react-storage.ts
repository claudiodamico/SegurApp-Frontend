import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (user: User) => {
  try {
    await AsyncStorage.setItem('session', JSON.stringify(user));
  } catch (error) {
    // Error saving data
  }
};

export const getToken = async () => {
  try {
    const session = await AsyncStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  } catch (e) {
    // error reading value
  }
};
