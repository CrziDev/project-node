import * as THREE from 'three'

export function createNodes(users,countries){
  const nodes = []

  const groupByCountry = Map.groupBy(users,(user) => user.country);

  groupByCountry.forEach((users,code) => {
      
      const clusterX = Math.random() * window.innerWidth ;
      const clusterY = Math.random() * window.innerHeight ;
      const clusterZ = Math.random() * window.innerWidth ;

      nodes.push({
        id: code,
        isCountry: true,
        x: clusterX,
        y: clusterY,
        z: clusterZ
      });

      users.forEach(user => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 100 + Math.random() * 50;
        nodes.push({
          ...user,
          isCountry: true,
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

