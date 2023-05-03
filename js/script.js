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

camera.zoom =20; // Set the initial zoom level
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

// Get the XR session and reference space
// Get the XR session and reference space
const session = await navigator.xr.requestSession('inline');
// const referenceSpace = await session.requestReferenceSpace('local');
console.log(session)
// Create an XRFrame callback function
function onXRFrame(time, frame) {
  // Get the pose of the VR headset
  console.log('Hello')
  const pose = frame.getViewerPose();

  // If the pose is valid, calculate the elevation and azimuthal angle
  if (pose !== null) {
    const transform = pose.transform;
    const position = transform.position;
    const orientation = transform.orientation;

    // Calculate the elevation and azimuthal angle
    const elevation = Math.atan2(position.y, Math.sqrt(position.x * position.x + position.z * position.z));
    const azimuthal = Math.atan2(-position.z, position.x) - Math.PI / 2 - orientation.y;

    // Print the elevation and azimuthal angle
    console.log("Elevation:", elevation);
    console.log("Azimuthal:", azimuthal);
  }

  // Request the next animation frame
  session.requestAnimationFrame(onXRFrame);
}

// Start the animation loop
session.requestAnimationFrame(onXRFrame);



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
loader.load('../model.gltf', function (gltf) {

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


const directionalLight = new THREE.DirectionalLight(0xfffffff, 1);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(1, 0, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(0, 0, 1);
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight3.position.set(0, 1, 0);
scene.add(directionalLight3);



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


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// add event listener to canvas for mouse click
canvas.addEventListener(
  "dblclick",
  function (event) {
    // calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      // set the intersection point as the new center of the model
      var newCenter = intersects[0].point;
      controls.target.set(newCenter.x, newCenter.y, newCenter.z);

      // update the camera position to zoom in on the new center
      var distance = camera.position.distanceTo(newCenter);
      camera.position.set(newCenter.x, newCenter.y, newCenter.z + distance);
      controls.update();
    }
  },
  false
);

controls.target.set(0, 0.7, 0);

// update the camera position to zoom in on the new center
//   var distance = camera.position.distanceTo(newCenter);
//   camera.position.set(0, 0,2);
controls.update();
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
const cameraTarget = new THREE.Vector3(0, 0, 0); // Define camera target


// Assuming the camera and model are defined and initialized

// Get the camera's direction vector




renderer.domElement.addEventListener('mousedown', (event) => {
  if (event.button !== 0) { // Check that the left mouse button was clicked
    return;
  }
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});

renderer.domElement.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };
    // Do something with the delta move, e.g. rotate the camera
    camera.rotation.y += deltaMove.x * 0.01;
    camera.rotation.x += deltaMove.y * 0.01;
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }
});

var elev;
var azi;


renderer.domElement.addEventListener('mouseup', (event) => {
  if (event.button !== 0) { // Check that the left mouse button was released
    return;
  }
  isDragging = false;
  // Calculate the camera angles and print them to the console
  const direction = new THREE.Vector3().subVectors(cameraTarget, camera.position);
  const azimuthalAngle = Math.atan2(direction.x, direction.z);
  const elevationAngle = Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z));
  const angles = {
    elevation: THREE.MathUtils.radToDeg(elevationAngle),
    azimuthal: THREE.MathUtils.radToDeg(azimuthalAngle)
  };



  
  var x = Math.floor(angles.elevation.toFixed(2)/7)
  var y = Math.floor(angles.azimuthal.toFixed(2)/8)
  console.log(`Elevation: ${x}°, Azimuthal: ${y}°`);
  elev = x;
  azi = y;
  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${y*20}°`);
  // console.log(`Elevation: ${x*20}°, Azimuthal: ${(y+1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${y*20}°`);
  // console.log(`Elevation: ${x*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${(y+1)*20}°`);
  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${(y+1)*20}°`);
  console.log("________END________")
  // console.log(x*20, y*20)
});



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