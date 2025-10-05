import * as THREE from 'three'

export function identifyLinks(nodes){

  
  const links = []
  const hobbyIndex = new Map();
  const linkSet = new Set();

  nodes.forEach(user => {
      if(user.isCountry == true){return}

      user.hobby.forEach(h => {
        if(!hobbyIndex.has(h)){
          hobbyIndex.set(h,[])
        }
        hobbyIndex.get(h).push(user)
      })
  })


  nodes.forEach(user => {

      if(user.isCountry == true){return}

      user.hobby.forEach(h => {
        hobbyIndex.get(h).forEach((indexUser) => {
            
          if(indexUser.id == user.id)return   

          const key =
              user.id < indexUser.id
                ? `${user.id}-${indexUser.id}`
                : `${indexUser.id}-${user.id}`;

              if (!linkSet.has(key)) {
                  linkSet.add(key);
                  links.push({ source: user, target: indexUser });
              }
          })
      })

  })

  links.forEach(link => {
    let commonHobbies = 0;

    link.source.hobby.forEach(hobby => {
        
        if(link.target.hobby.includes(hobby)){
          commonHobbies++
        }
    })

    // const maxStr = 2
    // const multiplier = (1/maxStr)
    // link.strengh = multiplier * commonHobbies;

  })
  
  return links;
}

export function createLinkMeshes(links){
  let lineMeshes = [];

  links.forEach(function(link){
    
    const lineMesh = new THREE.Line(
        new THREE.BufferGeometry()
        .setFromPoints([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,0),
        ]),
        new THREE.LineBasicMaterial( { 
              color: 0x808080,  
              side: THREE.DoubleSide,
              // linewidth:2,
              transparent: true,
              opacity: 0.3
          }),
      );
  
    lineMesh.frustumCulled = false;
    lineMesh.link = link
    lineMeshes.push(lineMesh);
  
  });
  
  return lineMeshes;
}


export function updateLinks(lineMeshes) {

    
    lineMeshes.forEach(lineMesh => {
        
        const positions = lineMesh.geometry.attributes.position.array;

        positions[0] = lineMesh.link.source.x;
        positions[1] = lineMesh.link.source.y;
        positions[2] = lineMesh.link.source.z;
        positions[3] = lineMesh.link.target.x;
        positions[4] = lineMesh.link.target.y;
        positions[5] = lineMesh.link.target.z;
        
        lineMesh.geometry.attributes.position.needsUpdate = true;

    });

}