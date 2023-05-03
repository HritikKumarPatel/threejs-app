import { VRButton } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/VRButton.js";
// import { XRControllerModelFactory } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/XRControllerModelFactory.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 50);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// renderer.domElement.className = "my-canvas";
renderer.domElement.className = "my-canvas";
// renderer.domElement.style.border = "4px solid red";

camera.zoom = 60; // Set the initial zoom level
camera.updateProjectionMatrix(); // Update the camera's projection matrix

renderer.domElement.addEventListener("wheel", (event) => {
  // Adjust the camera's zoom based on the event's deltaY property

  var distance = camera.position.distanceTo(controls.target);
  var zoom = Math.pow(distance, 0.5);

  // Toggle canvas and warning visibility based on zoom level
  if (zoom < 5) {
    // canvas.style.display = "none";
    warning.style.display = "block";
    // renderer.domElement.style.visibility = "hidden";
  } else {
    // canvas.style.display = "block";
    warning.style.display = "none";
    // renderer.domElement.style.visibility = "visible";
  }

  // Adjust the camera's zoom level based on the wheel delta
  camera.zoom += event.deltaY * 0.01;
  camera.updateProjectionMatrix();
  //   console.log(camera.zoom);

  // camera.zoom += event.deltaY * 0.001;
  // camera.zoom = THREE.MathUtils.clamp(camera.zoom, 0.01, 20); // Clamp the zoom level between 0.1 and 10
  // camera.updateProjectionMatrix(); // Update the camera's projection matrix
  console.log("Current zoom level:", camera.zoom);
});

document.body.appendChild(VRButton.createButton(renderer));

renderer.xr.enabled = true;



// const loader = new THREE.OBJLoader();

// loader.load(
//   "BrandenburgGate.obj",
//   function (object) {
//     scene.add(object);


