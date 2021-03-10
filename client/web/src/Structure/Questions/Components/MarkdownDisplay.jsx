import React from "react";
import { mdown } from "../../../Utils/md";

const MarkdownDisplay = (props) => {
  const md = props.source;
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.innerHTML = mdown(md);
  }, [md]);
  return (
    <>
      {props.title && <div> {props.title} </div>}
      <div ref={ref}></div>
    </>
  );
};

export { MarkdownDisplay };
