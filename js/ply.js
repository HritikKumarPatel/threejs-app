const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);
camera.position.set(0, 0, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// renderer.domElement.className = "my-canvas";
renderer.domElement.className = "my-canvas";



// Create a PLYLoader object
const loader = new THREE.PLYLoader();

// Load a PLY file
loader.load(
  '../brandenburg_gate.ply',
  function (geometry) {
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);

      // Center the mesh geometry
      geometry.center();

      // Set the position and scale of the mesh
      mesh.position.set(0, 0, 0); // Set the desired position
      const bbox = new THREE.Box3().setFromObject(mesh); // Get the bounding box of the mesh
      const size = new THREE.Vector3();
      bbox.getSize(size); // Get the size of the bounding box
      const maxDimension = Math.max(size.x, size.y, size.z); // Get the maximum dimension of the mesh
      const scale = 10 / maxDimension; // Scale the mesh to a maximum of 10 units
      mesh.scale.set(scale, scale, scale); // Set the scale

      // Add the mesh to the scene
      scene.add(mesh);
      renderer.render(scene, camera);
  },
  function (xhr) {
    // Called while loading is progressing
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // Called if there is an error loading the PLY file
    console.error('An error occurred while loading the PLY file', error);
  }
);



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();