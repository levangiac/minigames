import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const Size = 100;
const AnimatedScreen = () => {
  //   const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  //   const movePress = () => {
  //     Animated.timing(value, {
  //       toValue: {x: 150, y: 150},
  //       duration: 1000,
  //       useNativeDriver: false,
  //     }).start();
  //   };
  const progrcess = useSharedValue(1);
  const scale = useSharedValue(2);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progrcess.value,
      borderRadius: (progrcess.value * Size) / 2,
      transform: [{scale: scale.value}],
    };
  }, []);
  useEffect(() => {
    console.log('🚀 ~ file: Animated.js:34 ~ useEffect ~ progrcess', progrcess);
    progrcess.value = withTiming(0.5);
    scale.value = withSpring(1);
  }, []);

  return (
    <View>
      <Animated.View>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'blue',
          }}
        />
      </Animated.View>
      <TouchableOpacity onPress={() => {}}>
        <Text>Click ne</Text>
      </TouchableOpacity>
      <View style={styles.viewAnimatedStyle}>
        <Animated.View
          style={[
            {width: Size, height: Size, backgroundColor: 'red'},
            reanimatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default AnimatedScreen;
const styles = StyleSheet.create({
  viewAnimatedStyle: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
});
