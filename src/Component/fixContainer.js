import React, {useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {pColor} from '~styles/colors';

const FixedContainer = ({children, style, ...rest}) => {
  const [reresnderST, setReresnderST] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setReresnderST(true);
    }, 100);
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaView, style]} {...rest}>
      {reresnderST ? (
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      ) : null}

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default FixedContainer;
