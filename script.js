import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// flooring
const floorTexture = new THREE.TextureLoader().load('floor.png'); // floor.png is a normal map
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ normalMap: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// lighting (spotlight)
const light = new THREE.SpotLight(0xffffff, 1);
light.castShadow = true;
light.intensity = 1

scene.add(light);
light.position.set(10, 10, 10);

// lighting (spotlight)
const light2 = new THREE.SpotLight(0xffffff, 1);
light2.castShadow = true;
light2.intensity = 0.5

scene.add(light2);
light2.position.set(-10, 10, -10);

camera.position.set(0, 1.2, 2);


const loader = new GLTFLoader();
loader.load('gnarp.gltf', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0.2, 0.25)
}, undefined, function (error) {
    console.error(error);
});


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.2, 0);
controls.update();



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();