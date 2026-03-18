import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <main className="hero-page">
      <section className="hero-banner-fullpage">
        <div className="hero-container-fullpage">
          <div className="hero-content-fullpage">
            <p className="hero-eyebrow">Discover Probability Distributions</p>
            <h1 className="hero-title-fullpage">Probability Distribution Visualization</h1>
            <div className="hero-subtitle">
              <p>Powered by</p>
              <a href="https://stdlib.io/docs/api/latest" target="_blank" rel="noopener noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/stdlib-logo.png`} alt="Stdlib" className="hero-stdlib-logo" />
              </a>
            </div>
            <p className="hero-description-fullpage">
                Understand Distributions, Not Just Formulas.<br/>
                Plot, compare, and experiment with probability distributions like Beta, Gaussian, Poisson, and more.            </p>
            <button 
              className="hero-button"
              onClick={() => navigate("/dashboard")}
            >
              <span>Visualizer</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="hero-visual-fullpage">
            <div className="floating-card card-1"></div>
            <div className="floating-card card-2"></div>
            <div className="floating-card card-3"></div>
            <div className="floating-card card-4"></div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2>Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Interactive Charts</h3>
              <p>Real-time visualization of probability density functions and cumulative distribution functions</p>
            </div>
            <div className="feature-card">
              <h3>Parameter Control</h3>
              <p>Adjust distribution parameters with sliders and see instant visual feedback</p>
            </div>
            <div className="feature-card">
              <h3>Statistical Metrics</h3>
              <p>View comprehensive statistics including mean, variance, and quantile information</p>
            </div>
            <div className="feature-card">
              <h3>Documentation</h3>
              <p>Access detailed documentation and method signatures for each distribution</p>
            </div>
          </div>
        </div>
      </section>

      <section className="installation-section">
        <div className="installation-container">
          <div className="installation-content">
            <h2>Get Started with Stdlib</h2>
            <p className="installation-description">
              Install the JavaScript standard library and access powerful statistical distributions
            </p>
            
            <div className="installation-code-block">
              <div className="code-header">
                <span className="code-label">Terminal</span>
                <button 
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText("npm install @stdlib/stdlib")}
                  title="Copy to clipboard"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 2.5H4C3.175 2.5 2.5 3.175 2.5 4V12.5C2.5 13.325 3.175 14 4 14H13.5C14.325 14 15 13.325 15 12.5V4C15 3.175 14.325 2.5 13.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 2.5V1.5C6 1.225 6.225 1 6.5 1H12.5C12.775 1 13 1.225 13 1.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <pre><code>npm install @stdlib/stdlib</code></pre>
            </div>

            <div className="usage-example">
              <h3>Usage Example</h3>
              <div className="code-example">
                <pre><code>{`import stdlibDists from "@stdlib/stats/base/dists";

// Access Normal distribution
const normal = stdlibDists.normal;

// Compute probability density function
const pdf = normal.pdf(0, 0, 1);

// Compute cumulative distribution function
const cdf = normal.cdf(0, 0, 1);

// Generate quantile
const q = normal.quantile(0.95, 0, 1);`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-column">
              <h4>Stdlib</h4>
              <nav className="footer-nav">
                <a href="https://www.npmjs.com/package/@stdlib/stdlib" target="_blank" rel="noopener noreferrer" className="footer-link">
                  NPM Package
                </a>
                <a href="https://github.com/stdlib-js/stdlib" target="_blank" rel="noopener noreferrer" className="footer-link">
                  GitHub Repository
                </a>
                <a href="https://stdlib.io/docs/api/latest" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Official Docs
                </a>
              </nav>
            </div>

            <div className="footer-column">
              <h4>This Project</h4>
              <nav className="footer-nav">
                <a href="https://github.com/Om-A-osc/visualise-stats-base-dists" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Source Code
                </a>
                <a href="https://github.com/Om-A-osc/visualise-stats-base-dists/issues" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Report Issues
                </a>
              </nav>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <nav className="footer-nav">
                <a href="https://en.wikipedia.org/wiki/Probability_distribution" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Probability Theory
                </a>
                <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Khan Academy
                </a>
              </nav>
            </div>

            <div className="footer-column">
              <h4>Technologies</h4>
              <nav className="footer-nav">
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="footer-link">
                  React
                </a>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Vite
                </a>
              </nav>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-credits">
              <p>Built with <span className="heart">♥</span> using <a href="https://stdlib.io">Stdlib</a> and <a href="https://react.dev">React</a></p>
              <p className="footer-year">&copy; 2026 • Interactive Distribution Explorer</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
