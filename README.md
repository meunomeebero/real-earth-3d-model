# Flat Earth 3D Visualization

This project consists of an interactive 3D visualization of planet Earth represented as a disc with thickness (flat Earth model) in outer space.

## Features

- 3D visualization of planet Earth as a disc with thickness
- World map texture on the upper face of the disc
- Rocky texture on the sides of the disc
- **Cookie texture on the bottom face**, representing the lower layer of the flat Earth
- Interaction with the model using drag and drop
- Rotation and zoom for detailed analysis of different parts of the model
- Background with stars to simulate outer space
- Lighting to enhance model visualization

## Technologies Used

- Three.js for 3D rendering
- Modern JavaScript (ES6+)
- Vite as a development tool

## How to Run the Project

1. Make sure you have Node.js installed on your computer
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser at the indicated address (usually http://localhost:5173)

## How to Interact with the Model

- **Rotation**: Click and drag with the mouse to rotate the Earth model
- **Zoom**: Use the mouse scroll to zoom in or out
- **Pan**: Right-click and drag to move the camera laterally

## Technical Details

The project uses:
- `CylinderGeometry` from Three.js to create the disc with thickness
- Multiple materials to apply different textures to the cylinder faces:
  - World map texture for the upper face
  - Rocky texture for the sides
  - Cookie texture for the bottom face
- Luminous edges to highlight the disc contours
- OrbitControls to facilitate user interaction
- Particle system to create the effect of stars in the background
- Directional and ambient lighting to improve visualization

## License

MIT 