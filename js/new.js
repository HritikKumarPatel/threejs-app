// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a light source and add it to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// Create the MTLLoader and OBJLoader instances
const mtlLoader = new THREE.MTLLoader();
const objLoader = new THREE.OBJLoader();
// const textureLoader = new THREE.TextureLoader();

// // Load the textures
// const roofTexture = textureLoader.load('../BrandenburgGate/BronzeRoof1.jpg');
// const wallTexture = textureLoader.load('../BrandenburgGate/DarkerWall1.jpg');

// // Create the materials
// const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });
// const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

// Load the .mtl file
mtlLoader.load('../BrandenburgGate/BrandenburgGate.mtl', (materials) => {
  // Preload the materials
  materials.preload();

  // Set the materials for the OBJLoader
  objLoader.setMaterials(materials);

  // Load the .obj file
  objLoader.load('../BrandenburgGate/BrandenburgGate.obj', (object) => {
    // Apply the materials to the object's geometry
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === 'roof') {
          child.material = roofMaterial;
        } else if (child.name === 'walls') {
          child.material = wallMaterial;
        }
      }
    });

    // Position the object in the scene
    object.position.set(0, 0, 0);

    // Add the object to the scene
    scene.add(object);

    // Animate the scene
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the object
    //   object.rotation.x += 0.01;
    //   object.rotation.y += 0.01;
        controls.update()
      // Render the scene
      renderer.render(scene, camera);
    };

    animate();
  });
});

// Position the camera and update its projection matrix
camera.position.z = 3;
camera.updateProjectionMatrix();
