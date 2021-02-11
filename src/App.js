import React, { useState } from "react";

import { Advanced } from "./advanced";
import { Complex } from "./complex";
import { Simple } from "./simple";

const pages = [Simple, Advanced, Complex];

function App() {
  const [page, setPage] = useState(0);

  const PageComponent = pages[page];

  return (
    <>
      <h2>Demos</h2>

      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setPage(0)}>Simple</button>
        <button onClick={() => setPage(1)}>Advanced</button>
        <button onClick={() => setPage(2)}>Complex</button>
      </div>

      <PageComponent />
    </>
  );
}

export default App;
