/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import HomeStack from './src/Navigation/HomeStack';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReduces from './src/store/reducers';
const store = createStore(rootReduces, {}, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <GameController /> */}
        <HomeStack />
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
