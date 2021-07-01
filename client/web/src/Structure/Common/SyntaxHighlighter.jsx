import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SyntaxHighlight = ({ value, language, style }) => {
  let design = style ? { ...style, border: "none !important" } : solarizedLight;
  return (
    <SyntaxHighlighter language={language} style={design} wrapLongLines={true}>
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
