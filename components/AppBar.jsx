import * as React from 'react';
import {Appbar} from 'react-native-paper';

const AppBar = ({title}) => (
  <Appbar.Header>
    <Appbar.Content title="SegurApp" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;
