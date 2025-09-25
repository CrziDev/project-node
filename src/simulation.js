import * as d3 from "https://cdn.skypack.dev/d3-force-3d";

export function innitSimulation(nodes,links = []){
    
    d3.forceSimulation(nodes,3)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("center", d3.forceCenter(0, 0, 0));

}