import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import _ from 'lodash';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Col, Row} from 'react-native-easy-grid';
import {
  runGame,
  changeDirection,
  pauseGame,
  continueGame,
  initGame,
  eateanFood,
  wonGame,
  restart,
} from '../store/actions/GamesPacManAction';
import {DEFAULT_MATRIX} from '../constants';
import {
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_LEFT,
} from '../store/actions/types';
import Cell from './Cell';
import PageLoading from './PageLoading';
import Button from './Button';

const HomePacMan = ({navigation}) => {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const [won, setWon] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dataGhost = useSelector(state => state?.ghosts);
  const dataPackMan = useSelector(state => state?.game);
  const dispatch = useDispatch();
  //   console.log(
  //     '🚀 ~ file: HomePacMan.js ~ line 32 ~ HomePacMan ~ dataGame',
  //     dataGhost,
  //   );
  //   const packManRef = useRef(false);

  useEffect(() => {
    dispatch(initGame());
    setIsReady(true);
    dispatch(runGame());
  }, []);

  const renderContent = (rowNum, colNum) => {
    const {packmanPosition, foodGrid, currentDirection} = dataPackMan;
    let isPacman,
      ghost,
      direction,
      isFood = false;
    if (foodGrid[rowNum][colNum] === 0) {
      isFood = true;
    }
    ghost = _.find(dataGhost, {
      position: {
        x: colNum,
        y: rowNum,
      },
    });
    if (packmanPosition.y === rowNum && packmanPosition.x === colNum) {
      direction = currentDirection;
      isPacman = true;
    }
    return (
      <Cell
        isPacman={isPacman}
        ghost={ghost}
        direction={direction}
        isFood={isFood}
      />
    );
  };

  const renderRows = (rowIndex, rowdata) => {
    return rowdata.map((a, colIndex) => {
      return (
        <Col
          key={colIndex}
          style={[
            styles.cellStyle,
            {
              backgroundColor: a === 1 ? '#303F9F' : 'black',
            },
          ]}>
          {renderContent(rowIndex, colIndex)}
        </Col>
      );
    });
  };

  const onPressDirection = moveTo => {
    dispatch(changeDirection(moveTo));
  };

  const onPauseGame = () => {
    dispatch(pauseGame());
  };
  const onContinueGame = () => {
    dispatch(continueGame());
  };
  const onRestartGame = () => {
    dispatch(pauseGame());
    dispatch(restart());
  };
  const renderButtonControllers = () => {
    return (
      <View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => onPressDirection(MOVE_UP)}
              color="white"
              title="UP"
              backgroundColor="red"
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.btnContainer}>
              <Button
                onPress={() => onPressDirection(MOVE_LEFT)}
                color="white"
                title="LEFT"
              />
            </View>
            <View style={styles.btnContainer}>
              <Button
                onPress={() => onPressDirection(MOVE_RIGHT)}
                color="white"
                title="RIGHT"
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <Button
              onPress={() => onPressDirection(MOVE_DOWN)}
              color="white"
              title="DOWN"
            />
          </View>
        </View>
      </View>
    );
  };

  const renderMaze = () => {
    return matrix.map((rowData, rowIndex) => {
      return <Row key={rowIndex}>{renderRows(rowIndex, rowData)}</Row>;
    });
  };

  if (isReady) {
    setTimeout(() => {
      setIsReady(false);
    }, 1200);
    return <PageLoading />;
  }
  return (
    <ScrollView style={{backgroundColor: 'black', flex: 1}}>
      <View style={{height: 30}} />
      <Text style={styles.headingStyle}>PACMAN AI</Text>
      <Text style={styles.subHeadingStyle}>Pacman Using AStar Algorithm </Text>
      <View>
        <Text>Packman {dataPackMan?.marks}</Text>
      </View>
      <View style={styles.mazeContainerStyle}>{renderMaze()}</View>
      <View style={{flexDirection: 'row', margin: 20}}>
        {dataPackMan?.pause ? (
          <View style={[styles.btnContainer, {backgroundColor: '#757575'}]}>
            <Button
              onPress={() => onContinueGame()}
              title="Continue "
              color="white"
            />
          </View>
        ) : (
          <View style={[styles.btnContainer, {backgroundColor: '#757575'}]}>
            <Button
              onPress={() => onPauseGame()}
              title="Pause "
              color="white"
            />
          </View>
        )}
        <Text style={styles.whiteText}>{dataPackMan?.marks}</Text>
        <View style={[styles.btnContainer, {backgroundColor: '#757575'}]}>
          <Button
            onPress={() => onRestartGame()}
            title="RESTART"
            color="white"
          />
        </View>
      </View>
      {renderButtonControllers()}
      <Text style={styles.footerStyle} />
    </ScrollView>
  );
};

const styles = {
  cellStyle: {
    flex: 1,
    height: 25,
    borderColor: '#3F51B5',
    borderWidth: 0.5,
  },
  headingStyle: {
    fontSize: 20,
    color: 'yellow',
    fontWeight: '600',
    textAlign: 'center',
  },
  subHeadingStyle: {
    color: 'white',
    textAlign: 'center',
  },
  mazeContainerStyle: {
    backgroundColor: '#3F51B5',
    padding: 4,
  },
  buttonStyle: {
    backgroundColor: '#0d4674',
    margin: 4,
    padding: 14,
  },
  footerStyle: {
    paddingTop: 34,
    textAlign: 'center',
    fontSize: 11,
    color: 'lightgray',
  },
  btnContainer: {
    margin: 2,
    backgroundColor: '#607D8B',
    flex: 1,
  },
  whiteText: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
};

const mapStateToProps = dataPackMan => {
  const {packmanPosition, pause, currentDirection, foodGrid, marks} =
    dataPackMan;
  const {ghosts} = dataPackMan;
  return {
    packmanPosition,
    pause,
    currentDirection,
    foodGrid,
    marks,
    ghosts,
  };
};

export default connect(mapStateToProps, {
  initGame,
  runGame,
  changeDirection,
  pauseGame,
  continueGame,
  eateanFood,
  restart,
  wonGame,
})(HomePacMan);
