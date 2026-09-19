# Interactive 3D Watch Showcase — Build Log

**Developer:** Mursleen Ul-Haq  
**Project:** 3D Watch Product Viewer  
*Tech stack:** React, Three.js, React Three Fiber, Drei, Vite, GitHub, Vercel 
**Development period:** 7-day technical take-home assignment  
**Primary AI assistant:** Notion AI  
**Live website:** https://my-watch-app-3d.vercel.app  
**GitHub repository:** https://github.com/mursleen0355-cpu/my-watch-app-3d

## 1. Project objective

The goal was to design, build, optimize, and publicly deploy a responsive website whose centerpiece is a real-time interactive 3D watch. The finished MVP needed a licensed 3D model, mouse and touch controls, a multi-section layout, responsive behavior, a visible loading state, reasonable performance, public source control, and live hosting.

This log records the prompts I used, what the AI suggested, what I actually changed, errors encountered, and the final outcome. Suggestions were not treated as automatically correct: I tested them with browser recordings, exact error messages, production builds, PowerShell output, Chrome DevTools, and a real mobile-data connection.

## 2. Final outcome at a glance

| Area | Final result |
|---|---|
| 3D stack | React, Three.js, React Three Fiber, Drei, Vite |
| Model delivery | Draco-compressed GLB loaded with `useGLTF` |
| Interaction | Orbit rotation and zoom on mouse and touch |
| Loading UX | Spinner, percentage, progress bar, and asset count |
| Original model size | 27.83 MB |
| Compressed model size | 2.58 MB |
| Reduction | 90.7% |
| Responsive QA | Chrome device mode plus real Android phone |
| Deployment | GitHub and Vercel |
| Mobile network QA | Real 4G test, approximately 10 seconds through the visible loading sequence |
| Asset license | CC BY 4.0; model by `graphiccompressor` |

---

# Day 1 — Discovery, asset sourcing, and initial setup

## Goals

- Choose a product-viewer concept and a suitable web-3D stack.
- Source a downloadable watch model with a clear license.
- Create the Vite project and load the first model.
- Diagnose asset-path, texture, and framing problems.



## Day 1 — Foundation and initial 3D scene

### Work completed

- Created the Vite and React project structure.
- Added React Three Fiber and Drei.
- Loaded `watch.glb` with `useGLTF`.
- Displayed the model inside a React Three Fiber `Canvas`.
- Added `OrbitControls` for rotation and zoom.
- Created Home, About, and Contact sections with anchor navigation.

### Prompt 1 — Initial framing and lighting

> “My watch model in React Three Fiber currently looks slightly off-center / the metal does not look reflective enough. Suggest specific adjustments to camera position, light intensity/type, and scale so it looks polished and well-framed the moment the page loads, without needing the user to rotate it first.”

### AI response

The AI recommended lowering ambient light, adding directional and spot lights, using a studio environment, moving the camera farther back, narrowing the field of view, centering the `OrbitControls` target, and adjusting model scale and rotation.

### What I did

I used the recommendations as a starting point rather than copying every value permanently. I tested camera, scale, rotation, and light values using screen recordings and repeatedly adjusted them until the front view was clear.

### Result

The watch loaded with a more intentional three-quarter angle, clearer gold reflections, and smoother OrbitControls behavior. The final scene used controlled ambient, directional, spot, and environment lighting.

### Lesson

Camera framing and model scale must be tuned together. Increasing the model scale alone can make it look impressive but may crop the strap on smaller screens.



## Prompt 1 — Find a suitable watch model

> “Find a 3D model on Sketchfab… watch is my product.”

### AI response

The AI suggested downloadable watch models and reminded me to record the model name, author, license, and source URL.

### Action and result

I selected a watch asset by `graphiccompressor` from Sketchfab and retained the CC BY 4.0 license information. The source license file was kept when obsolete model files were later removed.

**Status:** Worked.

