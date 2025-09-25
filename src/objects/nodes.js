import * as THREE from 'three'

export function createNode(data){

}

export function createNodeMeshes(nodes){
  let nodeMeshes = [];

  nodes.forEach(function(node){
    const nodeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 50, 50),
      new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    );
    
    nodeMesh.userData = node;
    nodeMeshes.push(nodeMesh); 
  });
  
  return nodeMeshes;
}

export function updateNodes(nodeMeshes){
    nodeMeshes.forEach((node, index) => {
        node.position.set(node.userData.x, node.userData.y, node.userData.z);
    }); 

}

