import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createBrowserHistory } from 'history';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangep_no = this.onChangep_no.bind(this)
     this.state = {
            p_no: ""
        };
  }
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
     
      let todo = {
            p_no: this.state.p_no
        }
      axios.post("http://localhost:8001/todos/PolicyList", todo).then(res => {
            console.log(res.data);
            this.props.history.push({pathname:"PolicyList",
              state:{
                p_no:this.state.p_no
              }});
            });
       }
}

 onChangep_no = event => {
        this.setState({
            p_no:event.target.value,
        })
    }

handleSubmit(event) {
  const len=this.state.p_no.length
  if(len!=9)
    alert("Invalid Length");
  else 
    {
      if(this.state.p_no.match(/^[0-9]+$/) == null)
      alert("Invalid Format");
      else
      {
        event.preventDefault()

        let User = {
            m_no: this.state.m_no,
            p_no: this.state.p_no,
                   }
        let stringify = require('json-stringify-safe');
        axios.post("http://localhost:8001/todos/login", User)
        .then((res) => res.data)
         .then((res) => {
           if(res === "Successful")
            {
                 this.setRedirect();
                 this.renderRedirect();
            }
           else
            {
                alert("Invalid Credentials");
            }
  })     
    }
  }
  }
  // function readURL(input) {
  //           if (input.files && input.files[0]) {
  //               var reader = new FileReader();

  //               reader.onload = function (e) {
  //                   $('#blah')
  //                       .attr('src', e.target.result)
  //                       .width(150)
  //                       .height(200);
  //               };

  //               reader.readAsDataURL(input.files[0]);
  //           }
  //       }
onChangeHandler=event=>{
    let data = new FormData();
    // const a=event.target.name;
    const b=event.target.files[0];
    // console.log(a);
    console.log(b);
    // const c=this.props.location.state.p_no;
    // this.state.list.push(a);
    // data.append('nmm',a);
    //data.append('p_no',c); 
    data.append('file',b);
   
    axios.post("http://localhost:8001/todos/PolicyList/docs1", data)
   .then(res => { 
    console.log(res.statusText)
 })
  }
  render() {
     return (
      <div>
        <input type='file' id='a_button' accept=".jpeg,.jpg,.png" onChange={this.onChangeHandler} />
      </div>);   
  }
}

export default Login;

