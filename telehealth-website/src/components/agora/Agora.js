import React, { Component } from "react";
import ChannelForm from "./ChannelForm"
import Call from "./Call";

class Agora extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: ""
    };
  }

  selectChannel = channel => {
    this.setState({ channel });
  };

  render() {
    return (
      <div>
        <ChannelForm selectChannel={this.selectChannel} />
        <Call channel={this.state.channel} />
      </div>
    );
  }
}

export default Agora;