import * as d3 from "https://cdn.skypack.dev/d3-force-3d";

export function innitSimulation(nodes,links = []){
    
    d3.forceSimulation(nodes,3)
        .force("charge", d3.forceManyBody().strength(-100))
        .force("link", d3.forceLink(links).id(d => d.id).distance(10).strength(0))
        .force('cluster',setNodeCluster(0.02))
        .force("center", d3.forceCenter(0, 0, 0))

}


function setNodeCluster(strength){

    let nodes;

    function force(alpha){
        nodes.forEach(node => {
            if(node.isCountry == true){return}
            node.vx += (nodes.find(obj => obj.id == node.country).x - node.x) * strength * alpha;
            node.vy += (nodes.find(obj => obj.id == node.country).y - node.y) * strength * alpha;
            node.vz += (nodes.find(obj => obj.id == node.country).z - node.y) * strength * alpha;
        });
    }

    force.initialize = function(_nodes){
        nodes = _nodes
    }

    return force
}