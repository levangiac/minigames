import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DoubleBounce} from 'react-native-loader';

const PageLoading = () => {
  return (
    <View style={styles.container}>
      <DoubleBounce size={30} color="#1CAFF6" />
      <Text style={styles.textStyle}>Pacman is Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'gray',
    fontSize: 15,
    padding: 10,
  },
});

export default PageLoading;
