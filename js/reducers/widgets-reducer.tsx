import {Reducer} from 'redux';
import {AppState} from '../app-state';
import {WidgetsAction} from '../actions/widgets-action';
import {actionTypes} from '../action-type'


export const widgetsReducer: Reducer<AppState> = (state: AppState = {widgets: []}, action: WidgetsAction) => {
    switch (action.type) {
        case actionTypes.REFRESH_WIDGETS_REQUEST :
            return Object.assign({}, state, {widgets: []});
        case actionTypes.REFRESH_WIDGETS_DONE:
            return Object.assign({}, state, {widgets: action.widgets});
        default:
            state;
    }
}
