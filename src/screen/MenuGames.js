import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FixedContainer from '../Component/fixContainer';
import PackMan from './PackMan';

const MenuGames = ({navigation}) => {
  return (
    <FixedContainer style={styles.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('GameController')}>
        <Text>2048 Games</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HomePacMan')}>
        <Text>PacMan Games</Text>
      </TouchableOpacity>
    </FixedContainer>
  );
};

export default MenuGames;
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
