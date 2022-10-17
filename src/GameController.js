import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import {
  generateRandom,
  getEmptyBoard,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  checkWin,
  isOver,
} from './GameBoard';

import Cell from './Cell';

var width = Dimensions.get('window').width;

const GameController = ({navigation}) => {
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));

  const checkEndGame = useCallback(() => {
    if (checkWin(board)) {
      Alert.alert('You win!');
    } else if (isOver(board)) {
      updateBoard(generateRandom(getEmptyBoard()));
      Alert.alert('Game over!');
      console.log('===>', board);
    }
  }, [board]);

  const left = () => {
    const newBoard = moveLeft(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const right = () => {
    const newBoard = moveRight(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const up = () => {
    const newBoard = moveUp(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const down = () => {
    const newBoard = moveDown(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  return (
    <GestureRecognizer
      style={styles.screenStyle}
      onSwipeLeft={left}
      onSwipeRight={right}
      onSwipeUp={up}
      onSwipeDown={down}>
      <Text style={styles.headerStyle}>HELLO 2048</Text>
      <View style={styles.viewButtonRow}>
        <TouchableOpacity
          style={[
            styles.newGameStyle,
            {backgroundColor: '#44CC73', marginLeft: 10},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.textRenew}>GO BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newGameStyle}
          onPress={() => updateBoard(generateRandom(getEmptyBoard()))}>
          <Text style={styles.textRenew}>NEW GAME</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boardStyle}>
        {board.map((row, rowIndex) => (
          <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
            {row.map((value, cellIndex) => (
              <Cell key={`cell-${cellIndex}`} value={value} />
            ))}
          </View>
        ))}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    padding: 40,
    fontSize: 50,
    textAlign: 'center',
    color: 'olive',
    fontWeight: 'bold',
  },
  boardStyle: {
    width: width,
    padding: 5,
    backgroundColor: 'olive',
  },
  rowStyle: {
    flexDirection: 'row',
    height: width / 4,
  },
  newGameStyle: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  textRenew: {
    color: 'white',
  },
  viewButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default GameController;
