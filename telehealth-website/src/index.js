import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'



class HelpMe extends Component{
  constructor(props){
    super(props);
    this.state={
      users:''
    };
    }

    handleSubmit = event => {
      event.preventDefault();
console.log(event.target.value)
      const c = {
        username:"Sergiu",
        password:"Qwerty"
      };
  
      axios.post(`http://localhost:49836/User/SignUpUser`,c )
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({users:res.data});
        })
  }
  

  render(){
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
          Person Name:{this.state.users.message}
        <button type="submit">Add</button>
      </form>
    </div>
    );
  }
}
const Doctors = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doctor) => (
        <div>{doctor.age}
        {doctor.nationality}
        {doctor.lastName}
        </div>
      ))}
    </div>
  )
};

  ReactDOM.render(
    <HelpMe/>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
