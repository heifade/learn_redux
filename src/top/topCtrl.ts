import { TopData, StoreData } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import { Top } from "./top";

export function topReducer(state: TopData, action: Action) {
  switch (action.type) {
    case "wait_show":
      return {
        ...state,
        waitShow: true
      };
    case "wait_hide":
      return {
        ...state,
        waitShow: false
      };
    default:
      return state;
  }
}

const stateToProps = (state: StoreData) => {
  let action = {
    type: ""
  };

  return {
    top: topReducer(state.top, action)
  };
};

export default connect(stateToProps)(Top);
