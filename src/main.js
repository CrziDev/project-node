import * as THREE from 'three'
import {users,countries} from './mockData.js'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createNodeMeshes,updateNodes} from './objects/nodes.js'
import {createLinkMeshes,updateLinks} from './objects/links.js'
import {innitSimulation} from './simulation.js'
import * as utils from './utils/helpers.js'


// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    10000,
);
camera.position.z = 1000;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.zoomSpeed = 2.0;
controls.enableZoom = true;

// Main
const nodes = utils.createNodes(users,countries);
const links = utils.identifyLinks(users,nodes)

const nodeMeshes = createNodeMeshes(nodes);
const lineMeshes = createLinkMeshes(links);

[...nodeMeshes,...lineMeshes].forEach(object => scene.add(object))

innitSimulation(nodes,links,countries)

function animate(){
    requestAnimationFrame(animate); 

    updateNodes(nodeMeshes)
    
    updateLinks(lineMeshes)

    renderer.render(scene, camera);
}
animate();