//   },
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   function (error) {
//     console.log("An error happened");
//   }
// );



var loader = new THREE.OBJLoader();

// Load your model
// loader.load("BrandenburgGate.obj", function (model) {
//   // Add the model to the scene
//   scene.add(model);

//   // Hide the model by default
//   model.visible = true;

//   // Add event listeners to the VR button and the toggle button
//   var vrButton = VRButton.createButton(renderer);
//   document.body.appendChild(vrButton);

//   vrButton.addEventListener("click", function () {
//     if (renderer.xr.isPresenting) {
//       // We are exiting VR mode, so show the 3D model and hide the overlay
//       model.visible = true;
//       document.getElementById("overlay").style.display = "none";
//     } else {
//       // We are entering VR mode, so hide the 3D model and show the overlay
//       model.visible = false;
//       document.getElementById("overlay").style.display = "block";
//     }
//   });

//   document
//     .getElementById("toggle-overlay")
//     .addEventListener("click", function () {
//       var overlay = document.getElementById("overlay");
//       if (overlay.style.display === "none") {
//         // Show the overlay
//         overlay.style.display = "block";
//       } else {
//         // Hide the overlay
//         overlay.style.display = "none";
//       }
//     });
// });

var model1;
loader.load("BrandenburgGate.obj", function (model) {
  // Add the model to the scene
  scene.add(model);
  model1 = model
  // Hide the model by default
  // model.visible = true;

  // // Add event listeners to the VR button and the toggle button
  // var vrButton = VRButton.createButton(renderer);
  // document.body.appendChild(vrButton);

  // var exitVRButton = document.createElement("button");
  // exitVRButton.innerHTML = "Exit VR";
  // exitVRButton.style.display = "none";
  // document.body.appendChild(exitVRButton);

  // vrButton.addEventListener("click", function () {
  //   if (renderer.xr.isPresenting) {
  //     // We are exiting VR mode, so show the 3D model and hide the overlay
  //     model.visible = true;
  //     document.getElementById("overlay").style.display = "none";
  //     vrButton.style.display = "block";
  //     exitVRButton.style.display = "none";
  //   } else {
  //     // We are entering VR mode, so hide the 3D model and show the overlay
  //     model.visible = false;
  //     document.getElementById("overlay").style.display = "block";
  //     vrButton.style.display = "none";
  //     exitVRButton.style.display = "block";
  //   }
  // });

  // exitVRButton.addEventListener("click", function () {
  //   renderer.xr.exitPresent();
  // });
});
// var model2;
// loader.load("guy_gltf.obj", function (model) {
//   // Add the model to the scene
//   // scene.add(model);
//   model2 = model;
  
// });


document.body.appendChild(VRButton.createButton(renderer));

renderer.xr.enabled = true;





const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

var canvas = document.getElementsByTagName("body")[0];

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

// var enterVRButton = document.createElement("button");
// enterVRButton.textContent = "Enter VR";
// enterVRButton.addEventListener("click", function () {
//   navigator.xr.requestSession("immersive-vr").then(function (session) {
//     renderer.vr.enabled = true;
//     renderer.vr.setSession(session);
//     animate();
//   });
// });
// document.body.appendChild(enterVRButton);

// navigator.xr
//   .requestSession("immersive-vr")
//   .then(function (session) {
//     renderer.vr.enabled = true;
//     renderer.vr.setSession(session);
//     animate();
//   })
//   .catch(function (error) {
//     console.error(error);
//   });


// Define the threshold zoom levels at which to switch to the sample image and back to the model
const THRESHOLD_ZOOM_IN_LEVEL = 5;
const THRESHOLD_ZOOM_OUT_LEVEL = 2;

// Keep track of whether the sample image is currently active
let isSampleImageActive = false;
let xrSession;
// import { XRControllerModelFactory } from "https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/webxr/XRControllerModelFactory.js"
// const controllerModelFactory = new XRControllerModelFactory();

// const controllerGrip = renderer.xr.getControllerGrip(0);

// const model = controllerModelFactory.createControllerModel(controllerGrip);

// controllerGrip.add(model);

// scene.add(controllerGrip);
// Check if WebVR is supported
// Check if WebXR is supported
// Check if WebXR is supported
// Check if WebXR is supported

// if ( 'xr' in navigator ) {

//   // Get renderer and camera from three.js scene
 
  
//   // Store original camera and renderer values
//   var originalCameraPosition = camera.position.clone();
//   var originalRendererSize;
//   // originalRendererSize.width = window.innerWidth

//   // originalRendererSize.width = window.innerHeight;
//   // Render function for the animation loop
//   function render() {
//     // Update your scene here
//     renderer.render( scene, camera );
//   }
  
//   // Toggle VR mode function
//   function toggleVR() {
//     if ( renderer.xr.enabled ) {
//       // Switch back to 2D mode
//       renderer.xr.enabled = false;
//       // renderer.setAnimationLoop( render );
      
//       // Reset camera and renderer values
//       camera.position.copy( originalCameraPosition );
//       renderer.setSize( window.innerWidth, window.innerHeight);
//       renderer.setScissorTest( false );
//       renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

      
//       // Show the VR button
//       // document.getElementById('vr-button').style.display = 'block';
//     } else {
//       // Switch to VR mode
//       renderer.xr.enabled = true;
//       renderer.xr.setReferenceSpaceType("local-floor");
//       // renderer.xr.setSessionMode("immersive-vr");
//       // renderer.setAnimationLoop( render );
//       // renderer.setSize(window.innerWidth, window.innerHeight);
//       // Hide the VR button
//       // document.getElementById('vr-button').style.display = 'none';
//     }
//   }
  
//   // Add event listener to document for mouse or keyboard input
//   // document.addEventListener( 'mousedown', toggleVR, false );
//   document.addEventListener( 'keydown', function( event ) {
//     if ( event.code === 'Enter' ) toggleVR();
//   }, false );
  
// }




if ("xr" in navigator) {
  // Get renderer and camera from three.js scene

  // Store original camera and renderer values
  var originalCameraPosition = camera.position.clone();
  var originalRendererSize;
var currentModel = 1;
  // Create a separate scene and camera for the image
  const imageWidth = 1.6; // Set this to the aspect ratio of your image
  const imageHeight = imageWidth / (window.innerWidth / window.innerHeight);
  const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);

  // Load the image texture
  const texture = new THREE.TextureLoader().load("14.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // Create a mesh with the geometry and material
  const mesh = new THREE.Mesh(geometry, material);

  // Position the mesh in front of the camera
  mesh.position.set(0, 0, -2); // Adjust the distance from the camera as needed

  // Add the mesh to the scene
  // scene.add(mesh);



  var imageElement;
  
  // Render function for the animation loop
  function render() {
    // Update your scene here
    renderer.render(scene, camera)
    controls.update();
  }

  function toggleModel() {
    if (currentModel === 1) {
      // Remove the first model
      scene.remove(model1);
      // Add the second model
      scene.add(mesh);
      currentModel = 2;
    } else {
      // Remove the second model
      scene.remove(mesh);
      // Add the first model
      scene.add(model1);
      currentModel = 1;
    }
  }

  function toggleVR() {
    if (renderer.xr.enabled) {
      // Switch back to 2D mode
      renderer.xr.enabled = false;
      // Reset camera and renderer values
      camera.position.copy(originalCameraPosition);
      renderer.setSize(originalRendererSize.width, originalRendererSize.height);
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    } else {
      // Switch to VR mode
      renderer.xr.enabled = true;
      // Store original renderer size
      originalRendererSize = renderer.getSize(new THREE.Vector2());
      // Set renderer to VR mode
      renderer.xr.setReferenceSpaceType("local");
      renderer.xr.setSessionMode("immersive-vr");
      // Add animation loop to renderer
      renderer.setAnimationLoop(render);
    }
  }



document.addEventListener(
  "keydown",
  function (event) {
    if (event.code === "Enter") {
      toggleModel();
    } else if (event.code === "KeyQ") {
      toggleVR();
    }
  },
  false
);

  // Set the animation loop
  // renderer.setAnimationLoop(render);
}










// if ("xr" in navigator) {
//   // Get renderer and camera from three.js scene

//   // Store original camera and renderer values
//   var originalCameraPosition = camera.position.clone();
//   var originalRendererSize;
//   var imageElement;

//   // Render function for the animation loop
//   function render() {
//     // Update your scene here
//     renderer.render(scene, camera);
//   }

//   // Toggle VR mode function
//   function toggleVR() {
//     if (renderer.xr.enabled) {
//       // Switch back to 2D mode
//       renderer.xr.enabled = false;

//       // Remove any existing image element
//       // if (imageElement) {
//       //   imageElement.remove();
//       //   imageElement = null;
//       // }

//       // Create and add the image element
//       imageElement = document.createElement("img");
//       imageElement.src = "14.jpg";
//       // imageElement.style.position = "fixed";
//       imageElement.style.top = 0;
//       imageElement.style.left = 0;
//       imageElement.style.width = "100%";
//       imageElement.style.height = "100%";
//       imageElement.style.zIndex = "5"
//       document.body.appendChild(imageElement);

//       // Reset camera and renderer values
//       camera.position.copy(originalCameraPosition);
//       renderer.setSize(0, 0);
//       renderer.setScissorTest(false);
//       renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
//     } else {
//       // Switch to VR mode
//       renderer.xr.enabled = true;

//       // Remove the image element
//       if (imageElement) {
//         imageElement.remove();
//         imageElement = null;
//       }

//       renderer.xr.setReferenceSpaceType("local-floor");
//       renderer.setAnimationLoop(render);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }
//   }

//   // Add event listener to document for mouse or keyboard input
//   document.addEventListener(
//     "keydown",
//     function (event) {
//       if (event.code === "Enter") toggleVR();
//     },
//     false
//   );
// }









// Request a VR session
// navigator.xr.requestSession("immersive-vr").then((session) => {
//   xrSession = session;

//   // Check for hand tracking support
//   if (xrSession.supportsFeature("hand-tracking")) {
//     console.log("active")
//   } else {
//         console.log("inactive");

//   }
// });

// Add an event listener for the "select" event on the VR controller
// renderer.xr.addEventListener("select", () => {
//   // Check the current zoom level of the camera
//   console.log("selected")
// });

// Define the function to switch to the sample image
function switchToSampleImage() {
  // Remove the current scene from the renderer
  renderer.scene.remove(scene);

  // Create a new scene for the sample image
  const sampleScene = new THREE.Scene();

  // Add the sample image to the new scene
  const sampleImage = new THREE.Mesh(sampleGeometry, sampleMaterial);
  sampleScene.add(sampleImage);

  // Set the new scene as the active scene in the renderer
  renderer.scene = sampleScene;
}

// Define the function to switch back to the model
function switchToModel() {
  // Remove the current scene from the renderer
  renderer.scene.remove(renderer.scene);

  // Add the original scene back to the renderer
  renderer.scene = scene;
}





function animate() {
  renderer.setAnimationLoop(function () {
    
    renderer.render(scene, camera);
    controls.update();
  });
  
}

animate();
