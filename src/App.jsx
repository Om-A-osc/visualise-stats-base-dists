import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import stdlibDists from "@stdlib/stats/base/dists";
import { DISTRIBUTION_GROUPS, DISTRIBUTION_ORDER, getDistributionConfig } from "./distributions";
import {
  barLayout,
  buildQuantiles,
  buildSeries,
  clamp,
  createTicks,
  formatAxisValue,
  formatStat,
  getChartBounds,
  linePath,
  scaleX,
  scaleY,
  summarizeStats,
} from "./lib/distributionMath";

const CHART_WIDTH = 680;
const CHART_HEIGHT = 320;
const CHART_MARGIN = { top: 18, right: 18, bottom: 42, left: 58 };
const INNER_WIDTH = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right;
const INNER_HEIGHT = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;

function getMethodSignatures(methods, params) {
  const paramList = params.map((param) => param.key).join(", ");
  const signatures = [];

  if (typeof methods.pdf === "function") {
    signatures.push(`pdf(x${paramList ? `, ${paramList}` : ""})`);
  }
  if (typeof methods.pmf === "function") {
    signatures.push(`pmf(x${paramList ? `, ${paramList}` : ""})`);
  }
  if (typeof methods.cdf === "function") {
    signatures.push(`cdf(x${paramList ? `, ${paramList}` : ""})`);
  }
  if (typeof methods.quantile === "function") {
    signatures.push(`quantile(p${paramList ? `, ${paramList}` : ""})`);
  }

  return signatures;
}

function DistributionChart({ title, points, valueKey, color, discrete }) {
  const bounds = getChartBounds(points, valueKey);

  if (!bounds) {
    return (
      <section className="panel chart-card">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="empty-state">No samples available for this measure.</div>
      </section>
    );
  }

  const xTicks = createTicks(bounds.xMin, bounds.xMax, discrete ? Math.min(6, points.length || 1) : 6);
  const yTicks = createTicks(bounds.yMin, bounds.yMax, 5);
  const path = !discrete ? linePath(points, bounds, INNER_WIDTH, INNER_HEIGHT, valueKey) : "";
  const bars = discrete ? barLayout(points, bounds, INNER_WIDTH, INNER_HEIGHT, valueKey) : [];

  return (
    <section className="panel chart-card">
      <div className="card-header">
        <h3>{title}</h3>
        <span>
          x [{formatAxisValue(bounds.xMin)}, {formatAxisValue(bounds.xMax)}] y [{formatAxisValue(bounds.yMin)}, {formatAxisValue(bounds.yMax)}]
        </span>
      </div>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="plot" role="img" aria-label={`${title} chart`}>
        <g transform={`translate(${CHART_MARGIN.left}, ${CHART_MARGIN.top})`}>
          {yTicks.map((tick) => {
            const y = scaleY(tick, bounds, INNER_HEIGHT);
            return (
              <g key={`y-${tick}`}>
                <line x1="0" y1={y} x2={INNER_WIDTH} y2={y} className="grid-line" />
                <text x="-10" y={y + 4} textAnchor="end" className="axis-label">
                  {formatAxisValue(tick)}
                </text>
              </g>
            );
          })}

          {xTicks.map((tick) => {
            const x = scaleX(tick, bounds, INNER_WIDTH);
            return (
              <g key={`x-${tick}`}>
                <line x1={x} y1="0" x2={x} y2={INNER_HEIGHT} className="grid-line grid-line-vertical" />
                <text x={x} y={INNER_HEIGHT + 22} textAnchor="middle" className="axis-label">
                  {formatAxisValue(tick)}
                </text>
              </g>
            );
          })}

          <line x1="0" y1={INNER_HEIGHT} x2={INNER_WIDTH} y2={INNER_HEIGHT} className="axis" />
          <line x1="0" y1="0" x2="0" y2={INNER_HEIGHT} className="axis" />

          {discrete
            ? bars.map((bar) => (
                <rect
                  key={`${valueKey}-${bar.label}`}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  rx="3"
                  fill={color}
                  className="plot-bar"
                />
              ))
            : (
                <>
                  <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" className="plot-line" />
                  {points
                    .filter((point) => point[valueKey] !== null)
                    .filter((_, index, list) => index % Math.max(1, Math.floor(list.length / 24)) === 0)
                    .map((point) => (
                      <circle
                        key={`${valueKey}-${point.x}`}
                        cx={scaleX(point.x, bounds, INNER_WIDTH)}
                        cy={scaleY(point[valueKey], bounds, INNER_HEIGHT)}
                        r="2.5"
                        fill={color}
                        className="plot-dot"
                      />
                    ))}
                </>
              )}
        </g>
      </svg>
    </section>
  );
}

