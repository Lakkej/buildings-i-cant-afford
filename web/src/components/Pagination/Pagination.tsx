import {
  Box,
  MenuItem,
  Pagination as PaginationMui,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  setSize: (size: string) => void;
  size: string;
  total: number;
};

export const Pagination = ({
  page,
  setPage,
  setSize,
  size,
  total,
}: PaginationProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSizeChange = (event: SelectChangeEvent) => {
    setPage(1);
    setSize(event.target.value);
  };

  return (
    <Box sx={{ paddingTop: "20px", display: "flex", gap: "10px" }}>
      <PaginationMui
        size="large"
        count={Math.round(total / Number(size))}
        page={page}
        onChange={handleChange}
        color="secondary"
      />
      <Select variant="standard" value={size} onChange={handleSizeChange}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </Box>
  );
};
