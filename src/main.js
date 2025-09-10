
import * as THREE from 'three';
import { Graph } from "./graph";
import { Node } from "./node";



const totalNodes = new Array(50).fill('x');
const graph = new Graph(totalNodes);

console.log(totalNodes);
totalNodes.forEach(element => {
    
    graph.addNode(new Node());
});

console.log(graph.nodes);

// const node1 = new Node();
// const node3 = new Node();
// const node4 = new Node();

// graph.addNode(node1);
// graph.addNode(node2);
// graph.addNode(node3);
// graph.addNode(node4);
// graph.addEdge(node1, node2);
// graph.addEdge(node1, node4);


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();

camera.position.set(0, 0, 300);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


function createNodeMesh(nodes)
{
    const nodeMeshes = []

    nodes.forEach(node => {
        const geometry = new THREE.SphereGeometry(0.5, 32, 32)
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
        const nodeMesh = new THREE.Mesh( geometry, material );

        nodeMesh.position.set(
            node.getPosition().x,
            node.getPosition().y,
            node.getPosition().z
        )

        nodeMeshes.push(nodeMesh);
    });

    return nodeMeshes;
}

const nodeMeshes = createNodeMesh(graph.nodes)


for (let nodeMesh of nodeMeshes) {
  scene.add(nodeMesh);
}

function animate(){
    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate);





