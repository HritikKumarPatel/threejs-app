import { VRButton } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/VRButton.js";
// import { XRControllerModelFactory } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/XRControllerModelFactory.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  140,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 0, 20);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// renderer.domElement.className = "my-canvas";
renderer.domElement.className = "my-canvas";
// renderer.domElement.style.border = "4px solid red";

camera.zoom = 150; // Set the initial zoom level
camera.updateProjectionMatrix(); // Update the camera's projection matrix


var loader = new THREE.GLTFLoader();



var model1;
loader.load("model.gltf", function (model) {
  // Add the model to the scene
  var object = model.scene;
  scene.add(model.scene);
  model1 = object;
  
});

// document.body.appendChild(VRButton.createButton(renderer));

// renderer.xr.enabled = true;
const controls = new THREE.OrbitControls(camera, renderer.domElement);


const angleRanges = [
  {
    elevRange: [-4, -3],
    aziRange: [16, 17],
    imageName: "70441865_6880124143.jpg",
  },
  {
    elevRange: [-4, -3],
    aziRange: [18, 19],
    imageName: "84805358_4163596824.jpg",
  },
  {
    elevRange: [-4, -3],
    aziRange: [20, 22],
    imageName: "89098699_2373311321.jpg",
  },
  {
    elevRange: [-4, -3],
    aziRange: [-23, -22],
    imageName: "13537535_4226240074.jpg",
  },
  {
    elevRange: [-4, -3],
    aziRange: [-21, -20],
    imageName: "97371403_4823878472.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [16, 17],
    imageName: "87315572_37762236.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [18, 19],
    imageName: "92110230_6184758265.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [20, 22],
    imageName: "65235481_5082884383.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [-23, -22],
    imageName: "89098699_2373311321.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [-21, -20],
    imageName: "95872170_338612398.jpg",
  },
  {
    elevRange: [-2, -1],
    aziRange: [-19, -18],
    imageName: "15234350_309538824.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [16, 17],
    imageName: "28038070_6880124871.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [18, 19],
    imageName: "28038070_6880124871.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [20, 22],
    imageName: "52539189_8916365305.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [-23, -22],
    imageName: "43959267_2997124172.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [-21, -20],
    imageName: "43959267_2997124172.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [-19, -18],
    imageName: "13537535_4226240074.jpg",
  },
  {
    elevRange: [0, 1],
    aziRange: [-17, -16],
    imageName: "36313636_80884692.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [16, 17],
    imageName: "38254742_2964471525.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [18, 19],
    imageName: "52630012_12435805525.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [20, 22],
    imageName: "52630012_12435805525.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [-23, -22],
    imageName: "52539189_8916365305.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [-21, -20],
    imageName: "78488840_4159986924.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [-19, -18],
    imageName: "13537535_4226240074.jpg",
  },
  {
    elevRange: [2, 3],
    aziRange: [-17, -16],
    imageName: "82182437_6880118093.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [18, 19],
    imageName: "97886664_6880123541.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [20, 22],
    imageName: "90146413_6880121203.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [-23, -22],
    imageName: "90135423_286554388.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [-21, -20],
    imageName: "92068036_76585881.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [-19, -18],
    imageName: "98143716_5974984669.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [-17, -16],
    imageName: "98143716_5974984669.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [16, 17],
    imageName: "90146413_6880121203.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [18, 19],
    imageName: "93505867_8891475944.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [20, 22],
    imageName: "95480181_2398666879.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [-23, -22],
    imageName: "90709010_4157922530.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [-21, -20],
    imageName: "62661350_182339698.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [-19, -18],
    imageName: "62661350_182339698.jpg",
  },
  {
    elevRange: [6, 8],
    aziRange: [-17, -16],
    imageName: "90709010_4157922530.jpg",
  },
  {
    elevRange: [4, 5],
    aziRange: [18, 19],
    imageName: "78488840_4159986924.jpg",
  },
];

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
const cameraTarget = new THREE.Vector3(0, 0, 0); // Define camera target


function getImageNameForAngles(elev, azi) {
  for (const entry of angleRanges) {
    const { elevRange, aziRange, imageName } = entry;
    if (
      elev >= elevRange[0] &&
      elev <= elevRange[1] &&
      azi >= aziRange[0] &&
      azi <= aziRange[1]
    ) {
      return imageName;
    }
  }
  // if no matching entry is found, return a default image file name
  return "81865574_8435624822.jpg";
}

