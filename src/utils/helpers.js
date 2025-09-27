
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