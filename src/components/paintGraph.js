import * as d3 from "d3";
export function paintGraph(gDetails,gText)
{
d3.select("svg").remove();
var svg = d3.select("#graphHere").append("svg")
            .attr("height","10cm")
            .attr("width","100%");

            svg.selectAll("rect")
            .data(gDetails)
            .enter().append("rect")
            .attr("height", function(d, i) {return ((d))})
            .attr("width","40")
            .attr("x", function(d, i) {return (i * 60) + 60})
            .attr("y", function(d, i) {return 150 - (d)});

            svg.selectAll("text")
            .data(gDetails)
            .enter().append("text")
            .text(function(d) {return d})
            .attr("class", "text")
            .attr("x", function(d, i) {return (i * 60) + 60})
            .attr("y", function(d, i) {return 145 - (d)}); 

            for(let index=0; index<gText.length; index++)
            {
              svg.append("text").append("tspan")
                .data(gText)
                .attr("x", (index*60)+70)
                .attr("y", 100 / 2)
                .attr("dy", "10.35em")
                .text(function(d) { return gText[index]  })
                .attr("class","labelText");
            }   
        }                