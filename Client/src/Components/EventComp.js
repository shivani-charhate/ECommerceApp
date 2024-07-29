import React from "react";
import PropCom from "./PropCom";

export default class EventComp extends React.Component {
  constructor() {
    super();
    this.state = {
      key1: "Ddata from event comp",
      key2: "data transfer through props",
      sub: "Backend Devloper",
      test: "do correction",
    };
  }

  handleEvent() {
    console.log("Event without Para");
  }
  handleEvent2(arg1, arg2) {
    if (arg1 === "shivani" && arg2 === "shivani") {
      alert("Admin Login");
    } else {
      alert("Login Fail");
    }
  }
  changeMe = () => {
    this.setState({
      sub: "MEAN Stack",
    });
  };
  correct = () => {
    this.setState({
      test: "Right",
    });
  };

  render() {
    return (
      <div>
        {/* <PropCom data1={this.state.key1} data2={this.state.key2} />
        <hr />

        <h1>Function with out para </h1>
        <button onClick={this.handleEvent}>Click Me</button>
        <br />
        <hr />
        <h1>Fun With Para</h1>
        <button
          onClick={() => {
            this.handleEvent2("shivani", "shivani");
          }}
        >
          Admin Login
        </button>
        <br />
        <hr />
        <h1>{this.state.sub}</h1>
        <button onClick={this.changeMe}>Click Me</button> */}
        <h1>{this.state.test}</h1>
        <button onClick={this.correct}>Change Me</button>
      </div>
    );
  }
  // simple function
}
