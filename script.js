// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Thank you, ${name}! Your message has been sent.\nEmail: ${email}\nMessage: ${message}`);
});

// 3D Model Rendering
document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-printer-container').appendChild(renderer.domElement);

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load OBJ file
    const loader = new THREE.OBJLoader();
    loader.load('models/EM3_Rev1-2.obj', (object) => {
        console.log('Model loaded successfully');
        scene.add(object);
        object.position.set(0, 0, 0);
        object.scale.set(1, 1, 1); // Adjust scale if needed

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            if (object) {
                object.rotation.y += 0.01; // Rotation speed
            }
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    camera.position.z = 10; // Adjust if necessary

    // Handle window resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
