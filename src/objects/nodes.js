import * as THREE from 'three'

const worldPosition = new THREE.Vector3();
let cameraRef = null;

export function nodeInnit(camera){
    cameraRef = camera
}

export function createNodes(users,countries){
  const nodes = []

  const groupByCountry = Map.groupBy(users,(user) => user.country);

  groupByCountry.forEach((users,code) => {
      
      const clusterX = Math.random() * window.innerWidth + 100;
      const clusterY = Math.random() * window.innerHeight + 100;
      const clusterZ = Math.random() * window.innerWidth + 100;

      nodes.push({
        id: code,
        isCountry: true,
        color: countries.find(country => country.id === code).color,
        x: clusterX,
        y: clusterY,
        z: clusterZ
      });

      users.forEach(user => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 100 + Math.random() * 50;
        nodes.push({
          ...user,
          isCountry: false,
          x: clusterX + Math.cos(angle) * radius,
          y: clusterY + Math.sin(angle) * radius,
          z: clusterZ + (Math.random() - 0.5) * radius
        });

      })
    }
  )

  return nodes;
}

export function createNodeMeshes(nodes){
  let nodeMeshes = [];

  nodes.forEach(function(node){
    
    const nodeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(30, 50, 50),
      new THREE.MeshBasicMaterial( { color: node?.color ?? 0xffffff } ),
    );

    nodeMesh.userData = node;
    nodeMeshes.push(nodeMesh);

    let labelElement = document.createElement('div')
    labelElement.id = node.id
    labelElement.textContent = node.nickname
    labelElement.style.position = 'absolute'
    labelElement.style.color = 'white'
    labelElement.style.zIndex = 10
    document.body.appendChild(labelElement);


  });
  
  return nodeMeshes;
}


export function updateNodes(nodeMeshes){
    nodeMeshes.forEach((nodeMesh, index) => {
        nodeMesh.position.set(nodeMesh.userData.x, nodeMesh.userData.y, nodeMesh.userData.z);
        updateLabel(nodeMesh)
    }); 

}

function updateLabel(nodeMesh){
  
  let label = document.getElementById(nodeMesh.userData.id)

  worldPosition.setFromMatrixPosition(nodeMesh.matrixWorld)
  worldPosition.y += 45;

  const distance = cameraRef.position.distanceTo(worldPosition);

  const projectedPosition = worldPosition.clone();
  projectedPosition.project(cameraRef);

  
  if(projectedPosition.z > 1){
    return
  }
  
  let x = (projectedPosition.x * 0.5 + 0.5) * window.innerWidth;
  let y = (-projectedPosition.y * 0.5 + 0.5) * window.innerHeight;

  const minScale = 0.1;
  const maxScale = 0.8;

  const referenceDistance = 1000; 
  const scale = THREE.MathUtils.clamp(
    (referenceDistance / distance) * 1,
    minScale,
    maxScale
  );
  

  label.style.display = 'block';
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  label.style.transform = `translate(-50%, -50%) scale(${scale})`;

}


