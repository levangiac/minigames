import {combineReducers} from 'redux';
import GamePacManReducer from './GamePacManReducer';
import GhostReducer from './GhostReducer';

const rootReduces = combineReducers({
  game: GamePacManReducer,
  ghosts: GhostReducer,
});
export default rootReduces;