## Prompt 2 — Repair validation errors

> “On the website that model show and it contain 6 error solve it.”

### Evidence and diagnosis

I shared validator output for the downloaded `scene.gltf` package. The model depended on `scene.bin` and a `textures/` directory using relative paths.

### Solution

I copied the complete asset structure together:

```text
public/
└── models/
    ├── scene.gltf
    ├── scene.bin
    └── textures/
```

The errors were caused by missing referenced resources rather than React Three Fiber itself.

**Status:** Worked after restoring the missing texture folder.

## Prompt 3 — Set up Vite and React Three Fiber

> “What I do next… how to install and use it?”

### AI response

The AI proposed creating a Vite React project and installing the 3D dependencies:

```powershell
npm create vite@latest my-watch-app -- --template react
cd my-watch-app
npm install
npm install three @react-three/fiber @react-three/drei
npm run dev
```

### Action and result

I created the project, installed Three.js, React Three Fiber, and Drei, then started the local development server at `http://localhost:5173`.

**Status:** Worked.

## Prompt 4 — Fix the GLTFLoader JSON parsing error

> I pasted the GLTFLoader JSON parse error and a screenshot.

### Diagnosis

The code requested:

```js
useGLTF('/models/scene.gltf')
```

but the actual folder was misspelled as `modle`. Vite therefore returned the application HTML instead of the glTF JSON, which caused GLTFLoader to fail while parsing.

### Solution

I renamed:

```text
public/modle
```

to:

```text
public/models
```

I also tested the asset URL directly:

```text
http://localhost:5173/models/scene.gltf
```

and confirmed that it returned glTF JSON instead of the React HTML page.

**Status:** Worked after correcting the directory name and matching the path exactly.

## Prompt 5 — Investigate slow local performance

> “My product is slow on the local host.”

### AI response

The AI suggested checking texture dimensions, comparing development mode with a production preview, reviewing the environment map, and using Chrome DevTools Network and Performance panels.

### Action and result

I compared:

```powershell
npm run dev
```

with:

```powershell
npm run build
npm run preview
```

The production preview removed some development overhead, but the asset itself still needed optimization later in the project.

**Status:** Partly worked; the test clarified the problem, but Draco compression on Day 4 produced the major improvement.

## Prompt 6 — Fix oversized/cropped model and Canvas sizing

> I shared a screenshot showing an oversized/cropped watch and a Canvas that did not fill its intended area.

### AI response

The initial recommendation was to give `html`, `body`, and `#root` explicit dimensions, make the Canvas parent fill the available area, reduce model scale, and move the camera farther back.

### Action and result

I tested smaller model scales and camera distances. Early working values included a much smaller scale and camera position around `[0, 0, 8]`. These values were later retuned for the replacement GLB.

**Status:** Worked as an initial correction.

## Day 1 reflection

The main lesson was that most early “3D rendering” failures were actually asset-pipeline problems: missing texture dependencies, a misspelled folder, inconsistent paths, model scale, and Canvas sizing. Testing the asset URL directly was faster than repeatedly changing React code.

---

## Day 2 — Layout and responsive design

### Work completed

- Added a sticky navigation header.
- Improved hero typography and spacing.
- Added responsive sections for About and Contact.
- Added a light radial gradient behind the Canvas.
- Tested narrow widths around 320–480 px.
- Increased mobile navigation tap targets.

### Prompt 2 — Mobile responsiveness review

> “Review my App.jsx and App.css for responsiveness issues at narrow widths around 320–480 px — things like text overflowing, the 3D Canvas becoming too small or cut off, navigation wrapping badly, or buttons becoming hard to tap. Suggest minimal CSS fixes, keeping my existing design intact.”

### AI response

The AI suggested mobile heading clamps, a responsive Canvas height using `clamp()` and `svh`, 44 px navigation tap targets, smaller gaps around 320 px, defensive overflow rules, and clearer parent-container sizing.

### What I did

