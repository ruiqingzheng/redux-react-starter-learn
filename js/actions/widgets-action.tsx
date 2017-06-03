import {actionTypes} from '../action-type';
import {Action} from 'redux';
import {appStore} from '../app-store'
//定义widgetsAction

export interface WidgetsAction extends Action {
    widgets: any[]
}


// 定义action创建方法

const createRefreshWidgetsRequestAction:  () => WidgetsAction = () => ({
    type: actionTypes.REFRESH_WIDGETS_REQUEST,
    widgets: []
})

const createRefreshWidgetsDoneAction : (widgets) => WidgetsAction = (widgets) => ({
    type: actionTypes.REFRESH_WIDGETS_DONE,
    widgets
})

export const refreshWidgets = () => {
    //appStore emit action
    appStore.dispatch(createRefreshWidgetsRequestAction());
    //fetch调用
    fetch("htpp://localhost:3010/widgets")
        .then(res => {res.json()})
        .then(widgets => {
            appStore.dispatch(createRefreshWidgetsDoneAction(widgets));
        })
}