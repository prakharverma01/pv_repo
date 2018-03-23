import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import twitter-stream-api from 'twitter-stream-api';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from "redux";
import {Provider} from "react-redux";

var oldResponse=[];
var newResponse=[];
var i;
var first=0;
var id=1;
var initial = JSON.parse(localStorage.getItem("localStorageData"));
const initial_state =initial ? initial : [];
var localStorageData;

const reducer = (state = initial_state,action) =>{

    switch(action.type){
        case "ADD": if(action.nme === '' || action.msg === '')
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

        case "DEL": if(store.getState().length===0)
                    {
                        alert('No data exists to delete')
                        return state;
                    }
        
                    if (action.id === '' || action.id <0 || action.id > (store.getState().length)-1)
                    {
                        alert('Please enter a valid ID');
                        return state;
                    }

                   state= [...state.slice(0,action.id).concat(...state.slice(parseInt(action.id)+1))];
                   localStorage.setItem("localStorageData",JSON.stringify(state));
                    return state;
                    break;            
                    
        case "UPD": var chk =JSON.parse(localStorage.getItem("localStorageData")).length;
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

    const store = createStore(reducer);

    store.subscribe( ()=>{
    let data = JSON.parse(localStorage.getItem("localStorageData"));
    let html = "";
    for(let i=0;i<data.length;i++)
        {
            html+="<div class=name-crud>"+"#id:("+i+")."+data[i].nme+"</div>";            
            for(let j=0;j<data[i].msg.length;j++){
            html+="<span class=msg-crud>"+data[i].msg[j]+"</span><br></br>";
        }
    }
            document.getElementById("n").innerHTML=html;
    });



    /*calling the render function here with REDUX-provider */
    /*--------------------------------------------------*/
    ReactDOM.render(    <Provider store={store}>
                        <App />
                        </Provider>,
                        document.getElementById('root')
                );
    registerServiceWorker();
    /*--------------------------------------------------*/


/* news wire function */
    function getNews(){
    axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=8a5a6c61c5db43e7b44d22b0a626d6c4`) 
    .then(res => {

                    for(i=0;i<7 && first>0;i++)
                    {
                        oldResponse[i]=newResponse[i];
                        document.getElementById(i).className = 'cls'; 
                    }                    
                   for(i=0;i<7;i++)
                   {                                             
                       document.getElementById(i).innerHTML=res.data.results[i].abstract;
                       newResponse[i]=res.data.results[i].abstract;   
                       var val = newResponse[i];
                        if(first>0)
                        checker(val,i);                             
                   }
                   first++;                
    });

}
    getNews();

    setInterval(function(){     
            console.log('getting news')   
            getNews();        
    },10000);

    /* checer function for changing CSS of new response which was totally new */
    function checker(newResponse, idno)
    {   var i=0;
        for(i=0;i<7;i++)
        {
                if( oldResponse[i] === newResponse)
                return;
        }
        document.getElementById(idno).className = 'cls2';
        return;
    }

    function on_init(){
        let data = JSON.parse(localStorage.getItem("localStorageData"));
        let html = "";
        for(let i=0;i<data.length;i++){
                html+="<div class=name-crud>"+"#id:("+i+")."+data[i].nme+"</div>";
                
                for(let j=0;j<data[i].msg.length;j++){
                html+="<span class=msg-crud>"+data[i].msg[j]+"</span><br></br>";
            }
        }
        document.getElementById("n").innerHTML=html;
    }
    on_init();