import * as React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Spinner = () => (
  <ActivityIndicator animating={true} color={MD2Colors.blue600} size="large" />
);

export default Spinner;