function App() {
  const availableKeys = useMemo(
    () =>
      DISTRIBUTION_ORDER.filter((key) => {
        const methods = stdlibDists[key];
        return methods && (typeof methods.pdf === "function" || typeof methods.pmf === "function" || typeof methods.cdf === "function");
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
  const deferredParams = useDeferredValue(normalizedParams);
  const args = config.params.map((param) => deferredParams[param.key]);
  const hasPdf = typeof selectedMethods.pdf === "function";
  const hasPmf = typeof selectedMethods.pmf === "function";
  const hasCdf = typeof selectedMethods.cdf === "function";
  const isDiscrete = hasPmf && !hasPdf;
  const range =
    (config.supportFromParams ?? config.domainFromParams)?.(deferredParams) ??
    config.support ??
    config.domain;
  const series = useMemo(() => buildSeries(selectedMethods, args, range, isDiscrete), [selectedKey, isDiscrete, ...args]);
  const stats = useMemo(() => summarizeStats(selectedMethods, args), [selectedKey, ...args]);
  const quantiles = useMemo(() => buildQuantiles(selectedMethods, args), [selectedKey, ...args]);
  const cdfSeries = useMemo(
    () => series.map((point) => ({ ...point, cdf: clamp(point.cdf ?? 0, 0, 1) })),
    [series],
  );
  const methodSignatures = getMethodSignatures(selectedMethods, config.params);
  const chartCount = [hasPdf || hasPmf, hasCdf].filter(Boolean).length;

  return (
    <main className="app-shell">
      <aside className="sidebar panel">
        <div>
          <p className="eyebrow">Stdlib Stats Showcase</p>
          <h1>Interactive distribution explorer</h1>
          <p className="lede">
            Explore the documented `@stdlib/stats/base/dists` namespace with parameter-accurate plots, summary statistics, and method signatures.
          </p>
        </div>

        <div className="overview-grid">
          <article className="overview-card">
            <span>Family</span>
            <strong>{config.family}</strong>
          </article>
          <article className="overview-card">
            <span>Plots</span>
            <strong>{chartCount}</strong>
          </article>
          <article className="overview-card">
            <span>Parameters</span>
            <strong>{config.params.length}</strong>
          </article>
        </div>

        <label className="field">
          <span>Distribution</span>
          <select
            value={selectedKey}
            onChange={(event) =>
              startTransition(() => {
                setSelectedKey(event.target.value);
              })
            }
          >
            {availableKeys.map((key) => (
              <option key={key} value={key}>
                {getDistributionConfig(key, stdlibDists[key]).label}
              </option>
            ))}
          </select>
        </label>

        <div className="field-group">
          {config.params.map((param) => (
            <label key={param.key} className="field control-card">
              <div className="field-row">
                <span>{param.label}</span>
                <code>{param.key}</code>
              </div>
              <div className="slider-wrap">
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={params[param.key]}
                  onChange={(event) =>
                    setParams((current) => ({
                      ...current,
                      [param.key]: Number(event.target.value),
                    }))
                  }
                />
                <input
                  type="number"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={params[param.key]}
                  onChange={(event) =>
                    setParams((current) => ({
                      ...current,
                      [param.key]: Number(event.target.value),
                    }))
                  }
                />
              </div>
              <output>{formatAxisValue(normalizedParams[param.key])}</output>
            </label>
          ))}
        </div>

        <section className="panel inset-panel">
          <div className="card-header">
            <h3>Function Signatures</h3>
            <span>{config.family}</span>
          </div>
          <div className="chip-grid">
            {methodSignatures.map((signature) => (
              <span key={signature} className="chip">
                {signature}
              </span>
            ))}
          </div>
        </section>
      </aside>

      <section className="content">
        <div className="hero panel">
          <div>
            <p className="eyebrow">{config.family || DISTRIBUTION_GROUPS.other} distribution</p>
            <h2>{config.label}</h2>
          </div>
          <p className="lede">
            Charts are sampled directly from stdlib functions with stable point density and explicit axes, so parameter updates stay responsive while the graph remains readable.
          </p>
        </div>

        <div className="chart-grid">
          {(hasPdf || hasPmf) && (
            <DistributionChart
              title={hasPmf && !hasPdf ? "Probability Mass Function" : "Probability Density Function"}
              points={series}
              valueKey="primary"
              color="#ff7a18"
              discrete={isDiscrete}
            />
          )}
          {hasCdf && (
            <DistributionChart
              title="Cumulative Distribution Function"
              points={cdfSeries}
              valueKey="cdf"
              color="#1f8ef1"
              discrete={false}
            />
          )}
        </div>

        {stats.length > 0 && (
          <div className="panel metrics-grid">
            {stats.map((stat) => (
              <article key={stat.key} className="metric-card">
                <span>{stat.label}</span>
                <strong>{formatStat(stat.value)}</strong>
              </article>
            ))}
          </div>
        )}

        {quantiles.length > 0 && (
          <section className="panel quantile-panel">
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
        )}
      </section>
    </main>
  );
}

export default App;
