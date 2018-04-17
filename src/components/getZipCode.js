import {httpFetch} from './fetch';
import { paintGraph } from './paintGraph';

export function getZipCode(zipCode){
    httpFetch(`https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json?accessType=DOWNLOAD`)
    .then(res=>{
     let gDetails=[];
     let gText=[];
     let found=0;
     let arr=[11,13,15,19,21,23,25,27,29,31,37,39,41,47,49];
     
   
     for (let i=0;i<arr.length;i++)
     gText.push(res.data.meta.view.columns[arr[i]].name.substr(8).split(" ").join("\n"));
   
     for (let i=0;i<res.data.data.length;i++)
     {
       if (res.data.data[i][8] == zipCode)
       {
           found=i;
           break;
       }
     }
   
     for(let i=0;i<arr.length;i++)
     {  
       gDetails.push((Math.round(parseFloat(res.data.data[found][arr[i]]) * 100)));
     }
   
        paintGraph(gDetails,gText);
    });
   }
   