import * as THREE from 'three'

export function createLinkMeshes(links){
  let lineMeshes = [];

  links.forEach(function(link){
    
    const lineMesh = new THREE.Line(
        new THREE.BufferGeometry()
        .setFromPoints([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,0),
        ]),
        new THREE.LineBasicMaterial( { color: 0x808080,  linewidth:0.1, side: THREE.DoubleSide } ),
      );
  
    // lineMesh.frustumCulled = false;
    lineMesh.link = link
    lineMeshes.push(lineMesh);
  
  });
  
  return lineMeshes;
}


export function updateLinks(lineMeshes) {

  
    lineMeshes.forEach(lineMesh => {
        
        const positions = lineMesh.geometry.attributes.position.array;

        // console.log(positions);
        
        positions[0] = lineMesh.link.source.x;
        positions[1] = lineMesh.link.source.y;
        positions[2] = lineMesh.link.source.z;
        positions[3] = lineMesh.link.target.x;
        positions[4] = lineMesh.link.target.y;
        positions[5] = lineMesh.link.target.z;
        
        lineMesh.geometry.attributes.position.needsUpdate = true;

    });
}