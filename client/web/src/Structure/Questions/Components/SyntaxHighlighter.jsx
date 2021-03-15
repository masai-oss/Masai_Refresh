import SyntaxHighlighter from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlight = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={duotoneDark}>
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
