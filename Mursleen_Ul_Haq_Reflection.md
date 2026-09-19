# 3D Website Reflection

**Student:** Mursleen Ul-Haq  
**Tutor:** Saqib  
**Submission date:** 20 September 2026  
**Live site:** https://my-watch-app-3d.vercel.app  
**GitHub:** https://github.com/mursleen0355-cpu/my-watch-app-3d

## Part C — AI-Collaboration Reflection (780 words)

### Tools used and approach

My main AI tool was Notion AI, used as a coding and problem-solving assistant throughout planning, React boilerplate, React Three Fiber configuration, responsive CSS, debugging, model optimization, deployment, and documentation. I did not treat its answers as final code. I normally shared the current code or a screen recording, tried the suggestion, then returned with the visible result or exact terminal error. This made the collaboration iterative: AI supplied a starting point, while browser tests, production builds, PowerShell output, and real-device checks decided whether the advice was correct.

### Prompt 1 — camera and lighting

Actual prompt: “My watch model in React Three Fiber currently looks slightly off-center or the metal does not look reflective enough. Suggest specific adjustments to camera position, light intensity/type, and scale so it looks polished and well-framed the moment the page loads.” The AI suggested a narrower field of view, a camera farther back, lower ambient light, directional and spot lighting, a studio environment, and a subtle initial rotation. I modified the values rather than using them blindly because the GLB’s scale and origin were unusual. After several recordings, I kept the overall lighting structure and tuned the scale and camera until the watch loaded in a useful product-view angle.

### Prompt 2 — responsive layout

Actual prompt: “Review my App.jsx and App.css for responsiveness issues at narrow widths around 320–480px… Suggest minimal CSS fixes, keeping my existing design intact.” The response proposed `clamp()` sizing, `svh` for the viewer, 44-pixel navigation targets, narrower mobile gaps, and explicit parent width/height rules for the Canvas. I used most of this with small edits. Chrome device emulation and a real phone confirmed that the header, hero, About section, Contact section, and Canvas stacked without horizontal overflow.

### Prompt 3 — loading feedback

Actual prompt: “How do I show a loading spinner with percentage while my GLTF model loads in React Three Fiber, using useProgress from drei?” The AI supplied a `Suspense` boundary, a `useProgress` overlay, percentage text, a progress bar, and CSS. I used the component structure, but the first implementation failed because the CSS was accidentally pasted into `Scene.jsx`. Vite reported an unexpected token at `.watch-stage`. I identified that CSS was inside JavaScript, moved it to `App.css`, and rebuilt. The loader then showed 0%, 33%, and 83% before disappearing when the assets finished.

### Prompt 4 — Draco optimization

Actual prompt: “I have a GLB 3D model at public/models/watch.glb that I want to compress using Draco compression. I don’t have Blender installed. Walk me through installing and running the @gltf-transform/cli tool via npx.” The AI gave the `npx @gltf-transform/cli@latest draco` command and PowerShell size checks. I first backed up the original file outside the project, then ran the command. The model fell from 27.83 MB to 2.58 MB, a 90.7% reduction. I replaced the `useGLTF` path and confirmed that geometry, materials, textures, lighting, rotation, and zoom still looked correct.

### Prompt 5 — production build and deployment

Actual prompt: “Before I deploy, I want to make sure my local build actually works. Give me the exact commands to build my Vite project for production and preview it locally, and then the git commands to stage, commit, and push.” The local production build exposed CSS issues that the development server had tolerated: an invalid `*html` selector and later an empty selector. I corrected both, reran `npm run build`, previewed the production output, pushed the Day 5 commit, imported the correct GitHub repository into Vercel, and tested the public deployment.

### Where AI was wrong

The clearest AI failure happened during compression verification. From a DevTools screenshot, the AI interpreted roughly 27 MB of total page resources as the compressed model size and suggested further texture compression. My PowerShell results showed that `watch-draco.glb` was actually 2.58 MB; the 27 MB figure was the Network panel’s aggregate resource total. I challenged the conclusion with direct evidence, and the recommendation was corrected. This mattered because unnecessary recompression could have wasted time or reduced quality. A second lesson came from generated code placement: even correct CSS is harmful when pasted into a JSX file. Exact error messages and file locations were more reliable than assuming the generated answer was ready to paste.

