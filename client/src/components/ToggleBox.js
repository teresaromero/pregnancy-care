import React, { Component } from "react";

import styled from "@emotion/styled";

const Box = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export default class ToggleBox extends Component {
  constructor(){
    super()
    this.state={
      signup: true,
      login: false
    }
  }
  render() {
    return (
      <div className="section">
        <div className="container">
          <Box className="box">
            <div className="tabs is-centered">
              <ul>
                <li className="is-active">
                  <a onClick={()=>this.setState({signup:true,login:false})}>Signup</a>
                </li>
                <li>
                  <a onClick={()=>this.setState({signup:false,login:true})}>Login</a>
                </li>
              </ul>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}
