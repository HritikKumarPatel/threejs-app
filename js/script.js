// var scene, camera, renderer;
// import { GLTFLoader } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js";
// scene = new THREE.Scene()
// scene.background = new THREE.Color(0xff5f0f)
// camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight)

// camera.position.set(0, 100, 1000)

// renderer = new THREE.WebGLRenderer()

// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
// // window.addEventListener('resize', function(){
// //     renderer.setSize(window.innerWidth, window.innerHeight)
// //     camera.aspect = window.innerWidth/window.innerHeight
// // })

// var loader = new GLTFLoader();
// loader.load('heli.gltf', function (gltf){
//     scene.add(gltf.scene)
// })

// function animate() {
//     requestAnimationFrame(animate)
//     renderer.render(scene, camera)
// }

// animate()

    // Load the Three.js library    
    // Create a Three.js scene
import { VRButton } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/VRButton.js";




const scene = new THREE.Scene();

// Create a Three.js camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 50);
// camera.lookAt(0, 0, 1);
// Create a Three.js renderer

// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.zoom = 6; // Set the initial zoom level
camera.updateProjectionMatrix(); // Update the camera's projection matrix

// const renderer = new THREE.WebGLRenderer();
// Add the renderer's DOM element to the page
// document.body.appendChild(renderer.domElement);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var canvas = document.getElementsByTagName("canvas")[0];

renderer.domElement.addEventListener("wheel", (event) => {
  // Adjust the camera's zoom based on the event's deltaY property





  var distance = camera.position.distanceTo(controls.target);
  var zoom = Math.pow(distance, 0.5);

  // Toggle canvas and warning visibility based on zoom level
  if (zoom < 5) {
    // canvas.style.display = "none";
    warning.style.display = "block";
  } else {
    // canvas.style.display = "block";
    warning.style.display = "none";
  }

  // Adjust the camera's zoom level based on the wheel delta
  camera.zoom += event.deltaY * 0.001;
  camera.updateProjectionMatrix();
  console.log(camera.zoom);



  // camera.zoom += event.deltaY * 0.001;
  // camera.zoom = THREE.MathUtils.clamp(camera.zoom, 0.01, 20); // Clamp the zoom level between 0.1 and 10
  // camera.updateProjectionMatrix(); // Update the camera's projection matrix
  // console.log("Current zoom level:", camera.zoom);
});

document.body.appendChild(VRButton.createButton(renderer));

renderer.xr.enabled = true;



// document.body.appendChild(VRButton.createButton(renderer));

// renderer.xr.enabled = true;

// renderer.setAnimationLoop(function () {
//   renderer.render(scene, camera);
// });


renderer.domElement.addEventListener("change", (event)=>{
    const azimuthalAngle = controls.getAzimuthalAngle();
    const polarAngle = controls.getPolarAngle();
    console.log("Azimuthal angle: ", azimuthalAngle);
    console.log("Polar angle: ", polarAngle);
})






// Load the 3D model using Three.js's GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('heli.gltf', function (gltf) {

    var object = gltf.scene;

    // Calculate the bounding box of the model
    var boundingBox = new THREE.Box3().setFromObject(object);

    // Get the center point of the bounding box
    var center = boundingBox.getCenter(new THREE.Vector3());

    // Translate the model to the new center position
    var translation = new THREE.Vector3().subVectors(center, object.position);
    object.translateX(-3);
    object.translateY(0);
    object.translateZ(translation.z);

    // Rotate the model to face the camera
    var cameraDirection = new THREE.Vector3()
      .subVectors(camera.position, center)
      .normalize();
    var angle = Math.atan2(cameraDirection.x, cameraDirection.z);
    object.rotateY(angle);

    // Add the model to the scene
    scene.add(object);




  // scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);





// const loader = new THREE.OBJLoader();

// // Load the .obj file
// loader.load(
//   // path to the .obj file
//   'Tree1.obj',

//   // Called when the file is loaded
//   function (object) {
//     // Add the object to the scene
//     scene.add(object);
//   },

//   // Called when there's an error loading the file
//   function (error) {
//     console.error("An error occurred while loading the OBJ file", error);
//   }
// );


const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
    controls.update();
  });
  
  // const azimuthalAngle = controls.getAzimuthalAngle();
  // const polarAngle = controls.getPolarAngle();
  // console.log("Azimuthal angle: ", azimuthalAngle);
  // console.log("Polar angle: ", polarAngle);
  // renderer.render(scene, camera);
}

// // Create an animation loop to update the scene
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
animate();