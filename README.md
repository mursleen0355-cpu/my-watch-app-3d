# Interactive 3D Watch Showcase

An interactive and responsive 3D product showcase built to present a rugged digital watch directly in the browser. Visitors can rotate, zoom, and inspect the Draco-compressed watch model across desktop and mobile devices.

## Live Demo

[View the live website](https://my-watch-app-3d.vercel.app)

## Features

- Interactive 3D watch model
- Drag-to-rotate controls
- Scroll and pinch-to-zoom controls
- Responsive desktop and mobile layout
- Loading spinner with percentage and progress bar
- Optimized Draco-compressed GLB model
- Sticky navigation with Home, About, and Contact sections
- Deployed automatically through GitHub and Vercel

## Tech Stack

### React

React provides the component-based structure for the navigation, hero, 3D viewer, About section, Contact section, and loading interface.

### Three.js

Three.js provides the underlying WebGL rendering system used to display lighting, materials, cameras, and the 3D watch model in the browser.

### React Three Fiber

React Three Fiber integrates Three.js with React, making it possible to build and control the 3D scene using reusable React components.

### Drei

Drei provides useful React Three Fiber helpers including `useGLTF`, `OrbitControls`, `Environment`, `Html`, and `useProgress`.

### Vite

Vite provides a fast development server and an optimized production-build workflow for the React application.

### Vercel

Vercel hosts the production website and automatically deploys new versions whenever changes are pushed to the GitHub `main` branch.

## Model Optimization

The original GLB watch model was compressed using Draco compression with `@gltf-transform/cli`.

| Version | File size |
|---|---:|
| Original model | 27.83 MB |
| Draco-compressed model | 2.58 MB |
| Size reduction | 90.7% |

The optimized model significantly reduces download time while retaining the original model’s appearance, materials, textures, and interactive functionality.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/mursleen0355-cpu/my-watch-app-3d.git


3D Model Credit
“MODEL_NAME” by AUTHOR_NAME, licensed under LICENSE_TYPE.
Original model: Sketchfab
Deployment
The project is deployed on Vercel:
https://my-watch-app-3d.vercel.app
Author
Developed by Mursleen Ul-Haq.

## 3D Model Credit

The 3D watch model is by [graphiccompressor](https://sketchfab.com/tityus) and is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](http://creativecommons.org/licenses/by/4.0/).



“EXACT MODEL NAME” by [graphiccompressor](https://sketchfab.com/tityus), licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/). Original model: [Sketchfab](EXACT_MODEL_URL).

Model Information:
* title:        Chronograph Watch Mudmaster
* source:       https://sketchfab.com/3d-models/chronograph-watch-mudmaster-80c3959e74744356b60bf44e1bbbcaeb
* author:       graphiccompressor (https://sketchfab.com/tityus)

Model License:
* license type: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
* requirements: Author must be credited. Commercial use is allowed.

"Chronograph Watch Mudmaster" (https://sketchfab.com/3d-models/chronograph-watch-mudmaster-80c3959e74744356b60bf44e1bbbcaeb) by graphiccompressor (https://sketchfab.com/tityus) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
