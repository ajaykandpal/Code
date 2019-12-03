import axios from 'axios';
import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import { documents } from './DocsList';

var ps = require('python-shell');
var AWS = require("aws-sdk");
require('../s3/aws_config.js');

class PolicyList extends Component {
   constructor(props) {
    super(props);
      this.state = {
        list:[],
        done:[],
        p_no:this.props.location.state.p_no
      }
       console.log(localStorage.getItem(this.props.location.state.p_no));
       let data={
        loc: localStorage.getItem(this.props.location.state.p_no),
        l: documents.docs
      }
      console.log(data.loc);
       axios.post("http://localhost:8001/todos/PolicyList/check", data)
       .then(res => { 
        this.setState({done: res.data});
       console.log(this.state.done)
        })
     
    }

onChangeHandler=event=>{
    let data = new FormData();
    const a=event.target.name;
    const b=event.target.files[0];
    const c=this.props.location.state.p_no;
    this.state.list.push(a);
    data.append('nmm',a);
    data.append('p_no',c); 
    data.append('file',b);
   
    axios.post("http://localhost:8001/todos/PolicyList/docs1", data)
   .then(res => { 
    console.log(res.statusText)
 })
  }
  
onClickHandler=event=>{
    let data = {
            p_no: this.state.p_no,
            lists:this.state.list
       }
     var a=localStorage.getItem(this.props.location.state.p_no)
     localStorage.setItem(data.p_no,a+','+data.lists);
    axios.post("http://localhost:8001/todos/PolicyList/docs2", data)
    .then(res => { 
    console.log(res.statusText);
 })
  }

    render() {
      return (
         <div className="details"><table className="table dis">
            <thead class="heading">
              <tr>
               <th scope="col" >Policy</th>
              </tr>
            </thead>
            <tbody>
             <tr>
               <td>{ this.props.location.state.p_no}</td>
             </tr>
              <div class="container">
             <div class="row">
               <div class="col-md-6">
             <DropdownButton id="dropdown-item-button" title="Documents">
             <ul>
                {documents.docs.map((value,index) => {
                     const nm={value};
                     return <Dropdown.Item as="button"><b><p>{value}{"  "}<input type="file" name={value}  accept=".jpeg,.jpg,.png" onChange={this.onChangeHandler} /><span id="checklist">{this.state.done[index]}</span></p></b></Dropdown.Item>
                })}
             </ul>
             </DropdownButton>
             </div>

              <div class="col-md-6">
            
               <button onClick={this.onClickHandler}>Submit</button></div></div></div>
           
            </tbody>
          </table></div>
        );
    }
}

export default PolicyList;