import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SyntaxHighlight = ({ value, language }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={solarizedLight}
      wrapLongLines={true}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
