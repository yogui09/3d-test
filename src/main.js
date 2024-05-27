import * as THREE from 'three';
import {Tween, Easing} from '@tweenjs/tween.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


// -- Global Variables --
// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;

const loader = new GLTFLoader();

let car

// cube or geometric object
// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshPhongMaterial({color: 'red'});
// const cube = new THREE.Mesh(geometry, material);
// cube.name = "cube"

// Main function
function main() {
    // remove the default canvas on web page (output)
    document.querySelector('canvas').remove();

    // add scene background color, set rendering size,
    // and add to DOM on web page (output)
    scene.background = new THREE.Color('#161718');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // reposition or transform camera
    camera.position.set(0, 0, 5);

    // create world light and add to scene
    const light = new THREE.HemisphereLight('#FFFFFF', '#757575', 5);
    scene.add(light);

    // set initial cube position, rotation, and add to scene
    car.position.set(0, 0, 0);
    car.rotation.set(0.2, 0.7, 0);
    car.name = "car";
    scene.add(car);

    renderer.render(scene, camera);
}

function animate(time, tween) {
    tween.update(time);
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame((time) => animate(time, tween));
}


document.getElementById('avd').addEventListener('click', () => {
    const tween = new Tween(car.rotation, false)
        .to({y: 0.7}, 1000) // animate to 180deg in 2 seconds
        .easing(Easing.Quadratic.InOut) // use exponential curve
        .start();
    animate(1000, tween);
});

document.getElementById('avg').addEventListener('click', () => {
    const tween = new Tween(car.rotation, false)
        .to({y: -0.7}, 1000) // animate to 180deg in 2 seconds
        .easing(Easing.Quadratic.InOut) // use exponential curve
        .start();
    animate(1000, tween);
});

document.getElementById('ard').addEventListener('click', () => {
    const tween = new Tween(car.rotation, false)
        .to({y: 2.5}, 1000) // animate to 180deg in 2 seconds
        .easing(Easing.Quadratic.InOut) // use exponential curve
        .start();
    animate(1000, tween);
});

document.getElementById('arg').addEventListener('click', () => {
    const tween = new Tween(car.rotation, false)
        .to({y: 3.8}, 1000) // animate to 180deg in 2 seconds
        .easing(Easing.Quadratic.InOut) // use exponential curve
        .start();
    animate(1000, tween);
});

// call the main() function to initiate the scene

loader.load('/public/car.glb', (obj) => {
    car = obj.scene;
    main();
}, undefined, console.error);
