import { Action } from "redux";
import { connect } from "react-redux";
import { TopComponent } from "./top";
import { TopModule, StoreModule } from "../module/module";

export function topReducer(state = new TopModule(), action: Action) {
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

const mapStateToProps = (state: StoreModule) => {
  let action = {
    type: ""
  };

  return {
    top: state.top,
  };
};

export default connect(mapStateToProps)(TopComponent);
