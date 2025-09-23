import * as THREE from 'three'
import {mockData} from './mockData.js'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createNodeMesh,updateNodes} from './objects/nodes.js'
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
camera.position.z = 200;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.zoomSpeed = 2.0;
controls.enableZoom = true;

// Main
const individuals = mockData;
const countries = utils.getCountries(mockData)

const nodes = createNodeMesh([...individuals,...countries]);

[...nodes].forEach(object => scene.add(object))

innitSimulation(nodes)

function animate(){
    requestAnimationFrame(animate); 

    updateNodes(nodes)

    renderer.render(scene, camera);
}
animate();
