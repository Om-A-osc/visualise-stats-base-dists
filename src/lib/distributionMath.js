export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function sanitizeNumber(value) {
  return Number.isFinite(value) ? value : null;
}

export function makePoints(range, discrete) {
  if (discrete) {
    const values = [];
    const start = Math.round(range.min);
    const end = Math.round(range.max);

    for (let value = start; value <= end; value += 1) {
      values.push(value);
    }

    return values;
  }

  const values = [];
  const sampleCount = 240;
  const step = (range.max - range.min) / sampleCount;

  for (let index = 0; index <= sampleCount; index += 1) {
    values.push(range.min + index * step);
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

export function buildSeries(methods, args, range, discrete) {
  const xs = makePoints(range, discrete);
  const primaryMethod = typeof methods.pdf === "function" ? "pdf" : typeof methods.pmf === "function" ? "pmf" : null;

  return xs.map((x) => ({
    x,
    primary: primaryMethod ? sanitizeNumber(methods[primaryMethod](x, ...args)) : null,
    cdf: typeof methods.cdf === "function" ? sanitizeNumber(methods.cdf(x, ...args)) : null,
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

export function createTicks(min, max, count) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return [];
  }

  if (min === max) {
    return [min];
  }

  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => min + index * step);
}

export function getChartBounds(points, valueKey) {
  const valid = points.filter((point) => point[valueKey] !== null);

  if (valid.length === 0) {
    return null;
  }

  const xValues = valid.map((point) => point.x);
  const yValues = valid.map((point) => point[valueKey]);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMax = Math.max(...yValues, 1);

  return {
    xMin,
    xMax,
    yMin: 0,
    yMax,
  };
}

export function scaleX(value, bounds, width) {
  if (bounds.xMax === bounds.xMin) {
    return width / 2;
  }

  return ((value - bounds.xMin) / (bounds.xMax - bounds.xMin)) * width;
}

export function scaleY(value, bounds, height) {
  return height - ((value - bounds.yMin) / (bounds.yMax - bounds.yMin || 1)) * height;
}

export function linePath(points, bounds, width, height, valueKey) {
  const valid = points.filter((point) => point[valueKey] !== null);

  if (valid.length === 0) {
    return "";
  }

  return valid
    .map((point, index) => {
      const x = scaleX(point.x, bounds, width);
      const y = scaleY(point[valueKey], bounds, height);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function barLayout(points, bounds, width, height, valueKey) {
  const valid = points.filter((point) => point[valueKey] !== null);
  const barWidth = valid.length > 0 ? width / valid.length : width;

  return valid.map((point, index) => {
    const barHeight = (point[valueKey] / (bounds.yMax || 1)) * height;
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

export function formatAxisValue(value) {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (Math.abs(value) >= 1000 || (Math.abs(value) > 0 && Math.abs(value) < 0.01)) {
    return value.toExponential(2);
  }

  if (Math.abs(value) >= 10) {
    return value.toFixed(1);
  }

  return value.toFixed(2);
}
