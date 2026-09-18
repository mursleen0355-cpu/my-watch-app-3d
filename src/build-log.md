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

### AI Prompt Log

1. Prompt: "Find a 3D model on Sketchfab... watch is my product"
   → Got model suggestions with license info. Worked.

2. Prompt: "on the website that model show and it contain 6 error solve it"
   → Uploaded validator JSON. Root cause: missing textures/ folder next to scene.gltf.
   → Worked after re-copying the textures folder.

3. Prompt: "what i do next... how to install and used it"
   → Got full Vite + R3F setup walkthrough. Worked.

4. Prompt: pasted GLTFLoader JSON parse error + screenshot
   → Root cause: folder was misspelled "modle" instead of "models". 
   → Fixed by renaming folder. Worked.

5. Prompt: "my product is slow on the local host"
   → Diagnosed likely cause as texture size + dev-mode overhead.
   → Tested npm run build + npm run preview — confirmed model loads with full textures.

6. Prompt: shared screenshot, watch was oversized/cropped, canvas not full-screen
   → Fixed with CSS full-screen sizing, scale=0.05, camera position [0,0,8]. Worked.


   Day 2 Report

   # Day 2 Progress Report — 3D Watch Web App
**Date:** September 15, 2026
**Project:** my-watch-app (React Three Fiber + Three.js + Vite)

---

## Summary
Day 2 goals are fully complete. The app now has a working, interactive 3D watch viewer embedded in a real multi-section page, with navigation, correct lighting/framing, and mouse-based rotate/zoom/pan controls.

---

## What Was Completed Today

### 1. Model File Cleanup
- Replaced the earlier `.gltf` + `.bin` + `textures/` setup with a single **`watch.glb`** file.
- Placed it correctly at `public/models/watch.glb` — no folder-name typos this time (fixed the earlier `modle` vs `models` issue from Day 1).

### 2. Component Structure
- Rebuilt **`Watch.jsx`** to load the GLB via `useGLTF('/models/watch.glb')`, rendering it through `<primitive object={scene} />`.
- Created **`Scene.jsx`** containing:
  - A `Model` component (wraps the GLTF loading logic)
  - A `Scene` component wrapping everything in a `<Canvas>`, with:
    - `ambientLight` (intensity 1.5) for soft, even light
    - `directionalLight` (position `[5,5,5]`, intensity 2) for realistic shading
    - `OrbitControls` with `enableRotate`, `enableZoom`, `enablePan` all explicitly turned on

### 3. Camera & Framing
- Set camera `position={[0, 1, 8]}`, `fov={50}`.
- Tuned model `scale={0.1}` and `position={[0, -0.5, 0]}` so the watch sits centered and fully visible in frame.

### 4. Full Page Layout
- Built out `App.jsx` with three real sections:
  - **Hero** — title ("Explore the Watch"), tagline, and the live 3D viewer
  - **About** — placeholder copy describing the object (ready for real content)
  - **Contact/CTA** — "Want to know more?" heading + Contact Me button
- Added a **site header with nav links** (Home / About / Contact) using anchor links (`#home`, `#about`, `#contact`) — confirmed working by clicking through and watching the URL/scroll update correctly.

### 5. Styling & Polish (beyond the base requirement)
- Full-screen CSS reset (`html`, `body`, `#root` sized to 100%).
- Hover and `:focus-visible` states on nav links and buttons for accessibility.
- Responsive `@media (max-width: 600px)` breakpoint for smaller screens.
- `@media (prefers-reduced-motion: reduce)` support — respects users' OS-level motion settings.

### 6. Verification
- Ran the app on `localhost:5173` and confirmed:
  - Watch model loads with full color/textures, no console errors
  - Rotating by dragging works smoothly (confirmed visually across multiple angles)
  - Navigation links jump to the correct sections

---

