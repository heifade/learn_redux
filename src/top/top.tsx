import * as React from "react";
let styles = require("./top.less");

export interface Props {
  top: {
    waitShow: boolean;
  };
}

export class TopComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {this.props.top && this.props.top.waitShow ? (
          <div>
            <div className={styles.back} />
            <div className={styles.wait}></div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