I modified the suggested CSS to preserve the existing visual style. I used Chrome’s responsive device toolbar and later tested the live site on a real phone.

### Result

The navigation remained on one line, the hero title wrapped cleanly, the About and Contact sections stacked correctly, and the Canvas resized with its parent container.

### Lesson

The Canvas itself follows its parent. Responsive behavior depended on giving `.viewer` and `.watch-stage` explicit width and height rules.



# Day 2 — GLB integration, reusable components, and page structure

## Goals

- Move from the multi-file glTF package to a simpler GLB workflow.
- Create reusable `Watch.jsx` and `Scene.jsx` components.
- Add camera, lights, `Suspense`, `Environment`, and `OrbitControls`.
- Build the website sections and navigation.

## Prompt 1 — Place the GLB in the project

> “I downloaded a .glb 3D model file from Sketchfab for my watch product viewer. Walk me through exactly where to place it in a Vite + React project and how I should name the file.”

### Solution used

I placed the model at:

```text
public/models/watch.glb
```

Files inside `public/` are served from the root, so the browser path became:

```text
/models/watch.glb
```

**Status:** Worked.

## Prompt 2 — Create the minimal model component

> “I’m using React Three Fiber and @react-three/drei. Show me a minimal component that loads a GLB model from /models/watch.glb using useGLTF, puts it in a Canvas, and adds OrbitControls.”

### Solution used

The model component used `useGLTF`, rendered the loaded scene with `<primitive>`, and preloaded the asset:

```jsx
import { useGLTF } from '@react-three/drei'

export default function Watch(props) {
  const { scene } = useGLTF('/models/watch.glb')

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/watch.glb')
```

**Status:** Worked and became the basis of the final `Watch.jsx`.

## Prompt 3 — Create `Scene.jsx`

> “Create a src/Scene.jsx file with a Model component using useGLTF and a Scene component with Canvas, camera, ambient light, directional light, and OrbitControls. Keep it simple and well-commented.”

### Action and result

I separated responsibilities:

- `Watch.jsx` loads and renders the GLB.
- `Scene.jsx` owns the Canvas, camera, lighting, environment, controls, and later the loading overlay.
- `App.jsx` owns the website structure.

This was cleaner than keeping all Three.js code in `App.jsx`.

**Status:** Worked with later refinements.

## Prompt 4 — Build the surrounding website

> “Help me build a simple multi-section page around my React Three Fiber canvas using plain HTML/CSS. I need a hero, an About section, and a contact/CTA section.”

### Action and result

I created:

- A sticky header with Home, About, and Contact links.
- A hero section with the title “Explore the Watch”.
- A full-width viewer containing the 3D scene.
- An About section describing the rugged digital watch.
- A Contact section with a mail link.

**Status:** Worked.

## Prompt 5 — Add anchor navigation

> “Add simple anchor-link navigation… Make sure clicking the links scrolls smoothly instead of jumping instantly.”

### Solution used

I matched navigation `href` values to section IDs and added smooth scrolling plus `scroll-margin-top` so the sticky header did not cover section headings.

**Status:** Worked.

## Day 2 reflection

Separating model loading, scene configuration, and page layout made later debugging easier. It also meant camera and lighting changes could be made without rewriting the surrounding website.

---

## Day 3 — First-time visitor review and visual polish

### Work completed

- Reviewed the site through multiple screen recordings.
- Improved first-load composition and reduced empty space.
- Added the interaction message: “Drag to rotate · Scroll to zoom”.
- Checked the full flow from Home to About and Contact.
- Replaced placeholder contact information.
- Confirmed desktop and mobile presentation.

### Prompt 3 — Fresh visitor critique

> “Pretend you are a first-time visitor with no context. What is confusing, unfinished-looking, or rough about the experience? Give me a prioritized list of the top 3–5 things worth fixing before final polish.”

### AI response

