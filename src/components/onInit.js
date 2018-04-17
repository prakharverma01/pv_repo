

export default function on_init() {
    /*
    getNews();
    setInterval(function(){     
            console.log('getting news')   
            getNews();        
    },3000);
    */
let initial= JSON.parse(localStorage.getItem("localStorageData"));
let data = initial ? initial : [];
let html = "";
for(let i=0;i<data.length;i++){
        html+="<div class=name-crud>"+"#id:("+i+")."+data[i].nme+"</div>";
        
        for(let j=0;j<data[i].msg.length;j++){
        html+="<span class=msg-crud>"+data[i].msg[j]+"</span><br></br>";
    }
}
document.getElementById("n").innerHTML=html;
}