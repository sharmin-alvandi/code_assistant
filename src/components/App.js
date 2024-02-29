import { useEffect, useState } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
  <html>
  <style>${css}</style>
    <body>
      ${html}
    </body>
    <script> ${js}</script>
    <script type="text/ruby">
    puts Time.now
  </script>
  </html>`);
    }, 250);
    return () => clearTimeout(timeOut);
  }, [html, js, css]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="Javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          style={{ border: 0 }}
          //frameBorder="0" is deprecated
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default App;
