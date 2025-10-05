
import * as THREE from 'three'

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const boxPositon = new THREE.Vector3();
const descripBox = document.getElementById('descriptionBox')
let cameraRef = null;
let sceneRef = null;
let nodeMeshesRef = null;
let rendererRef = null;
let objectFound = null

export function interactInnit(camera,scene,nodeMeshes,renderer){
    cameraRef = camera
    sceneRef = scene
    nodeMeshesRef = nodeMeshes
    rendererRef = renderer

    window.addEventListener('click',handleClick)
    window.addEventListener( 'resize', onWindowResize );

}

export function handleClick(event){
    
    objectFound = null
    onPointerMove(event)

    raycaster.setFromCamera( pointer, cameraRef );
    const intersects = raycaster.intersectObjects( sceneRef.children );

    if(intersects.length && intersects[0]) {

        objectFound = intersects[0].object
        objectFound.material.color.set( 0xff0000 );
        
        showDescription(objectFound)
    }else{
        descripBox.style.display = 'none'
        nodeMeshesRef.forEach((element) => (!element.userData.isCountry)?element.material.color.set(0xffffff):'')
    }

}

export function showDescription(){

    if(objectFound == null){
        return
    }

    const cameraDistance = cameraRef.position.distanceTo(objectFound.matrixWorld)


    const minScale = 0.1;
    const maxScale = 0.8;
    const referenceDistance = 1000; 
    const scale = THREE.MathUtils.clamp(
    (referenceDistance / cameraDistance) * 1,
    minScale,
    maxScale
    );
    
    boxPositon.setFromMatrixPosition(objectFound.matrixWorld)
    boxPositon.project(cameraRef)

    let x = (boxPositon.x * 0.5 + 0.5) * window.innerWidth;
    let y = (-boxPositon.y * 0.5 + 0.5) * window.innerHeight;

    descripBox.style.display = 'block'
    descripBox.style.left = `${x}px`;
    descripBox.style.top = `${y}px`;
    descripBox.style.transform = `translate(-5%, -20%) scale(${scale})`;
}

function onWindowResize() {

    cameraRef.aspect = window.innerWidth / window.innerHeight;
    cameraRef.updateProjectionMatrix();
    rendererRef.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
