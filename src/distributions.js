const makeRange = (min, max, step = 0.1) => ({ min, max, step });

export const DISTRIBUTION_CONFIG = {
  bernoulli: {
    label: "Bernoulli",
    family: "Discrete",
    params: [{ key: "p", label: "Success Probability", defaultValue: 0.35, min: 0.01, max: 0.99, step: 0.01 }],
    domain: makeRange(0, 1, 1),
    support: makeRange(0, 1, 1),
  },
  beta: {
    label: "Beta",
    family: "Continuous",
    params: [
      { key: "alpha", label: "Alpha", defaultValue: 2.2, min: 0.1, max: 10, step: 0.1 },
      { key: "beta", label: "Beta", defaultValue: 4.8, min: 0.1, max: 10, step: 0.1 },
    ],
    domain: makeRange(0, 1, 0.01),
    support: makeRange(0, 1, 0.01),
  },
  binomial: {
    label: "Binomial",
    family: "Discrete",
    params: [
      { key: "n", label: "Trials", defaultValue: 12, min: 1, max: 50, step: 1 },
      { key: "p", label: "Success Probability", defaultValue: 0.4, min: 0.01, max: 0.99, step: 0.01 },
    ],
    domain: makeRange(0, 12, 1),
    supportFromParams: ({ n }) => makeRange(0, Math.max(1, Math.round(n)), 1),
    normalize: ({ n, p }) => ({ n: Math.max(1, Math.round(n)), p }),
  },
  cauchy: {
    label: "Cauchy",
    family: "Continuous",
    params: [
      { key: "x0", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "gamma", label: "Scale", defaultValue: 1, min: 0.1, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ x0, gamma }) => makeRange(x0 - 8 * gamma, x0 + 8 * gamma, gamma / 25),
  },
  chisquare: {
    label: "Chi-Square",
    family: "Continuous",
    params: [{ key: "k", label: "Degrees of Freedom", defaultValue: 5, min: 1, max: 30, step: 1 }],
    domainFromParams: ({ k }) => makeRange(0, Math.max(8, k * 3), 0.05),
  },
  exponential: {
    label: "Exponential",
    family: "Continuous",
    params: [{ key: "lambda", label: "Rate", defaultValue: 1.1, min: 0.1, max: 10, step: 0.1 }],
    domainFromParams: ({ lambda }) => makeRange(0, 8 / lambda, 0.02),
  },
  geometric: {
    label: "Geometric",
    family: "Discrete",
    params: [{ key: "p", label: "Success Probability", defaultValue: 0.35, min: 0.01, max: 0.99, step: 0.01 }],
    domain: makeRange(1, 20, 1),
  },
  hypergeometric: {
    label: "Hypergeometric",
    family: "Discrete",
    params: [
      { key: "N", label: "Population", defaultValue: 40, min: 5, max: 100, step: 1 },
      { key: "K", label: "Successes", defaultValue: 15, min: 1, max: 60, step: 1 },
      { key: "n", label: "Draws", defaultValue: 12, min: 1, max: 50, step: 1 },
    ],
    domainFromParams: ({ N, K, n }) => {
      const max = Math.min(K, n, N);
      return makeRange(0, Math.max(1, max), 1);
    },
    normalize: ({ N, K, n }) => {
      const population = Math.max(1, Math.round(N));
      const successes = Math.min(population, Math.max(1, Math.round(K)));
      const draws = Math.min(population, Math.max(1, Math.round(n)));
      return { N: population, K: successes, n: draws };
    },
  },
  invgamma: {
    label: "Inverse Gamma",
    family: "Continuous",
    params: [
      { key: "alpha", label: "Shape", defaultValue: 4, min: 0.5, max: 12, step: 0.1 },
      { key: "beta", label: "Scale", defaultValue: 3, min: 0.1, max: 12, step: 0.1 },
    ],
    domain: makeRange(0.01, 10, 0.02),
  },
  kumaraswamy: {
    label: "Kumaraswamy",
    family: "Continuous",
    params: [
      { key: "a", label: "A", defaultValue: 2.1, min: 0.1, max: 10, step: 0.1 },
      { key: "b", label: "B", defaultValue: 4.1, min: 0.1, max: 10, step: 0.1 },
    ],
    domain: makeRange(0, 1, 0.01),
    support: makeRange(0, 1, 0.01),
  },
  laplace: {
    label: "Laplace",
    family: "Continuous",
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "b", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, b }) => makeRange(mu - 8 * b, mu + 8 * b, b / 25),
  },
  levy: {
    label: "Levy",
    family: "Continuous",
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -2, max: 6, step: 0.1 },
      { key: "c", label: "Scale", defaultValue: 1.4, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, c }) => makeRange(mu + 0.001, mu + 20 * c, c / 15),
  },
  lognormal: {
    label: "Lognormal",
    family: "Continuous",
    params: [
      { key: "mu", label: "Mean Log", defaultValue: 0.3, min: -3, max: 3, step: 0.1 },
      { key: "sigma", label: "Std Log", defaultValue: 0.8, min: 0.1, max: 3, step: 0.1 },
    ],
    domain: makeRange(0.001, 12, 0.02),
  },
  logistic: {
    label: "Logistic",
    family: "Continuous",
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "s", label: "Scale", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, s }) => makeRange(mu - 10 * s, mu + 10 * s, s / 25),
  },
  nakagami: {
    label: "Nakagami",
    family: "Continuous",
    params: [
      { key: "mu", label: "Shape", defaultValue: 2.5, min: 0.5, max: 12, step: 0.1 },
      { key: "omega", label: "Spread", defaultValue: 1.5, min: 0.1, max: 12, step: 0.1 },
    ],
    domain: makeRange(0, 6, 0.02),
  },
  negativeBinomial: {
    label: "Negative Binomial",
    family: "Discrete",
    params: [
      { key: "r", label: "Failures", defaultValue: 5, min: 1, max: 30, step: 1 },
      { key: "p", label: "Success Probability", defaultValue: 0.45, min: 0.01, max: 0.99, step: 0.01 },
    ],
    domain: makeRange(0, 25, 1),
  },
  normal: {
    label: "Normal",
    family: "Continuous",
    params: [
      { key: "mu", label: "Mean", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "sigma", label: "Std Dev", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, sigma }) => makeRange(mu - 4 * sigma, mu + 4 * sigma, sigma / 20),
  },
  poisson: {
    label: "Poisson",
    family: "Discrete",
    params: [{ key: "lambda", label: "Rate", defaultValue: 4, min: 0.1, max: 30, step: 0.1 }],
    domainFromParams: ({ lambda }) => makeRange(0, Math.max(8, Math.round(lambda * 4)), 1),
  },
  rayleigh: {
    label: "Rayleigh",
    family: "Continuous",
    params: [{ key: "sigma", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 }],
    domainFromParams: ({ sigma }) => makeRange(0, 8 * sigma, sigma / 20),
  },
  t: {
    label: "Student's t",
    family: "Continuous",
    params: [{ key: "v", label: "Degrees of Freedom", defaultValue: 8, min: 1, max: 50, step: 1 }],
    domain: makeRange(-8, 8, 0.05),
    normalize: ({ v }) => ({ v: Math.max(1, Math.round(v)) }),
  },
  triangular: {
    label: "Triangular",
    family: "Continuous",
    params: [
      { key: "a", label: "Min", defaultValue: 0, min: -5, max: 5, step: 0.1 },
      { key: "b", label: "Max", defaultValue: 10, min: 1, max: 20, step: 0.1 },
      { key: "c", label: "Mode", defaultValue: 4, min: 0, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ a, b }) => makeRange(a, b, Math.max(0.02, (b - a) / 120)),
    normalize: ({ a, b, c }) => {
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return { a: min, b: max, c: Math.min(max, Math.max(min, c)) };
    },
  },
  uniform: {
    label: "Uniform",
    family: "Continuous",
    params: [
      { key: "a", label: "Min", defaultValue: 0, min: -10, max: 5, step: 0.1 },
      { key: "b", label: "Max", defaultValue: 5, min: -5, max: 20, step: 0.1 },
    ],
    domainFromParams: ({ a, b }) => makeRange(a, b, Math.max(0.02, (b - a) / 120)),
    normalize: ({ a, b }) => ({ a: Math.min(a, b), b: Math.max(a, b) }),
  },
  weibull: {
    label: "Weibull",
    family: "Continuous",
    params: [
      { key: "lambda", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 },
      { key: "k", label: "Shape", defaultValue: 1.8, min: 0.1, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ lambda }) => makeRange(0, 8 * lambda, lambda / 20),
  },
};

function titleCaseFromKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (match) => match.toUpperCase());
}

export function getDistributionConfig(key, methods) {
  if (DISTRIBUTION_CONFIG[key]) {
    return DISTRIBUTION_CONFIG[key];
  }

  const isDiscrete = typeof methods?.pmf === "function";
  const argCount = Math.max(0, (methods?.cdf?.length ?? methods?.pdf?.length ?? methods?.pmf?.length ?? 1) - 1);

  return {
    label: titleCaseFromKey(key),
    family: isDiscrete ? "Discrete" : "Continuous",
    params: Array.from({ length: argCount }, (_, index) => ({
      key: `arg${index + 1}`,
      label: `Parameter ${index + 1}`,
      defaultValue: index === 0 ? 1 : 0.5,
      min: 0.01,
      max: 20,
      step: 0.01,
    })),
    domain: isDiscrete ? makeRange(0, 20, 1) : makeRange(-5, 5, 0.05),
  };
}
