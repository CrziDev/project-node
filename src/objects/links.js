export function createLineMesh(links){
  let lineMeshes = [];

  links.forEach(function(link){
    
    const lineMesh = new THREE.Line(
        new THREE.BufferGeometry()
        .setFromPoints([
            new THREE.Vector3(
              link.source.position.x,
              link.source.position.y,
              link.source.position.z
            ),
            new THREE.Vector3(
              link.target.position.x,
              link.target.position.y,
              link.target.position.z
            ),
        ]),
        new THREE.LineBasicMaterial( { color: 0x808080,  linewidth:0.1, side: THREE.DoubleSide } ),
      );
  
    lineMesh.frustumCulled = false;
    lineMeshes.push({ lineMesh, link });
  
  });
  
  return lineMeshes;
}