The AI prioritized first-load framing, clearer interaction guidance, stronger canvas composition, more specific product copy, and one meaningful extra interaction such as color variants or reset view.

### What I did

I accepted the framing and interaction-guidance recommendations. I kept the page intentionally simple and did not add every optional feature before deployment.

### Result

The watch became the clear focal point, the page communicated that the model was interactive, and the overall visual hierarchy became more consistent.

### Partly completed item

Color-variant controls were explored but were not required for the final deployed version. I prioritized loading performance, responsive behavior, and deployment instead.



# Day 3 — Visual polish, responsive behavior, and scope decisions

## Goals

- Improve first-load framing and material appearance.
- Finalize page copy and navigation.
- Test widths around 320–480 px.
- Review the experience as a first-time visitor.
- Explore color variants without risking the core MVP.

## Prompt 1 — Fine-tune camera and lighting

> “My watch model in React Three Fiber currently looks slightly off-center or the metal doesn’t look reflective enough. Suggest specific adjustments to camera position, light intensity/type, and scale so it looks polished and well-framed the moment the page loads.”

### AI response

The AI suggested:

- A narrower field of view for a product-camera look.
- A camera farther from the model.
- Low ambient light to preserve contrast.
- Directional key and fill lights.
- A spot/rim light.
- `<Environment preset="studio" />` for reflections.
- A subtle three-quarter model rotation.

### Action and result

I tested multiple values rather than treating the first numbers as final. The deployed version used a camera near `[0, 0.15, 5.8]`, `fov={28}`, controlled ambient/directional/spot lighting, a studio environment, model scale near `0.24`, and a subtle initial rotation.

**Status:** Worked after iterative adjustment.

## Prompt 2 — Responsive review

> “Review my App.jsx and App.css for responsiveness issues at narrow widths around 320–480px… Suggest minimal CSS fixes, keeping my existing design intact.”

### Changes applied

- Used responsive `clamp()` values for headings and viewer height.
- Used `svh` to account for mobile browser chrome.
- Added 44 px navigation tap targets.
- Reduced mobile header spacing.
- Prevented navigation wrapping.
- Ensured `.viewer`, `.watch-stage`, and Canvas had explicit width/height relationships.
- Added defensive overflow handling.

### Result

The header remained usable, hero text wrapped cleanly, the About and Contact sections stacked correctly, and the Canvas resized with its parent.

**Status:** Worked in Chrome device mode and later on a real phone.

## Prompt 3 — Explore color variants

> “I want to add 2–3 color variant buttons that change the watch’s main body material color. First tell me how to inspect the model’s material names, then show me how to change only the target material without breaking textures.”

### AI response

The AI suggested traversing meshes, logging material names, cloning only the target material, and changing `material.color` rather than replacing the full material.

### Decision

I explored the approach but did not make color variants part of the final deployed MVP. The model’s existing material structure required additional investigation, and the assignment prioritized one reliable 3D interaction over extra unfinished features.

**Status:** Explored, then deliberately skipped to control scope.

## Prompt 4 — First-time visitor review

> “Pretend you’re a first-time visitor with no context. What’s confusing, unfinished-looking, or rough about the experience? Give me a prioritized list of the top 3–5 things worth fixing before final polish.”

### Findings and fixes

1. The model needed stronger first-load framing.
2. Visitors needed an interaction hint.
3. The light-gray viewer needed better visual balance.
4. Placeholder copy and contact information needed replacement.
5. Loading feedback was still missing.

I added “Drag to rotate · Scroll to zoom”, refined the layout and model framing, improved copy, and carried the loading-state task into Day 4.

**Status:** Worked and produced a clear priority list.

## Day 3 reflection

The most valuable decision was to protect the core experience. I skipped optional variants and concentrated on framing, controls, responsive layout, navigation, and clear interaction guidance.

---

## Day 4 — Loading feedback and model optimization

### Work completed

