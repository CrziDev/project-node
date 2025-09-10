import * as THREE from "three"

export class Node {

    constructor(parameters) {
        this.range = 100
        this.position = new THREE.Vector3(
            Math.random() * this.range,
            Math.random() * this.range,
            Math.random() * this.range
        )
        
        this.index = -1
    }
    getIndex() {
        return this.index;
    }
    setIndex(value) {
        this.index = value;
    }
    getPosition() {
        return this.position;
    }
}