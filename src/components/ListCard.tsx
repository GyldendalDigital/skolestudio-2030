import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { placeholderImageUrl } from "../utils";
import { Chip, styled } from "@mui/material";
import { Content } from "../data/types";

export default function ListCard({ data }: { data: Content }) {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ height: "100%", width: 100 }}
        image={placeholderImageUrl(data.title)}
        alt="Versågod, Ola 🧐"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <Box>
          <Typography component="div" variant="h5">
            {data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {data.description}
          </Typography>
        </Box>

        <ChipWrapper>
          <Chip
            label={data.subjects.join(", ")}
            variant="outlined"
            size="small"
          />
          {data.topics.map((topic, i) => (
            <Chip key={i} label={topic} variant="outlined" size="small" />
          ))}
        </ChipWrapper>
      </CardContent>
    </Card>
  );
}

const ChipWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
}));
