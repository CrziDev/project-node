
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


// Sample Generating Line

    // const points = [];

    // points.push( new THREE.Vector3( - 10, 0, 0 ) );
    // points.push( new THREE.Vector3( 0, 10, 0 ) );
    // points.push( new THREE.Vector3( 10, 0, 0 ) );

    // const geometry = new THREE.BufferGeometry().setFromPoints( points );
    // const line = new THREE.Line( geometry, material );

    // scene.add( line );
    // renderer.render( scene, camera );


// Creating Mesh Object Cube Sample

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // const cube2 = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // scene.add( cube2);

    // cube2.position.y = 2;
    // camera.position.z = 5;

    // function animate() {
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //     cube2.rotation.y += 0.01;
    //     cube2.rotation.y += 0.01;

    //     renderer.render( scene, camera );
    // }


    // renderer.setAnimationLoop( animate );



// TODO: 
// Three Js - Camera and Interaction
// D3 - Force redirected graph algo
        // Weight connection based on distance (country or city)
        // Clusters Node area based on user location
// Media pipe - Hand Motion tracking and movement - Navigate space and clicking
// Socket - Send Pulse Signal with other users
// Other Feat
   // auto gen Node per user
   // Gen unique session token - store on storage
   // add node tag and simple textarea for stories Each node
   // Slow node decay

