
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


export function identifyLinks(users,nodes){
  const links = []

  // const nodeMap = new Map(nodes.map(n => [n.id,n]));
  
  // const groupByCountry = Map.groupBy(users,(user) => user.country);

  // groupByCountry.forEach((users,code) => 
  //    users.forEach(user => links.push({source:nodeMap.get(code),target:nodeMap.get(user.id)}))
  // )
  
  return links;
}