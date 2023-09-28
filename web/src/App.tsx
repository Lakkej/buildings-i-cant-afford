import { Typography } from "@mui/material";
import { Pagination, PropertyList } from "./components";
import { useProperties } from "./hooks";

import "./App.css";

function App() {
  const { fetching, page, properties, setPage, setSize, size, total } =
    useProperties();

  return (
    <div className="App">
      <header className="App-header">
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          Flats I cannot afford
        </Typography>
      </header>
      <PropertyList fetching={fetching} properties={properties} />
      <Pagination
        page={page}
        setPage={setPage}
        setSize={setSize}
        size={size}
        total={total}
      />
    </div>
  );
}

export default App;
