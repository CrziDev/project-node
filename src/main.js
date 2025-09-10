
import * as THREE from 'three';
import { Graph } from "./graph";
import { Node } from "./node";


// Test creating Node Object

const totalNodes = 5;
const graph = new Graph(totalNodes);
const node1 = new Node();
const node2 = new Node();
const node3 = new Node();
const node4 = new Node();

graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addEdge(node1, node2);
graph.addEdge(node1, node4);

console.log(graph.computeNodeNeighbors(node1));

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();


camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


// TODO: 
// Three Js - Camera and Interaction
// D3 - Force redirected graph algo
// Media pipe - Hand Motion tracking and movement - Navigate space
// Socket - Send Pulse Signal 
