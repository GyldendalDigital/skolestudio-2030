import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Chip, IconButton, TextField } from "@mui/material";
import GridCard from "../components/GridCard";
import { groupedData, sortedData } from "../utils";
import styles from "./skolestudio.module.css";
import { RButton } from "../components/RS-button";
import { Link } from "@tanstack/react-router";
import skolestudioLogo from "../skolestudio.svg";
import { getLocalContent } from "../data/local";
import { dbContentV1 } from "../data/content";
import SkolestudioMenu from "../components/Skolestudio.menu";
import FilterIcon from "@mui/icons-material/Tune";
import { bgColor, textColor, textColorLight } from "../theme";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const contentSearchSchema = z.object({
  text: z.string().optional(),
  subjects: z.string().array().optional(),
  lectureTypes: z.string().array().optional(),
  contentTypes: z.string().array().optional(),
  formats: z.string().array().optional(),
  topics: z.string().array().optional(),
});

export const Route = createFileRoute("/skolestudio")({
  component: Skolestudio,
  validateSearch: zodValidator(contentSearchSchema),
});

type Item = {
  label: string;
  value: string;
  count: number;
};

function Skolestudio() {
  const navigate = useNavigate({ from: Route.fullPath });

  // const [searchText, setSearchText] = React.useState("");
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  const content = [...getLocalContent(), ...dbContentV1];

  const topicFacetOptions: Item[] = sortedData(
    groupedData(content, "topics")
  ).map(([topic, records]) => ({
    label: topic,
    value: topic,
    count: records.length,
  }));
  const subjectsFacetOptions: Item[] = sortedData(
    groupedData(content, "subjects")
  ).map(([topic, records]) => ({
    label: topic,
    value: topic,
    count: records.length,
  }));
  const lectureTypesFacetOptions: Item[] = sortedData(
    groupedData(content, "lectureTypes")
  ).map(([topic, records]) => ({
    label: topic,
    value: topic,
    count: records.length,
  }));
  const contentTypesFacetOptions: Item[] = sortedData(
    groupedData(content, "contentTypes")
  ).map(([topic, records]) => ({
    label: topic,
    value: topic,
    count: records.length,
  }));
  const formatsFacetOptions: Item[] = sortedData(
    groupedData(content, "formats")
  ).map(([topic, records]) => ({
    label: topic,
    value: topic,
    count: records.length,
  }));

  const onFiltering = (filterProp: string, filterValue: string) => {
    navigate({
      search: (prev) => {
        if (!prev[filterProp]) {
          return { [filterProp]: [filterValue] };
        }

        if (!prev[filterProp].includes(filterValue)) {
          return {
            [filterProp]: [...prev[filterProp], filterValue],
          };
        }

        if (prev[filterProp].length === 1) {
          return {
            [filterProp]: undefined,
          };
        }

        return {
          [filterProp]: prev[filterProp].filter((v) => v !== filterValue),
        };
      },
    });
  };

  const { subjects, contentTypes, formats, lectureTypes, text, topics } =
    Route.useSearch();

  return (
    <div className={styles.pageWrapper}>
      <header>
        <Link to="/skolestudio">
          <img src={skolestudioLogo} alt="Skolestudio" />
        </Link>
        <TextField
          label="Søk i innhold"
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onFiltering("text", event.target.value);
          }}
        />
        <SkolestudioMenu />
      </header>

      <section className={styles.topicGrid}>
        <IconButton
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          color="primary"
          sx={{
            background: showFilterPanel ? textColor : undefined,
            color: showFilterPanel ? bgColor : undefined,
            ":hover": {
              background: showFilterPanel ? textColorLight : undefined,
              color: showFilterPanel ? bgColor : undefined,
            },
          }}
        >
          <FilterIcon />
        </IconButton>
        {topicFacetOptions
          .filter(
            (topicFacet) =>
              !text ||
              topicFacet.label.toLowerCase().includes(text.toLowerCase())
          )
          .map((topicFacet, i) => (
            <Chip
              key={i}
              label={topicFacet.label + ` (${topicFacet.count})`}
              color={topics?.includes(topicFacet.value) ? "primary" : "default"}
              variant={
                topics?.includes(topicFacet.value) ? "filled" : "outlined"
              }
              onClick={() => {
                onFiltering("topics", topicFacet.value);
              }}
            />
          ))}
      </section>
      <section
        className={styles.topicGrid}
        style={{
          height: showFilterPanel ? undefined : 0,
        }}
      >
        {subjectsFacetOptions
          .filter(
            (topicFacet) =>
              !text ||
              topicFacet.label.toLowerCase().includes(text.toLowerCase())
          )
          .map((topicFacet, i) => (
            <Chip
              key={i}
              label={topicFacet.label + ` (${topicFacet.count})`}
              color={topics?.includes(topicFacet.value) ? "primary" : "default"}
              variant={
                topics?.includes(topicFacet.value) ? "filled" : "outlined"
              }
              onClick={() => {
                onFiltering("subjects", topicFacet.value);
              }}
            />
          ))}
      </section>

      <main>
        <div className={styles.contentGrid}>
          {content
            .filter(
              (x) =>
                !text ||
                [x.title, x.description, ...x.subjects, ...x.topics]
                  .join(" ")
                  .toLowerCase()
                  .includes(text.toLowerCase())
            )
            .filter(
              (c) =>
                !topics ||
                topics.length === 0 ||
                c.topics.some((t) => topics.includes(t))
            )
            .map((item, i) => (
              <GridCard
                key={i}
                data={item}
                onTopicClick={(value) => onFiltering("topics", value)}
              />
            ))}
        </div>
      </main>

      <RButton />
    </div>
  );
}
