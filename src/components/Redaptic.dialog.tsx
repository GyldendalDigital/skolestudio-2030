import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Content } from "../data/types";
import { InputLabel, Select, MenuItem, Box, Chip } from "@mui/material";
import { subjects } from "../data/types";
import { sortedData, groupedData, uniqueBy } from "../utils";
import { dbContentV1 } from "../data/content";
import { getLocalContent } from "../data/local";

type Props = {
  content: Content | null;
  handleClose: () => void;
  handleSave: (content: Content) => void;
};

export default function RedapticDialog({
  content,
  handleClose,
  handleSave,
}: Props) {
  if (content === null) {
    return null;
  }

  const allContent = uniqueBy([...getLocalContent(), ...dbContentV1], "slug");

  const topicFacetOptions = React.useMemo(
    () =>
      sortedData(groupedData(allContent, "topics")).map(([topic, _]) => topic),
    [content]
  );

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="lg"
      sx={{ minWidth: "320px" }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const { title, description, body, subjects, topics } = formJson;
          console.log("form", formJson);
          const newContent = {
            ...content,
            title,
            description,
            body,
            subjects: subjects.split(","),
            topics: topics.split(","),
          };
          handleSave(newContent);
          handleClose();
        },
      }}
    >
      <DialogTitle>
        <TextField
          autoFocus
          required
          margin="normal"
          name="title"
          label="Tittel"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={content.title}
        />
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="normal"
          name="description"
          label="Beskrivelse"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={content.description}
        />
        <TextField
          required
          margin="normal"
          name="body"
          label="Brødtekst"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={content.body}
          multiline
        />
        <br />
        <br />
        <InputLabel id="subjects">Fag</InputLabel>
        <Select
          labelId="subjects"
          name="subjects"
          multiple
          defaultValue={content.subjects}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={menuProps()}
        >
          {subjects.map((name) => (
            <MenuItem
              key={name}
              value={name}
              selected={content.subjects.indexOf(name) !== -1}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <InputLabel id="topics">Tema</InputLabel>
        <Select
          labelId="topics"
          name="topics"
          multiple
          defaultValue={content.topics}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={menuProps()}
        >
          {topicFacetOptions.map((name) => (
            <MenuItem
              key={name}
              value={name}
              selected={content.topics.indexOf(name) !== -1}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button type="submit">Lagre</Button>
      </DialogActions>
    </Dialog>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const menuProps = () => ({
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
});
