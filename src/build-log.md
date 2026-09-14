# 3D Watch App — Build Log

## Day 1 — September 14, 2026

### Project Setup

* Created a React/Vite project named `my-watch-app`.
* Installed Three.js.
* Installed React Three Fiber.
* Installed Drei.

### 3D Model

* Added the 3D watch model to `public/models/`.
* Added `scene.gltf`.
* Added `scene.bin`.
* Added the model texture.
* Fixed the model folder/path so the application can load the GLTF model.

### Watch Component

* Created `src/Watch.jsx`.
* Loaded the model using `useGLTF`.
* Added model scaling and positioning.
* Current watch scale: `0.05`.
* Current watch position: `[0, -0.5, 0]`.

### Camera

* Adjusted the Three.js camera to give the watch more space in the frame.
* Current camera position: `[0, 0, 8]`.
* Current camera FOV: `50`.

### Controls

* Added `OrbitControls`.
* The watch can be rotated by clicking and dragging.
* Mouse wheel can be used for zooming.

### Canvas / Layout

* Set the Canvas to full-screen width and height.
* Removed layout constraints that could create unwanted empty/gray areas.
* Added full-screen sizing for `html`, `body`, and `#root`.

### Troubleshooting

* Investigated model loading and possible texture 404 errors.
* Checked the project directory because npm commands were initially being run outside the project folder.
* Tested Canvas sizing and camera positioning.
* Reduced the watch scale because the model appeared too large.

## Day 1 Outcome

The React 3D watch application is running with:

* Three.js
* React Three Fiber
* Drei
* GLTF 3D watch model
* Adjustable camera
* OrbitControls
* Full-screen Canvas

## Next Steps

* Improve the watch presentation.
* Add better lighting/materials.
* Add UI controls.
* Continue testing performance.
* Commit and push future progress to GitHub.