- Added `Suspense` around the GLB model and environment.
- Added a Drei `useProgress` loading overlay.
- Displayed a spinner, percentage, progress bar, and asset count.
- Tested loading with Chrome DevTools network throttling.
- Backed up the original model outside the project.
- Compressed the GLB using Draco through `@gltf-transform/cli`.
- Re-tested materials, textures, lighting, rotation, and zoom.

### Prompt 4 — Loading progress

> “How do I show a loading spinner with percentage while my GLTF model loads in React Three Fiber, using useProgress from drei?”

### AI response

The AI provided an outside-Canvas loading overlay using `useProgress`, plus CSS for the spinner and progress bar. It also explained how to test with Disable Cache and network throttling.

### What I did

I added the loader and tested it with throttling. The progress moved through values such as 0%, 33%, and 83%, reflecting completed assets rather than downloaded bytes.

### Error — CSS pasted into `Scene.jsx`

The first attempt failed with:

```text
[plugin:vite:oxc] Transform failed
[PARSE_ERROR] Unexpected token
src/Scene.jsx:117
.watch-stage {
```

I recognized that CSS had been pasted into the JavaScript file. I removed the CSS from `Scene.jsx`, placed it in `App.css`, saved both files, and restarted the development server. The loader then worked correctly.

### Prompt 5 — Draco compression

> “I have a GLB 3D model at public/models/watch.glb that I want to compress using Draco compression. I do not have Blender installed. Walk me through installing and running the @gltf-transform/cli tool via npx.”

### Command used

```powershell
npx @gltf-transform/cli@latest draco "public\models\watch.glb" "public\models\watch-draco.glb"
```

### Compression result

| Version | Size |
|---|---:|
| Original `watch.glb` | 27.83 MB |
| `watch-draco.glb` | 2.58 MB |
| Reduction | 90.7% |

### Visual-fidelity check

After compression, the model retained its recognizable geometry, gold and black materials, textures, lighting response, and OrbitControls interaction. The smaller file substantially improved web suitability, while Draco introduced a small decoding step in the browser.

### Honest AI failure

During an early review, the AI incorrectly interpreted approximately 27 MB of total Network resources as the size of the compressed model. PowerShell output later proved that `watch-draco.glb` was actually 2.58 MB. I corrected the record using direct file-size evidence:

```text
Original: 27.83 MB
Compressed: 2.58 MB
Reduction: 90.7%
```

This showed the importance of checking the individual Network request or local file instead of relying on the total resource summary.



# Day 4 — Loading state, performance testing, and Draco compression

## Goals

- Add visible loading feedback.
- Test loading with throttling and disabled cache.
- Confirm mobile responsiveness.
- Compress the model and measure the result.
- Re-check visual fidelity after compression.

## Prompt 1 — Add a `useProgress` loader

> “How do I show a loading spinner with percentage while my GLTF model loads in React Three Fiber, using useProgress from drei?”

### Solution used

I added:

- `Suspense` around the model and environment.
- A loading overlay outside the Canvas.
- `useProgress()` for `active`, `progress`, `loaded`, and `total`.
- A spinner, percentage, progress bar, and asset count.

### Result

The loader displayed progress values such as 0%, 33%, and 83%, then disappeared after assets finished loading.

**Status:** Worked after one implementation error was corrected.

## Error — Raw CSS inside `Scene.jsx`

### Error message

```text
[plugin:vite:oxc] Transform failed
[PARSE_ERROR] Unexpected token
src/Scene.jsx:117
.watch-stage {
```

### Cause

The CSS block beginning with `.watch-stage` had been pasted into `Scene.jsx` after the JavaScript component.

### Fix

I cut the CSS from `Scene.jsx`, pasted it into `App.css`, kept only `className="watch-stage"` in JSX, and saved both files.

**Status:** Fixed manually using the error’s exact file and line number.

## Prompt 2 — Test loading with throttling

