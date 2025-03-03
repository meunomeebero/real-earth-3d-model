import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initial settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera configuration
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// Adding controls to allow drag and drop
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 15;

// Loading textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('/textures/earth_texture.jpg');
const rockTexture = textureLoader.load('/textures/rock_texture.jpg');

// Repeating the rock texture for better appearance
rockTexture.wrapS = THREE.RepeatWrapping;
rockTexture.wrapT = THREE.RepeatWrapping;
rockTexture.repeat.set(4, 2);

// Creating the flat Earth as a cylinder with thickness
const earthRadius = 2;
const earthThickness = 0.5; // Increasing thickness a bit
const earthSegments = 64;
const cylinderGeometry = new THREE.CylinderGeometry(
  earthRadius, // top radius
  earthRadius, // bottom radius (equal to maintain as cylinder)
  earthThickness, // height (thickness)
  earthSegments, // number of radial segments
  1, // number of height segments
  false // no open ends
);

// Creating a material for each face of the cylinder
const materials = [
  new THREE.MeshStandardMaterial({ 
    map: rockTexture,
    roughness: 0.8,
    metalness: 0.2,
    bumpMap: rockTexture,
    bumpScale: 0.05
  }), // side material
  new THREE.MeshStandardMaterial({ 
    map: earthTexture,
    roughness: 0.5,
    metalness: 0.1
  }), // top material
  new THREE.MeshStandardMaterial({ 
    roughness: 0.7,
    metalness: 0.0,
    color: 0xf4a460 // Base color for cookie
  }) // bottom material (will be updated with texture)
];

// Loading the cookie texture after materials are defined
const cookieTexture = textureLoader.load('/textures/cookie_texture.jpg', function(texture) {
  console.log('Cookie texture loaded successfully');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  
  // Updating the base material with the loaded texture
  materials[2].map = texture;
  materials[2].needsUpdate = true;
});

// Applying materials correctly
const earth = new THREE.Mesh(cylinderGeometry, materials);

// Rotating the cylinder so the top (Earth map) faces up
earth.rotation.x = Math.PI / 2;

// Adjusting position so the center is the center of the cylinder
earth.position.y = 0;

scene.add(earth);

// Adding an edge to highlight the disk shape at the top
const edgeGeometry = new THREE.CircleGeometry(earthRadius, earthSegments);
const edges = new THREE.EdgesGeometry(edgeGeometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
const earthTopEdge = new THREE.LineSegments(edges, edgeMaterial);
earthTopEdge.rotation.x = -Math.PI / 2;
earthTopEdge.position.y = earthThickness / 2;
scene.add(earthTopEdge);

// Adding an edge for the bottom part
const bottomEdge = new THREE.LineSegments(edges.clone(), edgeMaterial.clone());
bottomEdge.rotation.x = Math.PI / 2;
bottomEdge.position.y = -earthThickness / 2;
scene.add(bottomEdge);

// Adding stars in the background
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
  starPositions[i] = (Math.random() - 0.5) * 100;
  starPositions[i + 1] = (Math.random() - 0.5) * 100;
  starPositions[i + 2] = (Math.random() - 0.5) * 100;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Adding ambient lighting to improve visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// Directional light to simulate the sun
const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

// Adding a second light to illuminate the bottom part
const bottomLight = new THREE.DirectionalLight(0xffffff, 0.9); // more intense white light
bottomLight.position.set(-3, -5, 2);
scene.add(bottomLight);

// Adding text to indicate that the bottom part is cookie
const infoElement = document.getElementById('info');
infoElement.innerHTML = `
  <h1>Real Earth 3D Visualization</h1>
  <p>Click and drag to move the planet model</p>
  <p><strong>Top layer:</strong> Earth Map | <strong>Bottom layer:</strong> Cookie!</p>
`;

// Function to resize the screen if the window changes size
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(newWidth, newHeight);
});

// Animation function
function animate() {
  requestAnimationFrame(animate);
  
  // Update controls
  controls.update();
  
  // Render the scene
  renderer.render(scene, camera);
}

animate();

// After creating the Earth, let's check if the materials are correct
console.log('Base material:', materials[2]);
console.log('Base texture:', materials[2].map); 