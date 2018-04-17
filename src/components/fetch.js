import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export  function httpFetch(url){

   return axios.get(url);
}