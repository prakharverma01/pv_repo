import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";

let id=0;

const MyReducer =  (state  ,action) => {
    
    switch(action.type){
        case "ADD": state = JSON.parse(localStorage.getItem("localStorageData"));
                    if(action.nme === '' || action.msg === '')
                    {
                        alert('both value Must be Entered : Name & Message');
                        return state;
                    }
                    else
                    {     
                                   state.push({
                                       id  : id++,
                                       nme : action.nme,
                                       msg : [action.msg]
                                   });        
                    }   
                    localStorage.setItem("localStorageData",JSON.stringify(state));     
                    return state; 
                    break;
                    
        case "DEL": var chk =JSON.parse(localStorage.getItem("localStorageData")).length;
                    state = JSON.parse(localStorage.getItem("localStorageData"));
                    if(chk===0)
                    {
                        alert('No data exists to delete')
                        return state;
                    }
        
                    if (action.id === '' || action.id <0 || action.id > chk-1)
                    {
                        alert('Please enter a valid ID');
                        return state;
                    }
                   console.log(parseInt(action.id));  
                   state= [...state.slice(0,action.id).concat(...state.slice(parseInt(action.id)+1))];
                   console.log('state=',state);
                   localStorage.setItem("localStorageData",JSON.stringify(state));
                   console.log('local=',JSON.parse(localStorage.getItem("localStorageData")));
                    return state;
                    break;            
                    
        case "UPD": var chk =JSON.parse(localStorage.getItem("localStorageData")).length;
                    state = JSON.parse(localStorage.getItem("localStorageData"));
                    if ( chk === 0 || (chk-1) < action.id )
                    {
                        alert("No reminders Present to update for Given ID")
                        return state;
                    }
                    localStorage.setItem("localStorageData",JSON.stringify(state));
                     state=[
                                    ...state.slice(0,action.id),
                                   {...state[action.id], msg:[action.msg]},
                                    ...state.slice(action.id+1)
                    ];
                    localStorage.setItem("localStorageData",JSON.stringify(state));
                    return state;
                    break;

        default   : 
                    return state;
                    break;
    }    
}

export default MyReducer;