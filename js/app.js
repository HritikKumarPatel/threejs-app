// check if WebXR is supported
if (navigator.xr) {
  navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
    if (supported) {
      // request an inline session first to avoid the Polyfill error
      navigator.xr.requestSession("inline").then((inlineSession) => {
        // create a new scene
        const scene = new THREE.Scene();

        // create a WebXR session
        navigator.xr.requestSession("immersive-vr").then((xrSession) => {
          // create a WebXR manager for the Three.js renderer
          const xrManager = new THREE.WebXRManager();

          // initialize the WebXR manager and renderer
          xrSession.updateRenderState({
            baseLayer: new XRWebGLLayer(xrSession, renderer.domElement),
          });
          xrSession
            .requestReferenceSpace("local-floor")
            .then((xrReferenceSpace) => {
              xrManager.setReferenceSpace(xrReferenceSpace);
              xrManager.setSession(xrSession);

              // create a camera
              const camera = new THREE.PerspectiveCamera();
              scene.add(camera);

              // create a directional light
              const light = new THREE.DirectionalLight(0xffffff, 1);
              scene.add(light);

              // load the GLTF model
              const loader = new THREE.GLTFLoader();
              loader.load(
                "model.gltf",
                (gltf) => {
                  // add the model to the scene
                  scene.add(gltf.scene);
                },
                (error) => {
                  console.log("Error loading GLTF model:", error);
                }
              );

              // animate the scene
              function animate() {
                xrManager.beginFrame();
                renderer.render(scene, camera);
                xrManager.endFrame();
                requestAnimationFrame(animate);
              }

              // start the WebXR session
              xrSession.requestAnimationFrame((time, xrFrame) => {
                xrManager.beginFrame(xrFrame);
                animate();
                xrManager.endFrame();
              });
            });
        });

        inlineSession.end();
      });
    } else {
      // handle the case where immersive-vr is not supported
      console.log("Immersive VR is not supported.");
    }
  });
} else {
  // handle the case where WebXR is not supported
  console.log("WebXR is not supported.");
}
