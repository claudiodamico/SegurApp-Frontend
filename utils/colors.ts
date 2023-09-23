import {MD2Colors} from 'react-native-paper';

export const getColorAlert = (message: string) => {
  switch (message.toUpperCase()) {
    case 'ROBO':
      return MD2Colors.red900;
    case 'ALERTA':
      return MD2Colors.yellow500;
    case 'SOSPECHOSO':
      return MD2Colors.yellow900;
    case 'PELEA':
      return MD2Colors.red500;
    default:
      return MD2Colors.red500;
  }
};

export const getIconAlert = (message: string) => {
  switch (message.toUpperCase()) {
    case 'ROBO':
      return 'hat-fedora';
    case 'ALERTA':
      return 'alert';
    case 'SOSPECHOSO':
      return 'account-alert';
    case 'PELEA':
      return 'kabaddi';
    default:
      return 'alert';
  }
};
