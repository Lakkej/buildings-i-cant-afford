import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Property } from "../../../../types";

type PropertyTileProps = { property: Property };

export const PropertyTile = ({ property }: PropertyTileProps) => {
  const { locality, price, title, image_url } = property;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <img src={image_url} alt={`${title}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`Flat on ${locality}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" fontSize={"1.2rem"}>
          {price}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
