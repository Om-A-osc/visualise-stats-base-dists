# Probability Distribution Visualizer

An interactive web-based tool for visualizing and exploring probability distributions with real-time calculations. Powered by [stdlib](https://stdlib.io/) and built with React, this visualizer makes understanding probabilistic distributions intuitive and accessible.

## About the Project

Struggling to understand probabilistic distributions? Want to calculate probabilities without diving into complex mathematics? Our **Probability Distribution Visualizer** has you covered!

This tool provides an interactive platform to:
- **Visualize distributions** - See how different parameters affect probability distributions in real-time
- **Calculate probabilities** - Compute PDF, PMF, CDF, quantiles, mean, and variance on the fly
- **Explore statistics** - Understand statistical properties of various distributions
- **Learn interactively** - Adjust sliders and watch visualizations update instantly

Powered by **stdlib** and leveraging the computational power of JavaScript, complex probability calculations run directly in your browser without server requests making it fast, private, and accessible anywhere.

## Features

- **20+ Distributions** - Explore normal, gamma, beta, exponential, binomial, poisson, and many more
- **Interactive Parameters** - Adjust distribution parameters with responsive sliders
- **Real-time Visualization** - PDF/PMF and CDF plots update instantly
- **Statistical Metrics** - View mean, variance, skewness, and other statistics
- **Quantile Calculator** - Compute inverse CDF values for probability calculations
- **Function Signatures** - See available methods with their exact signatures
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Comprehensive Documentation** - Detailed explanation for each distribution

## How It Works

### Powered by stdlib

This visualizer uses [stdlib](https://stdlib.io/), a comprehensive JavaScript library for numerical and scientific computing. stdlib provides:

- **Probability Functions** - Accurate implementations of PDF, PMF, and CDF for dozens of distributions
- **Statistical Methods** - Mean, variance, and other distribution properties
- **Quantile Functions** - Inverse CDF calculations for any probability value
- **Cross-browser Support** - Consistent behavior across all modern browsers

### Visualization Pipeline

1. **Select Distribution** - Choose from 20+ probability distributions
2. **Adjust Parameters** - Use interactive sliders to modify distribution parameters
3. **View Calculations** - stdlib computes PDF/PMF, CDF, and quantiles in real-time
4. **Explore Results** - See statistical metrics, charts, and function signatures instantly

### Technology Stack

- **React 19.1** - Interactive UI with hooks for state management
- **Vite** - Ultra-fast build tool and development server
- **stdlib** - Statistical and mathematical computations
- **Material-UI** - Professional slider components
- **SVG Charts** - Custom responsive visualization components

## Supported Distributions

The visualizer supports the following probability distributions:

### Continuous Distributions
- Normal (Gaussian)
- Uniform
- Exponential
- Gamma
- Beta
- Chi-squared
- F Distribution
- T Distribution
- Weibull
- Rayleigh
- Lognormal
- Pareto
- Triangular

### Discrete Distributions
- Binomial
- Poisson
- Geometric
- Hypergeometric
- Negative Binomial
- Uniform (Discrete)
- Bernoulli

## Setup & Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Om-A-osc/probability-visualizer.git
   cd probability-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Landing page with features
│   ├── Dashboard.jsx      # Main visualizer component
│   └── App.jsx            # Routing setup
├── lib/
│   ├── distributionMath.js    # Utility functions for calculations
│   └── distributions.js       # Distribution configurations
├── styles.css             # Global styles with brand colors
└── main.jsx              # Application entry point
```

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or improvements, your help makes this tool better.

### Getting Started with Development

1. **Fork the repository** - Create your own copy
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** - Implement your improvements
4. **Test thoroughly** - Ensure everything works as expected
5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add [feature description]"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** - Describe your changes and why they matter

### Development Guidelines

- **Code Style** - Follow existing code patterns and use consistent formatting
- **Component Structure** - Keep components focused and reusable
- **Comments** - Add helpful comments for complex logic
- **Testing** - Test features across different browsers and screen sizes
- **Documentation** - Update README and comments when adding features

### Areas for Contribution

- **UI Improvements** - Enhance visual design and user experience
- **Mobile Optimization** - Improve responsive design
- **Documentation** - Improve guides and comments
- **Bug Fixes** - Report and fix issues

## Usage Examples

### Calculating Normal Distribution Properties

1. Open the visualizer
2. Default distribution is Gamma - select "Normal" from the dropdown
3. Adjust μ (mean) and σ (standard deviation) using sliders
4. View:
   - PDF plot showing the probability density
   - CDF plot showing cumulative probability
   - Mean, variance, and skewness statistics
   - Function signatures for programming use

### Finding Percentiles

1. Select your distribution and parameters
2. Look for the "Quantile" function signature
3. Use the quantile function to find the value where P(X ≤ x) equals your desired probability

### Comparing Distributions

1. Open a tab for each distribution
2. Adjust parameters to see how different distributions behave
3. Compare statistical properties and visualizations side by side

## Understanding Distributions

### What is a Probability Distribution?

A probability distribution describes how likely different outcomes are for a random variable. It's fundamental to statistics, machine learning, and data science.

### Key Concepts

- **PDF (Probability Density Function)** - For continuous distributions, describes the probability density at each point
- **PMF (Probability Mass Function)** - For discrete distributions, gives the probability of each outcome
- **CDF (Cumulative Distribution Function)** - Probability that a random variable is less than or equal to a value
- **Quantile** - Inverse of CDF; the value where a certain probability is reached

## Resources

- [stdlib Documentation](https://stdlib.io/docs)
- [Probability Theory Guide](https://en.wikipedia.org/wiki/Probability_distribution)
- [Statistics Learning Resources](https://www.khanacademy.org/math/statistics-probability)

## License

This project is open source and available under the MIT License. See the LICENSE file for details.

## Support & Feedback

Have questions or suggestions? We'd love to hear from you!

- **Report Issues** - Use GitHub Issues to report bugs
- **Feature Requests** - Suggest new features through discussions
- **Questions** - Ask in discussions or contact us directly

## Acknowledgments

- [stdlib](https://stdlib.io/) - For providing comprehensive statistical computing
- [React](https://react.dev/) - For the excellent UI framework
- [Material-UI](https://mui.com/) - For beautiful component library
- All contributors who help make this tool better

---

**Made with care to make probability accessible to everyone**