> “How do I use Chrome DevTools’ Network tab to throttle my connection so I can see the spinner and percentage? If the spinner doesn’t disappear, what are the likely causes?”

### Test performed

- Opened DevTools Network panel.
- Enabled Disable Cache.
- Selected a throttled mobile profile.
- Performed a hard refresh.
- Filtered Network requests for the watch model.

### Result

`useProgress` advanced by completed assets rather than downloaded bytes, explaining why it could pause at 33% or 83%. The overlay disappeared normally when loading finished.

**Status:** Worked.

## Prompt 3 — Draco compression

> “I have a GLB model at public/models/watch.glb that I want to compress using Draco. I don’t have Blender installed. Walk me through running @gltf-transform/cli via npx and checking the resulting size.”

### Backup

Before compression, I copied the original model outside the project:

```powershell
Copy-Item ".\public\models\watch.glb" `
  "C:\Users\mursl\OneDrive\Desktop\watch-backup.glb"
```

### Compression command

```powershell
npx @gltf-transform/cli@latest draco `
  "public\models\watch.glb" `
  "public\models\watch-draco.glb"
```

### Verified result

```text
Original:   27.83 MB
Compressed:  2.58 MB
Reduction:  90.7%
```

The CLI also reported approximately `29.18 MB → 2.7 MB`; the difference was decimal MB versus binary MiB reporting.

### Integration

`Watch.jsx` was updated to load and preload:

```jsx
useGLTF('/models/watch-draco.glb', true)
useGLTF.preload('/models/watch-draco.glb', true)
```

### Visual QA

The compressed watch preserved its recognizable geometry, textures, gold and black materials, lighting response, rotation, and zoom behavior.

**Status:** Worked with a major size reduction and no obvious visual loss.

## Honest AI failure — Incorrect size interpretation

During an early Network review, the AI interpreted roughly 27 MB of **total page resources** as the compressed model size and recommended further optimization. The direct PowerShell result showed that the individual `watch-draco.glb` file was actually 2.58 MB.

I corrected the conclusion using the more reliable evidence:

```text
watch.glb        27.83 MB
watch-draco.glb   2.58 MB
```

This prevented unnecessary recompression and demonstrated that aggregate Network totals should not be confused with one request’s file size.

## Day 4 reflection

AI was useful for commands and implementation structure, but direct measurements were essential. The strongest evidence came from the filesystem, the individual Network request, and visual comparison after compression.

---

## Day 5 — Production build, GitHub, and Vercel deployment

### Work completed

- Removed unused source-model files after preserving the license and external backup.
- Ran the Vite production build.
- Fixed CSS errors that appeared only during production minification.
- Committed and pushed the latest code to GitHub.
- Imported the correct GitHub repository into Vercel.
- Deployed the site and tested the public URL.
- Tested the live site on real 4G mobile data.

### Production build errors and fixes

#### Error 1 — Invalid selector

```text
[lightningcss minify] Unexpected token Ident("html")
1 | *html,
```

The universal selector and `html` selector had been combined accidentally. I separated them:

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100%;
  margin: 0;
}
```

#### Error 2 — Empty selector

```text
[lightningcss minify] Invalid empty selector
22 | {
```

The `*` was missing before the opening brace. I restored the selector and ran the build again.

### Successful production build

```text
✓ 573 modules transformed
✓ built in 2.16s
```

Vite warned that the main JavaScript chunk was larger than 500 kB, but this was a non-blocking performance warning rather than a build failure.

### Git and GitHub

Commit used:

```powershell
git commit -m "Day 5: pre-deploy"
git push origin main
```

Push result:

```text
main -> main
Everything up-to-date
```

### Vercel deployment

I imported the `mursleen0355-cpu/my-watch-app-3d` repository, confirmed the Vite preset, used `npm run build`, and deployed the `dist` output. The production deployment reached the `Ready` state.

### Prompt 6 — Live-site and mobile-data testing

