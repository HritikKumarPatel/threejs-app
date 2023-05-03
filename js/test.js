import { VRButton } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/VRButton.js";

// Create a renderer and add it to the page
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// Create a scene
const scene = new THREE.Scene();
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a camera and add it to the scene
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 0);
scene.add(camera);

// Create a cube and add it to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, -2);
scene.add(cube);

// Create an "Enter VR" button and add it to the page
const vrButton = VRButton.createButton(renderer);
document.body.appendChild(vrButton);

// Add an event listener to the "Exit VR" button
vrButton.addEventListener("exit", function () {
  // This function is called when the user exits VR mode
  cube.visible = true;
});

// Add an event listener to the "Enter VR" button
vrButton.addEventListener("click", function () {
  // This function is called when the user enters VR mode
  cube.visible = false;
});

// Render the scene
renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
  controls.update()
});
