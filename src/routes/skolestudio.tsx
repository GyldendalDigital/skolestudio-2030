import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chip, TextField } from "@mui/material";
import GridCard from "../components/GridCard";
import { groupedData, sortedData } from "../utils";
import globalStyles from "./global.module.css";
import styles from "./skolestudio.module.css";
import { RButton } from "../components/RS-button";
import { Link } from "@tanstack/react-router";
import skolestudioLogo from "../skolestudio.svg";
import { getLocalContent } from "../data/local";
import { dbContentV1 } from "../data/content";

export const Route = createFileRoute("/skolestudio")({
  component: Skolestudio,
});

type Item = {
  label: string;
  value: string;
  count: number;
};

function Skolestudio() {
  const [searchText, setSearchText] = React.useState("");

  const content = [...getLocalContent(), ...dbContentV1];

  const topicFacetOptions: Item[] = sortedData(groupedData(content)).map(
    ([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    })
  );

  const [selectedTopicValues, setSelectedTopicValues] = React.useState<
    string[]
  >([]);

  const onTopicClick = (topicValue: string) => {
    if (selectedTopicValues.includes(topicValue)) {
      setSelectedTopicValues(
        selectedTopicValues.filter((v) => v !== topicValue)
      );
    } else {
      setSelectedTopicValues([...selectedTopicValues, topicValue]);
    }
  };

  return (
    <div className={globalStyles.pageWrapper}>
      <header>
        <Link to="/skolestudio">
          <img src={skolestudioLogo} alt="Skolestudio" />
        </Link>
        <TextField
          label="Søk i innhold"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
        />
      </header>

      <section className={styles.topicGrid}>
        {topicFacetOptions
          .filter(
            (topicFacet) =>
              !searchText ||
              topicFacet.label.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((topicFacet, i) => (
            <Chip
              key={i}
              label={topicFacet.label + ` (${topicFacet.count})`}
              color={
                selectedTopicValues.includes(topicFacet.value)
                  ? "primary"
                  : "default"
              }
              variant={
                selectedTopicValues.includes(topicFacet.value)
                  ? "filled"
                  : "outlined"
              }
              onClick={() => {
                onTopicClick(topicFacet.value);
              }}
            />
          ))}
      </section>

      <main>
        <div className={styles.contentGrid}>
          {content
            .filter(
              (x) =>
                !searchText ||
                [x.title, x.description, ...x.subjects, ...x.topics]
                  .join(" ")
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            .filter(
              (c) =>
                selectedTopicValues.length === 0 ||
                c.topics.some((t) => selectedTopicValues.includes(t))
            )
            .map((item, i) => (
              <GridCard key={i} data={item} onTopicClick={onTopicClick} />
            ))}
        </div>
      </main>

      <RButton />
    </div>
  );
}
