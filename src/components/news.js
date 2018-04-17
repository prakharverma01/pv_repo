        import React, {Component} from "react";
        import {httpFetch} from './fetch'
        import '../App.css';
                
        var oldResponse=[];
        var newResponse=[];
        var i;
        var first=0;
        var first_render=false;
        export class News extends React.Component {

                constructor(props) {
                        super(props);
                    
                        this.state = {
                                        news:[],                                       
                                    };
                        this.getNewsHere = this.getNewsHere.bind(this);            
                      }  
        getNewsHere()
        {        
                        var _this=this;                        
                        httpFetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=8a5a6c61c5db43e7b44d22b0a626d6c4`)
                        .then(res => {
                                        var arr=[];
                                        let i=1;
                                       // console.log('total news fetched : ',res.data.results.length);
                                       for(let i=0;i<res.data.results.length;i++)
                                       {                                                                                        
                                                 arr[i]=(res.data.results[i].abstract);                      
                                       }
                                       first++;   
                                       newResponse=arr;
                                       oldResponse=this.state.news?this.state.news:[];

                                       this.setState({
                                               news:arr,
                                       }
                                       );                                                                            
                        });        
                _this.renderNews();   
        }   

        renderNews()
        {
                var len=this.state.news.length;
                if(len !== 0)
                {
                        var html='';
                        var found;

                        
                        for(let i=0;i<len;i++)
                        {       found=false;
                                for(let j=0;j<oldResponse.length;j++)
                                {
                                        newResponse[i]===oldResponse[j];
                                        { 
                                        found=true;
                                        }
                                        if(found)
                                        {       //console.log('changing CSS',found);
                                                break; 
                                        }
                                }   
                                if(found)   
                                {       //console.log('old Found');
                                        html += "<div id="+i+" class="+'cls'+">"+this.state.news[i]+"</div><br></br>"
                                }                   
                                else if(!found)
                                {       //console.log('New Found');
                                        html += "<div id="+i+" class="+'cls2'+">"+this.state.news[i]+"</div><br></br>"
                                }                              
                        }
                        document.getElementById('NewsGoesHere').innerHTML=html; 

                }                        
         
        }
        calls()
        {           console.log('called');
                    var _this=this;
                    if(!first_render)
                    {   console.log('Rendering first time')
                        this.getNewsHere();
                        first_render=true;
                    }
                        clearInterval(this.newsInterval);
                        this.newsInterval = setInterval(function(){ _this.getNewsHere() }, 7000);
        }
        changePage()
        {

        }
        render(){   
                        return (
                                 
                                <div>   
                                  <div id="NewsGoesHere">
                                  </div>                                   
                                  {this.calls()}
                                </div>
                                );
                }       
        }
                
        