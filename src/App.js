import React, { Component } from 'react';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {News} from './components/news';
import {Graph} from './components/graph';
import {httpFetch} from './components/fetch';
import {getZipCode} from './components/getZipCode';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {isToggleOn: true,
                  isToggleOn1: true,
                  isToggleOn2: true,
                  givenName:'',
                  givenMsg:'',
                  givenID:'',
                };

    this.mini = this.mini.bind(this);
    this.mini1 = this.mini1.bind(this);
    this.mini2 = this.mini2.bind(this);
  }

  changeID(input){
    this.setState({
      givenID:input
    });
  }

  changeName(input){
    this.setState({
      givenName:input
    });
  }

  changeMsg(input){
    this.setState({
      givenMsg:input
    });
  }

  cls(param){
    if(param === "name")
        this.setState({
          givenName:'',
          givenMsg:'',
        });
        else
        this.setState({
          givenID:''
        });
  }

  /* minimizing Functions */
  mini() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      if(this.state.isToggleOn===true)
      document.getElementById('leftDiv').style.width=0;
      else
      document.getElementById('leftDiv').style.width="33.33%";
  }
  mini1() {
      this.setState(prevState => ({
        isToggleOn1: !prevState.isToggleOn1
      }));
      if(this.state.isToggleOn1===true)
      document.getElementById('midDiv').style.width=0;
      else
      document.getElementById('midDiv').style.width="33.33%";
  }
  mini2() {
      this.setState(prevState => ({
        isToggleOn2: !prevState.isToggleOn2
      }));
      if(this.state.isToggleOn2===true)
      document.getElementById('rightDiv').style.width=0;
      else
      document.getElementById('rightDiv').style.width="33.33%";
  }
   /* end of minimizing Functions */

    getNewMsg(){

    var Msg = prompt("Enter The New Reminder", "New Reminder");
    if(Msg==null || Msg ==="")
    {
      alert("Enter A valid msg!!!")
    }
    else
    {
      {this.props.updMsg(this.state.givenID,Msg)}
    }

}

  render() {
        return (
    <div>        
            <div className="left" id="leftDiv">
                <div><h4>New York Times : NewsWire</h4></div>
                <News/>
            </div>

            <div className="middle" id="midDiv">
                  <div>
                    <h4>Add Reminders for People</h4>
                  </div>        
                  <span id="n"></span> <br></br>
            </div>  

            <div className="right" id="rightDiv">  
                <div className="fake-wid" id="graphHere"></div>       
            </div>        
            <Graph/>
              <table className="show">
                <thead>
                  <tr>
                    <th> Select a Zip-Code </th>
                    <th><select id="zipCode" onChange={(e)=>{getZipCode(e.target.value);}}></select></th>
                  </tr>
                </thead>
              </table>

            <table>
              <thead>
                <tr>
                  <th> Minimizing options </th>
                </tr>
                <tr>
                  <th><input type="button" onClick={this.mini} value="News"></input></th>
                </tr>
                <tr>
                  <th><input type="button" onClick={this.mini1} value="CRUD"></input></th>
                </tr>
                <tr>
                  <th><input type="button" onClick={this.mini2} value="Graph"></input></th>
                </tr>
              </thead>
            </table>
            <br></br>

          <div className="crud">
                <input type="text"
                      value={this.state.givenName}
                      onChange={ (e)=> this.changeName(e.target.value) }
                      placeholder="Enter the Name here"
                />

                <br></br>

                <input type="text"
                      value={this.state.givenMsg}
                      onChange={ (e)=> this.changeMsg(e.target.value) }
                      placeholder="Enter the Message here"
                />

                <br></br>  

                <input type="button"
                      value="Add"
                      onClick={()=>{this.props.setName(this.state.givenName,this.state.givenMsg);this.cls("name");}}
                />

                <br></br> 
                <br></br> 

                <input type="text"
                      value={this.state.givenID}
                      onChange={ (e)=>this.changeID(e.target.value) }
                      placeholder="ID to be updated/Deleted"                
                />

                <br></br> 

                <input type="button"
                value="Delete"
                onClick={()=>{this.props.delName(this.state.givenID);this.cls("ID");}}
                />
                <input type="button"
                value="Update"
                onClick={()=>{this.cls("ID");this.getNewMsg();}}
                />   
            </div>
    </div>
        );
      }
    }
    
        const mapStateToProps = (state) =>{
            return state;
        };
        const mapDispatchToProps = (dispatch) =>{
          return{
            setName: (name,msg) => {
              dispatch({
                type:"ADD",
                nme:name,
                msg:msg
              });
            },
            delName: (id) => {
              dispatch({
                type:"DEL",
                id:id
              });
            },
            updMsg: (id,msg) => {
              dispatch({
                type:"UPD",
                id:id,
                msg:msg
              });
            }
          }
      };

export default  connect(mapStateToProps,mapDispatchToProps)(App);