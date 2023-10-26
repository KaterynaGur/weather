import { HIDE_ALERT, SHOW_ALERT } from "../types";

const handlers = {
  [SHOW_ALERT]: (state, { payload }) => ({ ...payload, visible: true }),
  [HIDE_ALERT]: (state) => ({ ...state, visible: false }),
  DEFAULT: (state) => state,
}


const AlertReducer = (state, action) => {
   const handle = handlers[action.type] || handlers.DEFAULT
   return handle(state, action)
  // switch(action.type) {
  //   case SHOW_ALERT: return (state, {payload}) => ({...payload, visible: true});
  //   case HIDE_ALERT: return (state) => ({...state, visible: false});
  //   default: return state => state
  // }
}

export default AlertReducer;