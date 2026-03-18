export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function sanitizeNumber(value) {
  return Number.isFinite(value) ? value : null;
}

export function makePoints(range) {
  const values = [];
  const start = range.min;
  const end = range.max;
  const step = range.step;
  const total = Math.max(1, Math.ceil((end - start) / step));

  for (let index = 0; index <= total; index += 1) {
    values.push(start + index * step);
  }

  return values;
}

export function summarizeStats(methods, args) {
  const statMethods = [
    ["mean", "Mean"],
    ["variance", "Variance"],
    ["stdev", "Std Dev"],
    ["skewness", "Skewness"],
    ["kurtosis", "Kurtosis"],
    ["entropy", "Entropy"],
    ["median", "Median"],
    ["mode", "Mode"],
  ];

  return statMethods
    .filter(([name]) => typeof methods[name] === "function")
    .map(([name, label]) => ({
      key: name,
      label,
      value: sanitizeNumber(methods[name](...args)),
    }));
}

export function buildSeries(methods, args, range) {
  const xs = makePoints(range);
  const primaryMethod = typeof methods.pdf === "function" ? "pdf" : typeof methods.pmf === "function" ? "pmf" : null;
  const primaryLabel = primaryMethod === "pmf" ? "PMF" : "PDF";

  return xs.map((x) => ({
    x,
    primary: primaryMethod ? sanitizeNumber(methods[primaryMethod](x, ...args)) : null,
    cdf: typeof methods.cdf === "function" ? sanitizeNumber(methods.cdf(x, ...args)) : null,
    primaryLabel,
  }));
}

export function buildQuantiles(methods, args) {
  if (typeof methods.quantile !== "function") {
    return [];
  }

  return [0.05, 0.25, 0.5, 0.75, 0.95].map((p) => ({
    p,
    x: sanitizeNumber(methods.quantile(p, ...args)),
  }));
}

export function linePath(points, width, height, valueKey, yMaxOverride) {
  const valid = points.filter((point) => point[valueKey] !== null);
  if (valid.length === 0) {
    return "";
  }

  const xMin = valid[0].x;
  const xMax = valid[valid.length - 1].x;
  const yMax = yMaxOverride ?? Math.max(...valid.map((point) => point[valueKey]), 1);

  return valid
    .map((point, index) => {
      const x = xMax === xMin ? width / 2 : ((point.x - xMin) / (xMax - xMin)) * width;
      const y = height - (point[valueKey] / yMax) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function barLayout(points, width, height, valueKey, yMaxOverride) {
  const valid = points.filter((point) => point[valueKey] !== null);
  const yMax = yMaxOverride ?? Math.max(...valid.map((point) => point[valueKey]), 1);
  const barWidth = valid.length > 0 ? width / valid.length : width;

  return valid.map((point, index) => {
    const barHeight = (point[valueKey] / yMax) * height;
    return {
      x: index * barWidth,
      y: height - barHeight,
      width: Math.max(1, barWidth - 2),
      height: barHeight,
      value: point[valueKey],
      label: point.x,
    };
  });
}

export function formatStat(value) {
  if (value === null) {
    return "Unavailable";
  }

  if (Math.abs(value) >= 1000 || (Math.abs(value) > 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(3);
  }

  return value.toFixed(4);
}
