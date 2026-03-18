import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const readmeModules = import.meta.glob(
  "../../node_modules/@stdlib/stats/base/dists/**/README.md",
  { as: "raw" }
);

const readmeMap = {};
for (const path in readmeModules) {
  const match = path.match(/dists\/(.*?)\/README\.md$/);
  if (match) {
    readmeMap[match[1]] = readmeModules[path];
  }
}

export default function ReadmePanel({ distributionKey, config }) {
  const [readmeContent, setReadmeContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReadmeContent("");

    const loadReadme = async () => {
      try {
        // Try to load the README for this distribution
        if (readmeMap[distributionKey]) {
          const text = await readmeMap[distributionKey]();
          setReadmeContent(text);
        } else {
          // Use fallback if README not found
          setReadmeContent(generateFallback());
        }
      } catch (err) {
        console.error("Failed to load README:", err);
        setReadmeContent(generateFallback());
      } finally {
        setLoading(false);
      }
    };

    const generateFallback = () => {
      return `# ${config.label}

        ## Overview
        This is the ${config.label} distribution from the @stdlib/stats/base/dists namespace.

        ## Family
        **${config.family}**

        ## Parameters
        ${config.params.map(p => `- **${p.label}** (${p.key}): Range [${p.min}, ${p.max}]`).join('\n')}

        ## Information
        This interactive tool allows you to explore the properties of the ${config.label} distribution by adjusting its parameters in real-time.

        ### Supported Methods
        The following methods are available for this distribution:
        - **pdf(x${config.params.length > 0 ? ', ...' : ''})** - Probability Density Function
        - **cdf(x${config.params.length > 0 ? ', ...' : ''})** - Cumulative Distribution Function  
        - **quantile(p${config.params.length > 0 ? ', ...' : ''})** - Quantile Function

        ## How to Use
        1. Adjust the sliders on the left to change distribution parameters
        2. Watch the charts update in real-time
        3. View statistical metrics like mean, variance, and quantiles
        4. Check the function signatures for method details`;
    };

    loadReadme();
  }, [distributionKey, config.label, config.family, config.params]);

  return (
    <aside className="readme-panel panel">
      <div className="readme-header">
        <h3>Distribution Guide</h3>
        <span>{config.label}</span>
      </div>

      <div className="readme-content">
        {loading ? (
          <div className="loading-state">Loading documentation...</div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 {...props} />,
                h2: ({node, ...props}) => <h2 {...props} />,
                h3: ({node, ...props}) => <h3 {...props} />,
                h4: ({node, ...props}) => <h4 {...props} />,
                h5: ({node, ...props}) => <h5 {...props} />,
                p: ({node, ...props}) => <p {...props} />,
                a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? <code className="md-code-inline" {...props} /> : <code {...props} />,
                pre: ({node, ...props}) => <pre {...props} />,
                ul: ({node, ...props}) => <ul {...props} />,
                ol: ({node, ...props}) => <ol {...props} />,
                li: ({node, ...props}) => <li {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="md-blockquote" {...props} />,
              }}
            >
              {readmeContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </aside>
  );
}
