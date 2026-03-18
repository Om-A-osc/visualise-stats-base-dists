const makeRange = (min, max, step = 0.1) => ({ min, max, step });

export const DISTRIBUTION_GROUPS = {
  continuous: "Continuous",
  discrete: "Discrete",
  other: "Other",
};

export const DISTRIBUTION_CONFIG = {
  arcsine: {
    label: "Arcsine",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "a", label: "Lower Bound", defaultValue: 0, min: -10, max: 5, step: 0.1 },
      { key: "b", label: "Upper Bound", defaultValue: 1, min: -5, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ a, b }) => makeRange(a, b, Math.max(0.005, (b - a) / 160)),
    normalize: ({ a, b }) => ({ a: Math.min(a, b), b: Math.max(a, b) }),
  },
  bernoulli: {
    label: "Bernoulli",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [{ key: "p", label: "Success Probability", defaultValue: 0.35, min: 0.01, max: 0.99, step: 0.01 }],
    support: makeRange(0, 1, 1),
  },
  beta: {
    label: "Beta",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "alpha", label: "Alpha", defaultValue: 2.2, min: 0.1, max: 10, step: 0.1 },
      { key: "beta", label: "Beta", defaultValue: 4.8, min: 0.1, max: 10, step: 0.1 },
    ],
    support: makeRange(0.001, 0.999, 0.01),
  },
  betaprime: {
    label: "Beta Prime",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "alpha", label: "Alpha", defaultValue: 2.4, min: 0.1, max: 10, step: 0.1 },
      { key: "beta", label: "Beta", defaultValue: 3.8, min: 0.1, max: 10, step: 0.1 },
    ],
    domain: makeRange(0.01, 12, 0.03),
  },
  binomial: {
    label: "Binomial",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [
      { key: "n", label: "Trials", defaultValue: 12, min: 1, max: 60, step: 1 },
      { key: "p", label: "Success Probability", defaultValue: 0.4, min: 0.01, max: 0.99, step: 0.01 },
    ],
    supportFromParams: ({ n }) => makeRange(0, Math.max(1, Math.round(n)), 1),
    normalize: ({ n, p }) => ({ n: Math.max(1, Math.round(n)), p }),
  },
  cauchy: {
    label: "Cauchy",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "x0", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "gamma", label: "Scale", defaultValue: 1, min: 0.1, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ x0, gamma }) => makeRange(x0 - 8 * gamma, x0 + 8 * gamma, gamma / 30),
  },
  chi: {
    label: "Chi",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [{ key: "k", label: "Degrees of Freedom", defaultValue: 4, min: 1, max: 40, step: 1 }],
    domainFromParams: ({ k }) => makeRange(0, Math.max(6, k * 1.8), 0.03),
    normalize: ({ k }) => ({ k: Math.max(1, Math.round(k)) }),
  },
  chisquare: {
    label: "Chi-Square",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [{ key: "k", label: "Degrees of Freedom", defaultValue: 5, min: 1, max: 40, step: 1 }],
    domainFromParams: ({ k }) => makeRange(0, Math.max(8, k * 3), 0.05),
    normalize: ({ k }) => ({ k: Math.max(1, Math.round(k)) }),
  },
  cosine: {
    label: "Raised Cosine",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -8, max: 8, step: 0.1 },
      { key: "s", label: "Scale", defaultValue: 1.2, min: 0.1, max: 6, step: 0.1 },
    ],
    domainFromParams: ({ mu, s }) => makeRange(mu - 3 * s, mu + 3 * s, s / 30),
  },
  degenerate: {
    label: "Degenerate",
    family: DISTRIBUTION_GROUPS.other,
    params: [{ key: "mu", label: "Point Mass", defaultValue: 2, min: -10, max: 10, step: 0.1 }],
    supportFromParams: ({ mu }) => makeRange(mu - 2, mu + 2, 0.1),
  },
  discreteUniform: {
    label: "Discrete Uniform",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [
      { key: "a", label: "Lower Bound", defaultValue: 1, min: -10, max: 10, step: 1 },
      { key: "b", label: "Upper Bound", defaultValue: 8, min: -10, max: 20, step: 1 },
    ],
    supportFromParams: ({ a, b }) => makeRange(a, b, 1),
    normalize: ({ a, b }) => ({ a: Math.round(Math.min(a, b)), b: Math.round(Math.max(a, b)) }),
  },
  erlang: {
    label: "Erlang",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "k", label: "Shape", defaultValue: 3, min: 1, max: 20, step: 1 },
      { key: "lambda", label: "Rate", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ k, lambda }) => makeRange(0, Math.max(8, (k * 4) / lambda), 0.03),
    normalize: ({ k, lambda }) => ({ k: Math.max(1, Math.round(k)), lambda }),
  },
  exponential: {
    label: "Exponential",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [{ key: "lambda", label: "Rate", defaultValue: 1.1, min: 0.1, max: 10, step: 0.1 }],
    domainFromParams: ({ lambda }) => makeRange(0, 8 / lambda, 0.02),
  },
  f: {
    label: "Fisher's F",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "d1", label: "Numerator DoF", defaultValue: 8, min: 1, max: 50, step: 1 },
      { key: "d2", label: "Denominator DoF", defaultValue: 14, min: 1, max: 50, step: 1 },
    ],
    domain: makeRange(0.01, 8, 0.02),
    normalize: ({ d1, d2 }) => ({ d1: Math.max(1, Math.round(d1)), d2: Math.max(1, Math.round(d2)) }),
  },
  frechet: {
    label: "Frechet",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "alpha", label: "Shape", defaultValue: 3.2, min: 0.1, max: 10, step: 0.1 },
      { key: "s", label: "Scale", defaultValue: 1.5, min: 0.1, max: 8, step: 0.1 },
      { key: "m", label: "Location", defaultValue: 0, min: -4, max: 6, step: 0.1 },
    ],
    domainFromParams: ({ s, m }) => makeRange(m + 0.001, m + s * 12, s / 25),
  },
  gamma: {
    label: "Gamma",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "alpha", label: "Shape", defaultValue: 3.2, min: 0.1, max: 12, step: 0.1 },
      { key: "beta", label: "Rate", defaultValue: 1.4, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ alpha, beta }) => makeRange(0, Math.max(8, (alpha * 4) / beta), 0.03),
  },
  geometric: {
    label: "Geometric",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [{ key: "p", label: "Success Probability", defaultValue: 0.35, min: 0.01, max: 0.99, step: 0.01 }],
    support: makeRange(1, 20, 1),
  },
  gumbel: {
    label: "Gumbel",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "beta", label: "Scale", defaultValue: 1.2, min: 0.1, max: 6, step: 0.1 },
    ],
    domainFromParams: ({ mu, beta }) => makeRange(mu - 4 * beta, mu + 10 * beta, beta / 30),
  },
  hypergeometric: {
    label: "Hypergeometric",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [
      { key: "N", label: "Population", defaultValue: 40, min: 5, max: 100, step: 1 },
      { key: "K", label: "Successes", defaultValue: 15, min: 1, max: 80, step: 1 },
      { key: "n", label: "Draws", defaultValue: 12, min: 1, max: 80, step: 1 },
    ],
    supportFromParams: ({ N, K, n }) => {
      const population = Math.max(1, Math.round(N));
      const successes = Math.min(population, Math.max(1, Math.round(K)));
      const draws = Math.min(population, Math.max(1, Math.round(n)));
      const min = Math.max(0, draws - (population - successes));
      const max = Math.min(successes, draws);
      return makeRange(min, Math.max(min, max), 1);
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
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "alpha", label: "Shape", defaultValue: 4, min: 0.5, max: 12, step: 0.1 },
      { key: "beta", label: "Scale", defaultValue: 3, min: 0.1, max: 12, step: 0.1 },
    ],
    domain: makeRange(0.01, 10, 0.02),
  },
  kumaraswamy: {
    label: "Kumaraswamy",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "a", label: "A", defaultValue: 2.1, min: 0.1, max: 10, step: 0.1 },
      { key: "b", label: "B", defaultValue: 4.1, min: 0.1, max: 10, step: 0.1 },
    ],
    support: makeRange(0.001, 0.999, 0.01),
  },
  laplace: {
    label: "Laplace",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "b", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, b }) => makeRange(mu - 8 * b, mu + 8 * b, b / 25),
  },
  levy: {
    label: "Levy",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -2, max: 6, step: 0.1 },
      { key: "c", label: "Scale", defaultValue: 1.4, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, c }) => makeRange(mu + 0.001, mu + 20 * c, c / 15),
  },
  logistic: {
    label: "Logistic",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Location", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "s", label: "Scale", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, s }) => makeRange(mu - 10 * s, mu + 10 * s, s / 25),
  },
  lognormal: {
    label: "Lognormal",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Mean Log", defaultValue: 0.3, min: -3, max: 3, step: 0.1 },
      { key: "sigma", label: "Std Log", defaultValue: 0.8, min: 0.1, max: 3, step: 0.1 },
    ],
    domain: makeRange(0.001, 12, 0.02),
  },
  negativeBinomial: {
    label: "Negative Binomial",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [
      { key: "r", label: "Failures", defaultValue: 5, min: 1, max: 30, step: 1 },
      { key: "p", label: "Success Probability", defaultValue: 0.45, min: 0.01, max: 0.99, step: 0.01 },
    ],
    support: makeRange(0, 25, 1),
    normalize: ({ r, p }) => ({ r: Math.max(1, Math.round(r)), p }),
  },
  normal: {
    label: "Normal",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Mean", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "sigma", label: "Std Dev", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
    ],
    domainFromParams: ({ mu, sigma }) => makeRange(mu - 4 * sigma, mu + 4 * sigma, sigma / 20),
  },
  pareto1: {
    label: "Pareto Type I",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "xm", label: "Scale", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
      { key: "alpha", label: "Shape", defaultValue: 3.5, min: 0.1, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ xm }) => makeRange(xm, xm * 12, xm / 25),
  },
  planck: {
    label: "Planck",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [{ key: "lambda", label: "Lambda", defaultValue: 0.75, min: 0.01, max: 6, step: 0.01 }],
    support: makeRange(0, 20, 1),
  },
  poisson: {
    label: "Poisson",
    family: DISTRIBUTION_GROUPS.discrete,
    params: [{ key: "lambda", label: "Rate", defaultValue: 4, min: 0.1, max: 30, step: 0.1 }],
    supportFromParams: ({ lambda }) => makeRange(0, Math.max(8, Math.round(lambda * 4)), 1),
  },
  rayleigh: {
    label: "Rayleigh",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [{ key: "sigma", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 }],
    domainFromParams: ({ sigma }) => makeRange(0, 8 * sigma, sigma / 20),
  },
  signrank: {
    label: "Signed Rank",
    family: DISTRIBUTION_GROUPS.other,
    params: [{ key: "n", label: "Sample Size", defaultValue: 8, min: 1, max: 25, step: 1 }],
    supportFromParams: ({ n }) => makeRange(0, (Math.round(n) * (Math.round(n) + 1)) / 2, 1),
    normalize: ({ n }) => ({ n: Math.max(1, Math.round(n)) }),
  },
  t: {
    label: "Student's t",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [{ key: "v", label: "Degrees of Freedom", defaultValue: 8, min: 1, max: 50, step: 1 }],
    domain: makeRange(-8, 8, 0.05),
    normalize: ({ v }) => ({ v: Math.max(1, Math.round(v)) }),
  },
  triangular: {
    label: "Triangular",
    family: DISTRIBUTION_GROUPS.continuous,
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
  truncatedNormal: {
    label: "Truncated Normal",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "mu", label: "Mean", defaultValue: 0, min: -10, max: 10, step: 0.1 },
      { key: "sigma", label: "Std Dev", defaultValue: 1, min: 0.1, max: 8, step: 0.1 },
      { key: "a", label: "Lower Bound", defaultValue: -1.5, min: -10, max: 10, step: 0.1 },
      { key: "b", label: "Upper Bound", defaultValue: 1.5, min: -10, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ a, b }) => makeRange(a, b, Math.max(0.01, (b - a) / 140)),
    normalize: ({ mu, sigma, a, b }) => ({
      mu,
      sigma,
      a: Math.min(a, b),
      b: Math.max(a, b),
    }),
  },
  tukey: {
    label: "Studentized Range",
    family: DISTRIBUTION_GROUPS.other,
    params: [
      { key: "x", label: "Sample Count", defaultValue: 4, min: 2, max: 15, step: 1 },
      { key: "v", label: "Degrees of Freedom", defaultValue: 10, min: 1, max: 80, step: 1 },
    ],
    domain: makeRange(0, 10, 0.05),
    normalize: ({ x, v }) => ({ x: Math.max(2, Math.round(x)), v: Math.max(1, Math.round(v)) }),
  },
  uniform: {
    label: "Uniform",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "a", label: "Min", defaultValue: 0, min: -10, max: 5, step: 0.1 },
      { key: "b", label: "Max", defaultValue: 5, min: -5, max: 20, step: 0.1 },
    ],
    domainFromParams: ({ a, b }) => makeRange(a, b, Math.max(0.02, (b - a) / 120)),
    normalize: ({ a, b }) => ({ a: Math.min(a, b), b: Math.max(a, b) }),
  },
  weibull: {
    label: "Weibull",
    family: DISTRIBUTION_GROUPS.continuous,
    params: [
      { key: "lambda", label: "Scale", defaultValue: 1.2, min: 0.1, max: 8, step: 0.1 },
      { key: "k", label: "Shape", defaultValue: 1.8, min: 0.1, max: 10, step: 0.1 },
    ],
    domainFromParams: ({ lambda }) => makeRange(0, 8 * lambda, lambda / 20),
  },
};

export const DISTRIBUTION_ORDER = [
  "arcsine",
  "beta",
  "betaprime",
  "cauchy",
  "chi",
  "chisquare",
  "cosine",
  "erlang",
  "exponential",
  "f",
  "frechet",
  "gamma",
  "gumbel",
  "invgamma",
  "kumaraswamy",
  "laplace",
  "levy",
  "logistic",
  "lognormal",
  "normal",
  "pareto1",
  "rayleigh",
  "t",
  "triangular",
  "truncatedNormal",
  "uniform",
  "weibull",
  "bernoulli",
  "binomial",
  "discreteUniform",
  "geometric",
  "hypergeometric",
  "negativeBinomial",
  "planck",
  "poisson",
  "degenerate",
  "signrank",
  "tukey",
];

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
    family: isDiscrete ? DISTRIBUTION_GROUPS.discrete : DISTRIBUTION_GROUPS.continuous,
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
