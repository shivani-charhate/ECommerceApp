import React from "react";

export default class PropCom extends React.Component {
  render() {
    return (
      <div>
        <h1>I am Props Comp</h1>
        <h1>Data receive {this.props.data1}</h1>
        <h6>Data Fatch{this.props.data2}</h6>
      </div>
    );
  }
}
