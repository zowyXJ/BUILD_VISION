function openModelViewer(modelUrl) {
    const modal = new bootstrap.Modal(document.getElementById('modelViewerModal'));
    modal.show();
    loadModel(modelUrl);
}

function loadModel(modelUrl) {
    const viewer = document.getElementById('viewer');
    viewer.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(viewer.clientWidth, 500);
    viewer.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load(modelUrl, function (gltf) {
        scene.add(gltf.scene);
        camera.position.set(0, 1, 3);
        animate(scene, camera, renderer);
    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });
}

function animate(scene, camera, renderer) {
    requestAnimationFrame(() => animate(scene, camera, renderer));
    renderer.render(scene, camera);
}
