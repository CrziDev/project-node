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

  worldPosition.project(cameraRef)

  let x = (worldPosition.x * 0.5 + 0.5) * window.innerWidth;
  let y = (-worldPosition.y * 0.5 + 0.5) * window.innerHeight;

  const minScale = 0.5;
  const maxScale = 1.2;

  const distance = cameraRef.position.distanceTo(worldPosition);
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

// updateLabelPosition() {
//                 // Project 3D position to 2D screen coordinates
//                 const nodePosition = this.mesh.position.clone();
//                 nodePosition.project(camera);
                
//                 // Calculate screen coordinates
//                 const x = (nodePosition.x * 0.5 + 0.5) * window.innerWidth;
//                 const y = (nodePosition.y * -0.5 + 0.5) * window.innerHeight;
                
//                 // Calculate distance from camera for scaling
//                 const distanceFromCamera = camera.position.distanceTo(this.mesh.position);
                
//                 // Calculate scale based on zoom level and distance
//                 // Base scale that adjusts with zoom level
//                 const zoomScale = (maxZoom - currentZoom) / (maxZoom - minZoom);
//                 const baseScale = 0.8 + (zoomScale * 1.2); // Scale from 0.8 to 2.0
                
//                 // Additional scaling based on distance (for perspective)
//                 const perspectiveScale = Math.max(0.5, Math.min(2, 15 / distanceFromCamera));
                
//                 // Final scale combining zoom and perspective
//                 let finalScale = baseScale * perspectiveScale;
                
//                 // Apply hover effect
//                 if (this.hovered) {
//                     finalScale *= 1.2;
//                 }
                
//                 // Calculate label offset in 3D space
//                 const labelOffset = new THREE.Vector3(0, 1, 0); // 1 unit above the node
//                 labelOffset.multiplyScalar(this.mesh.scale.x); // Account for node scaling
                
//                 // Project the offset position
//                 const labelPosition3D = this.mesh.position.clone().add(labelOffset);
//                 labelPosition3D.project(camera);
                
//                 const labelX = (labelPosition3D.x * 0.5 + 0.5) * window.innerWidth;
//                 const labelY = (labelPosition3D.y * -0.5 + 0.5) * window.innerHeight;
                
//                 // Set label position and size
//                 this.labelElement.style.left = labelX + 'px';
//                 this.labelElement.style.top = labelY + 'px';
//                 this.labelElement.style.fontSize = (12 * finalScale) + 'px';
                
//                 // Hide labels that are behind the camera or too small/large
//                 const shouldShow = labelPosition3D.z > -1 && finalScale > 0.3 && finalScale < 3;
//                 this.labelElement.style.display = shouldShow ? 'block' : 'none';
                
//                 // Adjust opacity based on distance for depth effect
//                 const opacity = Math.max(0.6, Math.min(1, 1 - (distanceFromCamera - 5) / 20));
//                 this.labelElement.style.opacity = opacity;
//             }



