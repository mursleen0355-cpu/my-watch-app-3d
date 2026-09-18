import Scene from "./Scene";
import "./App.css";

function App() {
  return (
    <>
      {/* Anchor-link navigation */}
      <header className="site-header">
        <a className="site-logo" href="#home">
          Watch
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <section id="home" className="hero">
          <div className="hero__content">
            <p className="eyebrow">Interactive 3D showcase</p>
            <h1>Explore the Watch </h1>
            <p className="tagline">
              Rotate, zoom, and inspect the watch directly in your browser.
            </p>
          </div>

          <div className="viewer">
            <Scene />
          </div>
        </section>

        {/* About section */}
        <section id="about" className="section about">
          <div className="section__content">
            <p className="eyebrow">About</p>
            <h2>About this object</h2>

            <p>
This rugged digital chronograph watch features a bold Mudmaster inspired design, durable detailing, and a practical outdoor aesthetic. Its layered case, functional buttons, and high contrast display make it a strong example of a modern adventure focused timepiece.
            </p>

            <p>
              This project showcases a premium 3D watch experience built with React and React Three Fiber. The interactive model allows users to rotate and explore the watch from different angles, creating a modern and immersive product presentation.

            </p>
            <p className="tagline">
  Explore every detail of this rugged chronograph in interactive 3D.
</p>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="section cta">
          <div className="section__content">
            <p className="eyebrow">Get in touch</p>
            <h2>Want to know more?</h2>
            <p>Contact me to learn more about this project.</p>

            <a className="button" href="mailto:mursleen0355@gmail.com">
              Contact me
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;