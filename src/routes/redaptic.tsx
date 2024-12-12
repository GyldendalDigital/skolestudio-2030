import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, TextField } from "@mui/material";
import { dbContentV1 } from "../data/content";
import { Link } from "@tanstack/react-router";
import redapticLogo from "../redaptic.svg";
import { SButton } from "../components/RS-button";
import styles from "./redaptic.module.css";
import ListCard from "../components/ListCard";
import {
  createEmptyContent,
  createLocalContent,
  deleteLocalContent,
} from "../data/local";

export const Route = createFileRoute("/redaptic")({
  component: Redaptic,
});

function Redaptic() {
  const [searchText, setSearchText] = React.useState("");

  const [content, setContent] = React.useState([...dbContentV1]);

  return (
    <div className={styles.pageWrapper}>
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
            const data = createEmptyContent();
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
            setContent(dbContentV1);
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
                [x.title, x.description, ...x.subjects, ...x.topics]
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
