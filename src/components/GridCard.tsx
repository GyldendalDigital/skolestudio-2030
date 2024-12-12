import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { placeholderImageUrl } from "../utils";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Content } from "../data/types";

export default function GridCard({
  data,
  onTopicClick,
}: {
  data: Content;
  onTopicClick: (topicValue: string) => void;
}) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={placeholderImageUrl(data.title)}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
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
            <Chip
              key={i}
              label={topic}
              variant="outlined"
              size="small"
              onClick={() => onTopicClick(topic)}
            />
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
