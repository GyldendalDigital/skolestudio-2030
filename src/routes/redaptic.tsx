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
  getLocalContent,
} from "../data/local";
import RedapticDialog from "../components/Redaptic.dialog";
import { Content } from "../data/types";
import { uniqueBy } from "../utils";

export const Route = createFileRoute("/redaptic")({
  component: Redaptic,
});

function Redaptic() {
  const [searchText, setSearchText] = React.useState("");

  const [localContent, setLocalContent] = React.useState(getLocalContent());

  const [selectedContent, setSelectedContent] = React.useState<Content | null>(
    null
  );

  const content = uniqueBy([...localContent, ...dbContentV1], "slug");

  return (
    <div className={styles.pageWrapper}>
      <header>
        <Link to="/redaptic">
          <img src={redapticLogo} alt="Redaptic logo" />
        </Link>
        <TextField
          label="Søk i innhold"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
        />
        <div style={{ display: "flex", gap: "1rem", height: "100%" }}>
          <Button
            variant="outlined"
            onClick={() => {
              const data = createEmptyContent();
              createLocalContent(data);
              setLocalContent([data, ...localContent]);
            }}
          >
            Lag innhold
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              deleteLocalContent();
              setLocalContent([]);
            }}
          >
            Slett innhold
          </Button>
        </div>
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
              <ListCard
                key={i}
                data={x}
                onCardClick={() => setSelectedContent(x)}
              />
            ))}
        </div>
      </main>

      <RedapticDialog
        content={selectedContent}
        handleClose={() => setSelectedContent(null)}
        handleSave={(content) => {
          createLocalContent(content);
          const newLocalContents = localContent.map((x) =>
            x.slug === content.slug ? content : x
          );
          setLocalContent(newLocalContents);
        }}
      />

      <SButton />
    </div>
  );
}
