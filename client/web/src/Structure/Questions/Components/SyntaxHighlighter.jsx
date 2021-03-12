import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const SyntaxHighlight = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