## Outstanding / Housekeeping Items
- **Leftover file:** `src/Watch.jsx` exists twice — once as a real `.jsx` component, once as a stray `.txt`-type "Text Document." Safe to delete the duplicate.
- **build-log.md:** Needs the Step 2 prompt (verbatim) and today's fixes logged, if not already added.
- **Model credit mismatch:** Confirm the actual model in use (G-Shock Mudmaster-style watch) has its correct name, author, license type, and URL recorded — the original Day 1 notes referenced a different model ("Citizen watch"), which no longer matches what's in `public/models/`.

---

## Day 2 Checklist — Final Status

| # | Task | Status |
|---|------|--------|
| 1 | Move model into project | ✅ Complete |
| 2 | Ask AI for starting component | ✅ Complete |
| 3 | Create Scene component | ✅ Complete |
| 4 | Import and render Scene in App | ✅ Complete |
| 5 | Run it and diagnose | ✅ Complete |
| 6 | Adjust camera and lighting | ✅ Complete |
| 7 | Build page layout | ✅ Complete |
| 8 | Add navigation links | ✅ Complete |

**Day 2: Fully Complete ✅** 



Prompts

Day 2 — AI Prompts Cheat Sheet
Copy-paste these into your AI assistant (Claude/ChatGPT) as you go through each step. After each response, paste a one-line outcome note into build-log.md (worked / didn't work / had to fix X).
________________________________________
Step 1 — Move model into project
"I downloaded a .glb 3D model file from Sketchfab for my watch product viewer. Walk me through exactly where to place it in a Vite + React project (folder structure), and how I should name the file so it's easy to reference in code. My project is called my-watch-app."
________________________________________
Step 2 — Ask for a starting component
"I'm using React Three Fiber and @react-three/drei. Show me a minimal component that loads a GLB model from /models/watch.glb using useGLTF, puts it in a Canvas, and adds OrbitControls so I can rotate/zoom/pan with the mouse."
(This is the exact prompt Day 2 asks you to log — paste it and the response summary into build-log.md as-is.)
________________________________________
Step 3 — Create the Scene component
"Create a src/Scene.jsx file for my React Three Fiber project with two components: (1) a Model component that calls useGLTF('/models/watch.glb') and renders <primitive object={scene} />, and (2) a Scene component that wraps Model in a Canvas with a camera position, ambient light, directional light, and OrbitControls. Keep it simple and well-commented so I can tweak values myself."
________________________________________
Step 4 — Import and render Scene in App
"Show me how to import and render my Scene component inside App.jsx so it fills the page when I run npm run dev. Also show the minimal CSS needed on html, body, and #root so the canvas takes up the full screen with no scrollbars or gray margins."
________________________________________
Step 5 — Run it and diagnose issues
"When I run my React Three Fiber app, [describe exactly what you see — e.g. 'nothing appears and the console shows this error: PASTE ERROR HERE' or 'the model appears but it's tiny and off to one side']. Here's my Scene.jsx code: [paste your code]. What's wrong and how do I fix it?"
(Always paste the exact console error text or a screenshot — don't just say "it doesn't work.")
________________________________________
Step 6 — Adjust camera and lighting
"My watch model in React Three Fiber currently looks [too big / too small / poorly lit / facing the wrong way]. Current camera position is [x, y, z], scale is X, and I'm using [ambient + directional lights / Environment preset]. Suggest specific values to try to center the model nicely in frame with realistic lighting on its metal and glass surfaces, and explain why each value helps."
________________________________________
Step 7 — Build the page layout
"Help me build a simple multi-section page around my React Three Fiber canvas using plain HTML/CSS (no extra libraries). I need: (1) a hero section with a title, a short tagline, and the 3D canvas full-width, (2) an 'About this object' section with placeholder text I can edit, and (3) a contact/CTA section with a button. Keep the styling clean and minimal — this isn't the main focus of my project, just functional and presentable."
________________________________________
Step 8 — Add navigation anchor links (optional)
Add simple anchor-link navigation to my page — e.g. <a href='#about'>About</a> — so users can jump between the hero, about, and contact sections I just built. Make sure clicking the links scrolls smoothly instead of jumping instantly.
________________________________________
Tip for logging in build-log.md
For each step, paste the prompt above, then add one line like:
Step 5 prompt → console showed "path not found" error →
fixed by correcting file path casing. Worked.

