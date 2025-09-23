export function createParticleMesh(links){
  let particlMeshes = []

  links.forEach(function(link){
     
    const particleMesh = new THREE.Mesh(
       new THREE.SphereGeometry(3, 50, 50),
        new THREE.MeshBasicMaterial( {   
          color: 0xffff00,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending
        })
    )

    particlMeshes.push({particleMesh,link});
  });

  return particlMeshes;
}

