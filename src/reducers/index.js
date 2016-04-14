import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import SystemFilterReducer from './reducer_filter_system'
import JumpFilterReducer from './reducer_filter_jumps'
import FilterReducer from './reducer_filter'
import FilterID from './reducer_filterid'
import OptionReducer from './reducer_options'

const rootReducer = combineReducers({
  system_filter: SystemFilterReducer,
  jump_filter: JumpFilterReducer,
  filters: FilterReducer,
  filterID: FilterID,
  killmail_list: KillmailReducer,
  options: OptionReducer
});

export default rootReducer;
