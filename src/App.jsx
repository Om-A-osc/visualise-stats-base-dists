import { useEffect, useMemo, useState } from "react";
import stdlibDists from "@stdlib/stats/base/dists";
import { DISTRIBUTION_ORDER, getDistributionConfig } from "./distributions";
import {
  barLayout,
  buildQuantiles,
  buildSeries,
  clamp,
  formatStat,
  linePath,
  summarizeStats,
} from "./lib/distributionMath";

const CHART_WIDTH = 520;
const CHART_HEIGHT = 220;

function DistributionChart({ title, points, valueKey, color, discrete }) {
  const valid = points.filter((point) => point[valueKey] !== null);

  if (valid.length === 0) {
    return (
      <section className="panel chart-card">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="empty-state">No samples available for this measure.</div>
      </section>
    );
  }

  const maxValue = Math.max(...valid.map((point) => point[valueKey]), 1);
  const path = !discrete ? linePath(valid, CHART_WIDTH, CHART_HEIGHT, valueKey, maxValue) : "";
  const bars = discrete ? barLayout(valid, CHART_WIDTH, CHART_HEIGHT, valueKey, maxValue) : [];

  return (
    <section className="panel chart-card">
      <div className="card-header">
        <h3>{title}</h3>
        <span>max {formatStat(maxValue)}</span>
      </div>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="plot" role="img" aria-label={`${title} chart`}>
        <line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} className="axis" />
        <line x1="0" y1="0" x2="0" y2={CHART_HEIGHT} className="axis" />
        {discrete
          ? bars.map((bar) => (
              <rect
                key={`${valueKey}-${bar.label}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                rx="2"
                fill={color}
                opacity="0.9"
              />
            ))
          : <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />}
      </svg>
    </section>
  );
}

function App() {
  const availableKeys = useMemo(
    () =>
      DISTRIBUTION_ORDER.filter((key) => {
        const methods = stdlibDists[key];
        return methods && typeof methods.cdf === "function" && (typeof methods.pdf === "function" || typeof methods.pmf === "function");
      }),
    [],
  );
  const [selectedKey, setSelectedKey] = useState(availableKeys[0] ?? "normal");
  const methods = stdlibDists[selectedKey];
  const config = getDistributionConfig(selectedKey, methods);
  const [params, setParams] = useState(() => Object.fromEntries(config.params.map((param) => [param.key, param.defaultValue])));

  useEffect(() => {
    setParams(Object.fromEntries(config.params.map((param) => [param.key, param.defaultValue])));
  }, [selectedKey]);

  const selectedMethods = methods ?? {};
  const normalizedParams = config.normalize ? config.normalize(params) : params;
  const args = config.params.map((param) => normalizedParams[param.key]);
  const range =
    (config.supportFromParams ?? config.domainFromParams)?.(normalizedParams) ??
    config.support ??
    config.domain;
  const series = useMemo(() => buildSeries(selectedMethods, args, range), [selectedKey, ...args]);
  const stats = useMemo(() => summarizeStats(selectedMethods, args), [selectedKey, ...args]);
  const quantiles = useMemo(() => buildQuantiles(selectedMethods, args), [selectedKey, ...args]);
  const isDiscrete = typeof selectedMethods.pmf === "function";
  const cdfSeries = series.map((point) => ({ ...point, cdf: clamp(point.cdf ?? 0, 0, 1) }));

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Stdlib Stats Showcase</p>
          <h1>Interactive distribution explorer</h1>
          <p className="lede">
            Visualize `@stdlib/stats/base/dists` distributions, inspect their shape, and compare the summary metrics stdlib exposes.
          </p>
        </div>

        <label className="field">
          <span>Distribution</span>
          <select value={selectedKey} onChange={(event) => setSelectedKey(event.target.value)}>
            {availableKeys.map((key) => (
              <option key={key} value={key}>
                {getDistributionConfig(key, stdlibDists[key]).label}
              </option>
            ))}
          </select>
        </label>

        <div className="field-group">
          {config.params.map((param) => (
            <label key={param.key} className="field">
              <span>{param.label}</span>
              <div className="slider-wrap">
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={normalizedParams[param.key]}
                  onChange={(event) =>
                    setParams((current) => ({
                      ...current,
                      [param.key]: Number(event.target.value),
                    }))
                  }
                />
                <output>{normalizedParams[param.key]}</output>
              </div>
            </label>
          ))}
        </div>

        <section className="panel">
          <div className="card-header">
            <h3>Methods</h3>
            <span>{config.family}</span>
          </div>
          <div className="chip-grid">
            {Object.keys(selectedMethods)
              .filter((name) => typeof selectedMethods[name] === "function")
              .sort()
              .map((name) => (
                <span key={name} className="chip">
                  {name}
                </span>
              ))}
          </div>
        </section>
      </aside>

      <section className="content">
        <div className="hero panel">
          <div>
            <p className="eyebrow">{config.family} distribution</p>
            <h2>{config.label}</h2>
          </div>
          <p className="lede">
            The plots below are generated directly from stdlib’s distribution functions. Use the controls to inspect how the parameters reshape the density and cumulative behavior.
          </p>
        </div>

        <div className="chart-grid">
          <DistributionChart title={isDiscrete ? "Probability Mass Function" : "Probability Density Function"} points={series} valueKey="primary" color="#ff7a18" discrete={isDiscrete} />
          <DistributionChart title="Cumulative Distribution Function" points={cdfSeries} valueKey="cdf" color="#1f8ef1" discrete={false} />
        </div>

        <div className="panel metrics-grid">
          {stats.map((stat) => (
            <article key={stat.key} className="metric-card">
              <span>{stat.label}</span>
              <strong>{formatStat(stat.value)}</strong>
            </article>
          ))}
        </div>

        <section className="panel">
          <div className="card-header">
            <h3>Quantiles</h3>
            <span>stdlib `quantile`</span>
          </div>
          <div className="quantile-grid">
            {quantiles.map((entry) => (
              <article key={entry.p} className="metric-card">
                <span>{Math.round(entry.p * 100)}th percentile</span>
                <strong>{formatStat(entry.x)}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
