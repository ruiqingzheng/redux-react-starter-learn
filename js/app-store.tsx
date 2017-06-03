import {AppState} from './app-state';
import {widgetsReducer} from './reducers/widgets-reducer'
import {createStore, Store} from 'redux'

export const appStore: Store<AppState> = createStore<AppState>(widgetsReducer);
