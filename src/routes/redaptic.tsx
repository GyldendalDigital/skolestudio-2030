import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, TextField } from "@mui/material";
import {
  content as dbContent,
  createLocalContent,
  deleteLocalContent,
  getAllContent,
} from "../data/content";
import { Link } from "@tanstack/react-router";
import redapticLogo from "../redaptic.svg";
import { SButton } from "../components/RS-button";
import styles from "./redaptic.module.css";
import ListCard from "../components/ListCard";
import globalStyles from "./global.module.css";

export const Route = createFileRoute("/redaptic")({
  component: Redaptic,
});

function Redaptic() {
  const [searchText, setSearchText] = React.useState("");

  const [content, setContent] = React.useState(getAllContent());

  return (
    <div className={globalStyles.pageWrapper}>
      <header>
        <Link to="/redaptic">
          <img src={redapticLogo} alt="Redaptic" />
        </Link>
        <TextField
          label="Søk i innhold"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            const data = {
              title: "Nytt innhold",
              description: "",
              subject: "Norsk",
              topics: ["Verb"],
            };
            createLocalContent(data);
            setContent([data, ...content]);
          }}
        >
          Lag innhold
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            deleteLocalContent();
            setContent(dbContent);
          }}
        >
          Slett innhold
        </Button>
      </header>

      <main>
        <div className={styles.grid}>
          {content
            .filter(
              (x) =>
                !searchText ||
                [x.title, x.description, x.subject, ...x.topics]
                  .join(" ")
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            .map((x, i) => (
              <ListCard key={i} data={x} />
            ))}
        </div>
      </main>

      <SButton />
    </div>
  );
}