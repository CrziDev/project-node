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