// Three.js Scene Setup and Animation
let scene, camera, renderer, dataOrb, starField, animationId;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

// Scene configuration
const sceneConfig = {
    orbSize: 1.5,
    orbDetail: 64,
    starCount: 1500,
    rotationSpeed: 0.005,
    mouseInfluence: 0.0002,
    scrollInfluence: 0.1
};

// Initialize the Three.js scene
function initScene(canvas) {
    if (!canvas) return;
    
    setupScene(canvas);
    createDataOrb();
    createStarField();
    setupLights();
    setupEventListeners();
    startAnimationLoop();
}

// Setup basic scene, camera, and renderer
function setupScene(canvas) {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);
    
    camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: window.devicePixelRatio === 1
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
}

// Create the main data visualization orb
function createDataOrb() {
    const geometry = new THREE.TorusKnotGeometry(
        sceneConfig.orbSize,
        0.3,
        sceneConfig.orbDetail,
        16,
        2,
        3
    );
    
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0080,
        emissive: 0x220011,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    dataOrb = new THREE.Mesh(geometry, material);
    dataOrb.position.set(2, 0, 0);
    scene.add(dataOrb);
    
    // Add wireframe overlay for tech aesthetic
    const wireframeGeometry = geometry.clone();
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    wireframe.position.copy(dataOrb.position);
    scene.add(wireframe);
    
    // Store wireframe reference for animation
    dataOrb.wireframe = wireframe;
}

// Create animated star field background
function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = sceneConfig.starCount;
    
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    const colorPalette = [
        new THREE.Color(0xff0080), // Pink
        new THREE.Color(0x00ffff), // Cyan
        new THREE.Color(0x0080ff), // Blue
        new THREE.Color(0xffffff)  // White
    ];
    
    for (let i = 0; i < starCount; i++) {
        // Random position in sphere
        const radius = Math.random() * 25 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Random size
        sizes[i] = Math.random() * 3 + 1;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        size: 2,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    
    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

// Setup scene lighting
function setupLights() {
    const hemisphereLight = new THREE.HemisphereLight(0x0080ff, 0xff0080, 0.6);
    scene.add(hemisphereLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const backLight = new THREE.PointLight(0xff0080, 0.5, 100);
    backLight.position.set(-10, -10, -5);
    scene.add(backLight);
}

// Setup event listeners for interactions
function setupEventListeners() {
    const canvas = renderer.domElement;
    
    // Mouse movement
    function onMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        targetRotationX = mouseY * sceneConfig.mouseInfluence;
        targetRotationY = mouseX * sceneConfig.mouseInfluence;
    }
    
    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    
    // Touch support for mobile
    canvas.addEventListener('touchmove', function(event) {
        if (event.touches.length === 1) {
            onMouseMove(event.touches[0]);
        }
    }, { passive: true });
}

// Animation loop
function startAnimationLoop() {
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        if (dataOrb) {
            // Base rotation
            dataOrb.rotation.x += sceneConfig.rotationSpeed;
            dataOrb.rotation.y += sceneConfig.rotationSpeed * 0.7;
            dataOrb.rotation.z += sceneConfig.rotationSpeed * 0.3;
            
            // Mouse interaction
            dataOrb.rotation.x += (targetRotationX - dataOrb.rotation.x) * 0.05;
            dataOrb.rotation.y += (targetRotationY - dataOrb.rotation.y) * 0.05;
            
            // Sync wireframe
            if (dataOrb.wireframe) {
                dataOrb.wireframe.rotation.copy(dataOrb.rotation);
            }
        }
        
        if (starField) {
            starField.rotation.y += sceneConfig.rotationSpeed * 0.2;
            starField.rotation.x += sceneConfig.rotationSpeed * 0.1;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Handle window resize
function handleSceneResize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Handle scroll parallax
function handleSceneScroll(scrollPercent) {
    if (camera) {
        camera.position.z = 5 + scrollPercent * sceneConfig.scrollInfluence;
    }
}

// Cleanup function
function destroyScene() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Handle visibility change for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        startAnimationLoop();
    }
});

// Export functions for external use
window.initScene = initScene;
window.handleSceneResize = handleSceneResize;
window.handleSceneScroll = handleSceneScroll;
window.destroyScene = destroyScene;