renderer.domElement.addEventListener("mousedown", (event) => {
  if (event.button !== 0) {
    // Check that the left mouse button was clicked
    return;
  }
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});

renderer.domElement.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };
    // Do something with the delta move, e.g. rotate the camera
    camera.rotation.y += deltaMove.x * 0.01;
    camera.rotation.x += deltaMove.y * 0.01;
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }
});

var elev = 0;
var azi = 22;

renderer.domElement.addEventListener("mouseup", (event) => {
  if (event.button !== 0) {
    // Check that the left mouse button was released
    return;
  }
  isDragging = false;
  // Calculate the camera angles and print them to the console
  const direction = new THREE.Vector3().subVectors(
    cameraTarget,
    camera.position
  );
  const azimuthalAngle = Math.atan2(direction.x, direction.z);
  const elevationAngle = Math.atan2(
    direction.y,
    Math.sqrt(direction.x * direction.x + direction.z * direction.z)
  );
  const angles = {
    elevation: THREE.MathUtils.radToDeg(elevationAngle),
    azimuthal: THREE.MathUtils.radToDeg(azimuthalAngle),
  };

  var x = Math.floor(angles.elevation.toFixed(2) / 7);
  var y = Math.floor(angles.azimuthal.toFixed(2) / 8);
  console.log(`Elevation: ${x}°, Azimuthal: ${y}°`);
  elev = x;
  azi = y;

  // const imageName = getImageNameForAngles(elev, azi);
  // use the image name to display the corresponding image on the page
  // const imageElement = document.getElementById("my-image");
  // imageElement.src = `../static/${imageName}`;

  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${y*20}°`);
  // console.log(`Elevation: ${x*20}°, Azimuthal: ${(y+1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${y*20}°`);
  // console.log(`Elevation: ${x*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${(y+1)*20}°`);
  // console.log(`Elevation: ${(x+1)*20}°, Azimuthal: ${(y-1)*20}°`);
  // console.log(`Elevation: ${(x-1)*20}°, Azimuthal: ${(y+1)*20}°`);
  console.log("________END________");
  // console.log(x*20, y*20)
});









let isMeshShown = false;  


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
mesh.position.set(0,0, -2);

var flag = false;
controls.enabled = true;
var controls2 = new THREE.OrbitControls(camera, renderer.domElement);
controls2.enabled = false;
renderer.domElement.addEventListener("wheel", (event) => {
  // Adjust the camera's zoom based on the event's deltaY property

  var distance = camera.position.distanceTo(controls.target);
  var zoom = Math.pow(distance, 0.5);
  // mesh.position.set(0, 0, -2);
  
  
  // const newAspectRatio = myImage.width / myImage.height;
  // mesh.scale.set(newAspectRatio, 1, 1);




  // Toggle canvas and warning visibility based on zoom level
  if (zoom < 6) {
    if(flag!=true){
      controls.enabled = false;
      controls2.enabled = true;
      scene.remove(model1);
      const newImage = getImageNameForAngles(elev, azi);
      // const myImage = document.createElement("img");
      // myImage.src = "./14.jpg";
      const newTexture = new THREE.TextureLoader().load(newImage);
      mesh.material.map = newTexture;
      scene.add(mesh);
      flag = true;
    }
    
  }
  // If the zoom level is above the threshold and the mesh is currently shown, hide it
  else{
    controls.enabled = true;
controls2.enabled = false;
    scene.remove(mesh);
    scene.add(model1);
    flag = false
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

// document.body.appendChild(VRButton.createButton(renderer));

// renderer.xr.enabled = true;










const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);



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
      controls2.target.set(newCenter.x, newCenter.y, newCenter.z);
      // update the camera position to zoom in on the new center
      var distance = camera.position.distanceTo(newCenter);
      camera.position.set(newCenter.x, newCenter.y, newCenter.z + distance);
      controls.update();
      controls2.update()
    }
  },
  false
);

controls.target.set(0, 0.7, 0);

// update the camera position to zoom in on the new center
//   var distance = camera.position.distanceTo(newCenter);
//   camera.position.set(0, 0,2);
controls.update();


























// function animate() {
//   renderer.setAnimationLoop(function () {
    
//     renderer.render(scene, camera);
//     controls.update();
//   });
  
// }

function animate() {
  requestAnimationFrame(animate);
  controls.update()
  controls2.update()
  renderer.render(scene, camera);
  
}



animate();
