import * as THREE from 'three'
import {users,countries} from './mockData.js'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {nodeInnit,createNodeMeshes,updateNodes,createNodes} from './objects/nodes.js'
import {createLinkMeshes,updateLinks,identifyLinks} from './objects/links.js'
import {innitSimulation} from './simulation.js'
import {interactInnit,showDescription} from './interactions.js';

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
// document.body.appendChild(renderer.domElement);
document.getElementById('container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.zoomSpeed = 6.0;
controls.enableZoom = true;

// Object Creation

nodeInnit(camera)

const nodes = createNodes(users,countries);
const links = identifyLinks(nodes)
const nodeMeshes = createNodeMeshes(nodes);
const lineMeshes = createLinkMeshes(links);

[...nodeMeshes,...lineMeshes].forEach(object => scene.add(object,))

interactInnit(camera,scene,nodeMeshes,renderer)
innitSimulation(nodes,links,nodeMeshes)

function animate(){
    requestAnimationFrame(animate); 

    updateNodes(nodeMeshes)
    updateLinks(lineMeshes)
    showDescription()

    renderer.render(scene, camera);
}
animate();
