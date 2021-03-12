import SyntaxHighlighter from "react-syntax-highlighter";
import {dark, atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
const SyntaxHighlight = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  );
};

export { SyntaxHighlight };