> “I want to test my deployed Vercel site's real-world loading performance on mobile data. What should I record for a performance write-up?”

### What I did

I disabled Wi-Fi, opened the Vercel URL over a real 4G connection, and recorded the full experience on a phone.

### Result

- Hero and navigation rendered successfully.
- Loader progressed through 0%, 33%, and 83%.
- The watch became visible after approximately 10 seconds from the loading-overlay sequence in the recording.
- The model was interactive immediately after appearing.
- Rotate, zoom, navigation, responsive sections, and the contact action worked.
- No broken model path or visible deployment error occurred.



# Day 5 — Production build, GitHub, Vercel, and mobile-data QA

## Goals

- Produce and preview a production build.
- Resolve build-only errors.
- Push the final MVP to GitHub.
- Deploy the correct repository to Vercel.
- Test the live site on another device and network.
- Complete README and licensing information.

## Prompt 1 — Build and push

> “Before I deploy, give me the exact commands to build my Vite project for production, preview it locally, then stage, commit with ‘Day 5: pre-deploy’, and push.”

### Commands used

```powershell
npm run build
npm run preview

git add -A
git commit -m "Day 5: pre-deploy"
git push origin main
```

## Production build error 1 — Invalid selector

```text
[lightningcss minify] Unexpected token Ident("html")
1 | *html,
```

### Fix

