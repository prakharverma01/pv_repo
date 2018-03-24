        import React from "react";
        import * as d3 from "d3";
        import axios from 'axios';
        var dList=[];
        export class Graph extends React.Component {
        getDropDownList(){

                axios.get(`https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json?accessType=DOWNLOAD`) 
                .then(res =>{
                        var html = "";
                        for (let i =0; i<res.data.data.length;i++){
                        html+="<option value='"+res.data.data[i][8]+"'>"+res.data.data[i][8]+"</option>"
                        }
                        document.getElementById('zipCode').innerHTML = html;
                });           
        }                    
        render(){   
                return ( 
                        <div>
                                {this.getDropDownList()}       
                        </div>                   
                       );
                }       
        }
                
        