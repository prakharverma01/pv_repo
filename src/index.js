import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from "redux";
import {Provider} from "react-redux";
import onInit from './components/onInit';
import Myreducer from './components/reducers';
import contentDisplay from './components/createCrudContent';

var initial = JSON.parse(localStorage.getItem("localStorageData"));
const initial_state =initial ? initial : [];

function reducer  (state=initial_state ,action) {
    Myreducer(state=initial_state,action);
}

const store = createStore(reducer);

       store.subscribe( ()=>{
        contentDisplay();
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


/* start up function */
   onInit();