import * as THREE from 'three'

export function createNodeMesh(nodes){
  let nodeMeshes = [];

  nodes.forEach(function(node){
    const nodeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 50, 50),
      new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    );
    nodeMeshes.push(nodeMesh); 
  });
  
  return nodeMeshes;
}

export function updateNodes(nodes){

      nodes.forEach((node, index) => {
          node.position.set(node.x, node.y, node.z);
      }); 

}