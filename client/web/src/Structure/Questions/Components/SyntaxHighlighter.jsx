import SyntaxHighlighter from "react-syntax-highlighter";
import { kimbieDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
const SyntaxHighlight = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={kimbieDark}>
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