I separated the universal selector from the root selectors:

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100%;
  margin: 0;
}
```

## Production build error 2 — Empty selector

```text
[lightningcss minify] Invalid empty selector
22 | {
```

### Fix

The `*` was missing before an opening brace. I restored the selector and reran the build.

## Successful production build

```text
✓ 573 modules transformed
✓ built in 2.16s
```

Vite reported a JavaScript chunk larger than 500 kB. This was a performance warning, not a build failure. Code splitting remains a future improvement.

## Git and repository cleanup

I staged the compressed GLB, `Scene.jsx`, application changes, build log, and intentional deletion of obsolete `.gltf`, `.bin`, texture, and duplicate text files. Model license files were preserved.

Successful push:

```text
main -> main
Everything up-to-date
```

## Prompt 2 — Create the Vercel project

> “Walk me through importing my Vite + React project from GitHub into Vercel and tell me which build settings to check.”

### Deployment settings

```text
Repository:       mursleen0355-cpu/my-watch-app-3d
Framework preset: Vite
Root directory:   ./
Build command:    npm run build
Output directory: dist
Install command:  npm install / automatic
```

The project reached Vercel’s `Ready` state.

**Status:** Worked.

## Prompt 3 — Live-site checklist

> “What should I specifically check on the live site beyond just ‘does it load’?”

### Checks completed

- GLB request returned successfully.
- Watch materials and textures appeared correctly.
- Orbit rotation and zoom worked.
- Home, About, and Contact navigation worked.
- The loading overlay disappeared after completion.
- No deployment-specific model-path error appeared.

**Status:** Worked; the model-path repair prompt was not needed on production.

## Prompt 4 — Real mobile-data test

> “What’s the best way to measure and note down loading time and behavior on a phone with Wi-Fi off?”

### Test performed

I opened the Vercel URL on an Android phone over real 4G with Wi-Fi disabled and recorded the session.

### Observed result

- Header and hero rendered successfully.
- The loader showed 0%, 33%, and 83%.
- The watch appeared after approximately 10 seconds through the recorded loading sequence.
- The model was interactive immediately after appearing.
- Rotation, zoom, responsive sections, navigation, interaction hint, and contact action worked.
- No horizontal overflow or broken asset path appeared.

**Status:** Worked on a real device and network.

## Prompt 5 — README and model credit

> “Help me write a clean README.md with the project description, tech stack and reasons, local setup, live URL, and 3D model credit.”

### Documentation included

- Project description and features.
- Reasons for React, Three.js, React Three Fiber, Drei, Vite, and Vercel.
- Local setup and production commands.
- Live URL and GitHub URL.
- Compression results.
- Credit to `graphiccompressor` under CC BY 4.0.

**Status:** Completed as final documentation work.

## Day 5 reflection

A successful local development server did not guarantee a successful production build. The production minifier found CSS syntax errors that had to be corrected before deployment. Testing the final public URL and real mobile network was also necessary because asset paths and loading behavior can differ from localhost.

---

# Day 6 — Reflection and presentation preparation




## Work completed

- Reviewed the build evidence from Days 1–5.
- Selected representative prompts with clear outcomes.
- Documented an honest AI failure and manual correction.
- Answered all five Part D questions from the assignment brief.
- Created an editable Word reflection and submission-ready PDF.
- Created a two-slide editable presentation.

## Reflection evidence selected

1. Camera and lighting refinement.
2. Responsive-layout review.
3. `useProgress` loading interface and misplaced-CSS failure.
4. Draco compression and measured result.
5. Production build and deployment.
6. AI’s incorrect interpretation of Network totals and the evidence-based correction.

## Deliverables prepared

```text
Mursleen_Ul_Haq_Reflection.docx
Mursleen_Ul_Haq_Reflection.pdf
Mursleen_Ul_Haq_Presentation.pptx
```

**Status:** Complete.

---

# Day 7 — Final QA and submission checklist

## Final checks

- [ ] Open the live URL in a private/incognito desktop window.
- [ ] Rotate and zoom the model.
- [ ] Test Home, About, Contact, and CTA behavior.
- [ ] Open the site on a phone and confirm responsive stacking.
- [ ] Confirm the Vercel deployment still reports `Ready`.
- [ ] Confirm the GitHub repository is Public.
- [ ] Confirm `README.md` renders on the repository main page.
- [ ] Confirm model credit and CC BY 4.0 license are visible in documentation.
- [ ] Submit live URL, GitHub URL, and reflection PDF or DOCX.
- [ ] Rehearse the 15–20 minute presentation using the two slides.

---

# AI collaboration summary

## Where AI helped most

- Explaining React Three Fiber and Drei APIs.
- Generating initial component and CSS structures.
- Providing repeatable debugging checklists.
- Explaining `useProgress` and Chrome throttling.
- Providing the Draco CLI and PowerShell size commands.
- Guiding Git, GitHub, Vercel, and final documentation.

## Where human judgement was essential

- Choosing which suggestions matched the actual GLB.
- Visually judging model scale, center, lighting, and framing.
- Keeping optional color variants out of scope.
- Reading exact Vite errors and moving CSS to the correct file.
- Distinguishing an individual request size from Network totals.
- Verifying fidelity after compression.
- Testing the real public site on a phone and mobile data.

## Estimated impact

AI likely saved approximately one to two days of documentation search, boilerplate creation, and command discovery. Incorrect interpretation and copy-placement mistakes cost approximately one to two hours. The net impact was positive because every important answer was tested instead of accepted blindly.

---

# Asset credit

The watch model was created by [graphiccompressor](https://sketchfab.com/tityus) and is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

The source license file is retained with the project documentation.

## Model credit and licensing

The watch model was created by [graphiccompressor](https://sketchfab.com/tityus) and is licensed under [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/).

The original license file was retained in the repository when obsolete source model assets were removed.

---
# Final links

- **Live website:** https://my-watch-app-3d.vercel.app
- **GitHub repository:** https://github.com/mursleen0355-cpu/my-watch-app-3d

# Final conclusion

The project moved from a multi-file glTF asset with missing-resource and path errors to a clean, responsive, Draco-compressed GLB experience deployed publicly on Vercel. The final MVP meets the core assignment requirements: a real licensed model, browser-rendered 3D interaction, responsive page sections, visible loading feedback, measured optimization, public source control, and live hosting. The process also demonstrated critical AI use: prompts accelerated implementation, but direct testing and human judgement determined the final solution.