### Impact and judgement

AI helped most with API explanations, first-draft code, structured debugging, and deployment checklists. I estimate it saved roughly one to two days of searching documentation and assembling boilerplate, while incorrect interpretation and copy-placement issues cost about one to two hours. The net effect was positive, but only because I tested each important suggestion. My main takeaway is that AI accelerated the project when paired with evidence: screen recordings for visual issues, terminal output for file sizes, production builds for syntax, and a real 4G phone test for deployment behavior. I used AI as a collaborator, not as the final authority.

## Part D — Reflection on 3D Modelling Services (618 words)

### 1. Asset pipeline

A browser-ready model passes through more stages than simply downloading a 3D file. A production asset would normally be modelled or sculpted, retopologized to control polygon count, UV-unwrapped, textured with web-appropriate maps, assigned clean material names, and exported as glTF/GLB. It should then be inspected for scale, pivot/origin, material compatibility, texture resolution, licensing, and total payload. Finally, geometry and textures are compressed and the website provides preloading, progress feedback, and error handling. I sourced a licensed Sketchfab watch rather than creating it in Blender, so I did not perform retopology or UV work myself. My pain points appeared later: the original GLB was 27.83 MB, its origin made first-load framing awkward, reflective materials needed environment lighting, and the loading experience needed a visible progress state.

### 2. Performance versus fidelity

For a web experience, the correct detail level is the lowest level that still communicates the product at the intended viewing distance. A rendered still can use dense geometry and large textures because it is produced offline; a game can rely on an engine-specific LOD pipeline; a website must download, decode, and render on varied phones and laptops. I kept one hero object and a simple scene instead of adding several models or effects. Draco compression reduced the watch from 27.83 MB to 2.58 MB, or 90.7%, without an obvious visual loss in my tests. I accepted the small browser decoding cost because the bandwidth saving was far larger. I also stopped short of optional color variants so that loading, controls, responsiveness, and deployment quality remained the priority.

### 3. Customization and reuse

A real configurator should not store every color, size, and component combination as a separate handmade GLB. The asset should be organized into consistently named, separable meshes such as case, strap, bezel, buttons, and display. Materials should have stable names so code can change colors without touching unrelated textures. Replaceable components need compatible pivots, scales, attachment points, and UV conventions. Variant data could then live in JSON or a CMS, mapping product options to materials, visibility states, or component files. Shared geometry and textures should be reused, and only genuinely different parts should be streamed. My experiment with material names showed that configurability has to be planned during asset creation; it is harder to add safely after receiving a monolithic model.

### 4. Where AI fits today

AI is already useful around the 3D pipeline: explaining export settings, drafting Blender or command-line automation, generating loader code, suggesting material and camera settings, producing placeholder textures, and helping diagnose web errors. In this project it accelerated React Three Fiber setup, `useGLTF`, responsive CSS, `useProgress`, Draco commands, Git, and Vercel deployment. It was weaker at visual judgement and verification. It could not know the GLB’s true visual center without testing, and it misread an aggregate Network figure as the model size. AI-generated geometry and textures can also create inconsistent topology, UVs, licensing ambiguity, or details that do not survive close inspection. A skilled 3D artist is still needed for art direction, clean topology, UV discipline, accurate materials, and final quality control.

### 5. Beyond the MVP

A client-facing version would need at least five further improvements. First, multiple LODs or progressive asset streaming would reduce time to first interaction on mobile. Second, robust asset-error handling and a fallback product image would cover failed decoders or network requests. Third, broader accessibility work would add a keyboard alternative, clearer instructions, reduced-motion behavior, and a non-3D way to access product information. Fourth, analytics and performance monitoring would measure load time, interaction, device failures, and conversion. Fifth, systematic cross-browser and device testing would cover Safari/iOS, lower-powered Android devices, GPU differences, and slow networks. Depending on the client, a CMS or product-data service would also be needed so content and variants can change without a code deployment.

## Asset credit

Watch model by [graphiccompressor](https://sketchfab.com/tityus), licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).
