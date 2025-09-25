
export function generateRandomLink(nodes) {
  return Array.from({ length: nodes.length}, () => ({
    source: nodes[Math.floor(Math.random() * nodes.length)],
    target: nodes[Math.floor(Math.random() * nodes.length)]
  }));
}

export function generateNodes(number, range, cameraPosition) {
  return Array.from({ length: number }, (_, i) => ({
    id: String.fromCharCode(65 + i),
    position: new THREE.Vector3(
      Math.random() * range - cameraPosition,
      Math.random() * range - cameraPosition,
      Math.random() * range - cameraPosition
    )
  }));
}


export function createNodes(users,countries){
  const nodes = []

  const countryMap = new Map(countries.map(c => [c.id, c.name]))
  const groupByCountry = Map.groupBy(users,(user) => user.country);

  groupByCountry.forEach((users,code) => 
      
      nodes.push({
        id:code,
        name:countryMap.get(code)
      }),
      users.forEach(user => 
        nodes.push(user),
      )
  )
  
  return nodes;
}


export function identifyLinks(users,nodes){
  const links = []

  const nodeMap = new Map(nodes.map(n => [n.id,n]));
  
  const groupByCountry = Map.groupBy(users,(user) => user.country);

  groupByCountry.forEach((users,code) => 
     users.forEach(user => links.push({source:nodeMap.get(code),target:nodeMap.get(user.id)}))
  )
  
  return links;
}