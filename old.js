import * as THREE from 'three'
import {data} from './sampleData.js'
import * as d3 from "https://cdn.skypack.dev/d3-force-3d";

import { generateNodes, generateRandomLink ,createNodeMesh,createLineMesh,createParticleMesh} from './utils.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { element, log } from 'three/tsl';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  10000,
)

camera.position.z = 300

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const nodes = generateNodes(10,camera.position.z)
const links = generateRandomLink(nodes) 

const nodeMeshes = createNodeMesh(nodes); 
const lineMeshes = createLineMesh(links); 
const pulseMeshes = createParticleMesh(links); 

controls.zoomSpeed = 2.0;
controls.enableZoom = true;

nodeMeshes.forEach((node) => scene.add(node))
lineMeshes.forEach((line) => scene.add(line.lineMesh))
pulseMeshes.forEach((pulse) => scene.add(pulse.particleMesh))

const simulation = d3.forceSimulation(nodes,3)
    .force("charge", d3.forceManyBody().strength(-100))
    .force("link", d3.forceLink(links).id(d => d.id).distance(200))
    .force("center", d3.forceCenter(0, 0, 0));

function updateLinks() {
    lineMeshes.forEach(({lineMesh, link}) => {
        const positions = lineMesh.geometry.attributes.position.array;
        
        positions[0] = link.source.x;
        positions[1] = link.source.y;
        positions[2] = link.source.z;
        positions[3] = link.target.x;
        positions[4] = link.target.y;
        positions[5] = link.target.z;
        
        lineMesh.geometry.attributes.position.needsUpdate = true;

    });
}

function updateNodes(){
    nodes.forEach((node, index) => {
        const nodeName = new THREE.Vector3();

        nodeMeshes[index].position.set(node.x, node.y, node.z);

        nodeName.setFromMatrixPosition(nodeMeshes[index].matrixWorld)
        nodeName.project(camera)

        let x = (nodeName.x * 0.5 + 0.5) * window.innerWidth;
        let y = (-nodeName.y * 0.5 + 0.5) * window.innerHeight;


        const nodeNameEl = document.createElement("p");
        nodeNameEl.style.display = 'block'
        nodeNameEl.style.left = `${x}px`;
        nodeNameEl.style.top = `${y}px`;nodeNameEl

        nodeNameEl.textContent = 'label'
        nodeNameEl.style.color = 'white'
        nodeNameEl.style.zIndex = 100
        nodeNameEl.style.position = 'absolute'
        

        document.body.appendChild(nodeNameEl)
    }); 
}

const pulseDuration = 2;
const startTime = performance.now() / 1000;

function updatePulse(){

  const elapsed = (performance.now() / 1000) - startTime 
  const normalized = (elapsed / pulseDuration) % 1;

  pulseMeshes.forEach(({particleMesh, link}) => {
      particleMesh.position.lerpVectors(link.source,link.target, normalized)
  }); 
}


// Handle Click
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const descripBox = document.getElementById('descriptionBox')
const boxPositon = new THREE.Vector3();
let objectFound = null

// const plane = new THREE.Plane();
// const planeIntersect = new THREE.Vector3();
// const pNormal = new THREE.Vector3(0, 0, 1); 

// let draggableObject = null;
// let isDragging = false;

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function showDescription(parentObject){

    if(parentObject == null){
        return
    }

    boxPositon.setFromMatrixPosition(parentObject.matrixWorld)
    boxPositon.project(camera)

    let x = (boxPositon.x * 0.5 + 0.5) * window.innerWidth;
    let y = (-boxPositon.y * 0.5 + 0.5) * window.innerHeight;


    descripBox.style.display = 'block'
    descripBox.style.left = `${x}px`;
    descripBox.style.top = `${y}px`;
    
}


// Events 

window.addEventListener('click',(event)=>{

    onPointerMove(event)

	raycaster.setFromCamera( pointer, camera );
	const intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length && intersects[0]) {

        objectFound = intersects[0].object
		objectFound.material.color.set( 0xff0000 );
        
        showDescription(objectFound)
	}else{
        nodeMeshes.forEach((element) => element.material.color.set(0xffffff))
        descripBox.style.display = 'none'

    }


})

// window.addEventListener("mousemove", (event) => {
//     if (isDragging && draggableObject) {
//         updateMouse(event);
//         raycaster.setFromCamera(mouse, camera);

//         raycaster.ray.intersectPlane(plane, planeIntersect);
        
//         draggableObject.position.copy(planeIntersect);
//         draggableObject.userData.node.x = planeIntersect.x;
//         draggableObject.userData.node.y = planeIntersect.y;
//         draggableObject.userData.node.z = planeIntersect.z;

//         simulation.alpha(1).restart();
//         updateLinks();
//     }
// });


// window.addEventListener("click", (event) => {
//   updateMouse(event)

//   if(draggableObject != null){
//      draggableObject = null;
//   }

//   raycaster.setFromCamera(mouse, camera);
//   const found = raycaster.intersectObjects(scene.children, true);
    
//   if (found.length && found[0].object.isDraggable) {

//       draggableObject = found[0].object;
//       isDragging = true;
//       plane.setFromNormalAndCoplanarPoint(
//           pNormal,
//           draggableObject.position
//       );
//       draggableObject.material.color.setHex(0xff0000);
      
//   }
  
// })

// window.addEventListener("mouseup", () => {
//     if (draggableObject) {

//         draggableObject.material.color.setHex(0xffffff);
//         draggableObject = null;
//     }
//     isDragging = false;
// });


// 

controls.update();
function animate() {
    requestAnimationFrame(animate);

    updateNodes()
    updatePulse()
    updateLinks()
    showDescription(objectFound)

    renderer.render(scene, camera);
    controls.update();

}

animate();



