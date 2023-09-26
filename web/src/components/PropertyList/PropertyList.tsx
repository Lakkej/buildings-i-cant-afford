import { PropertyTile } from "./components";
import { Box, Paper } from "@mui/material";
import { Property } from "../../types";

import "./PropertyList.css";

type PropertyListProps = {
  fetching: boolean;
  properties: Property[];
};

export const PropertyList = ({ fetching, properties }: PropertyListProps) => {
  return (
    <Paper
      elevation={5}
      sx={{
        width: "75%",
        height: "100%",
        padding: "20px",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: fetching ? "center" : "space-between",
          alignItems: "center",
          height: "100%",
          gap: "20px",
        }}
      >
        {fetching ? (
          <span className="loader" />
        ) : (
          properties.map((property) => <PropertyTile property={property} />)
        )}
      </Box>
    </Paper>
  );
};
