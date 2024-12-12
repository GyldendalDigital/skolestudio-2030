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
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Content } from "../data/types";

const contentSearchSchema = z.object({
  text: z.string().optional(),
  subjects: z.string().array().optional(),
  lectureTypes: z.string().array().optional(),
  contentTypes: z.string().array().optional(),
  formats: z.string().array().optional(),
  topics: z.string().array().optional(),
});
type ContentSearch = z.infer<typeof contentSearchSchema>;

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

  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  const content = [...getLocalContent(), ...dbContentV1];

  const search = Route.useSearch();
  const { subjects, contentTypes, formats, lectureTypes, text, topics } =
    search;
    const [searchText, setSearchText] = React.useState(text ?? "");

  const contentFilter = (content: Content) => {
    const textFilter =
      !searchText ||
      [
        content.title,
        content.description,
        ...content.subjects,
        ...content.topics,
        ...content.lectureTypes,
        ...content.contentTypes,
        ...content.formats,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase());

    if (!textFilter) return false;

    for (const key in search) {
      const filterValue = search[key as keyof ContentSearch];
      if (!filterValue) continue;
      if (!Array.isArray(filterValue)) continue;
      if (filterValue.length === 0) continue;

      const contentTagValue = content[key as keyof Content];
      if (!contentTagValue) return false;
      if (!Array.isArray(contentTagValue)) return false;
      if (contentTagValue.length === 0) return false;
      if (!contentTagValue.some((v) => filterValue.includes(v))) return false;
    }

    return true;
  };

  const onFiltering = (
    filterProp: keyof ContentSearch,
    filterValue: string
  ) => {
    navigate({
      search: (prev) => {
        if (filterProp === "text") {
          setSearchText(filterValue); //TODO: veldig dårlig performance på tekst filtrering. Kanskje noe memo?
          return {
            ...prev,
            text: filterValue ? filterValue : undefined,
          };
        }

        if (!prev[filterProp]) {
          return {
            ...prev,
            [filterProp]: [filterValue],
          };
        }

        if (!prev[filterProp].includes(filterValue)) {
          return {
            ...prev,
            [filterProp]: [...prev[filterProp], filterValue],
          };
        }

        if (prev[filterProp].length === 1) {
          return {
            ...prev,
            [filterProp]: undefined,
          };
        }

        return {
            ...prev,
            [filterProp]: prev[filterProp].filter((v) => v !== filterValue),
        };
      },
    });
  };
  const tagFilter = (tagValue: Item) =>
    !searchText || tagValue.label.toLowerCase().includes(searchText.toLowerCase());

  const topicFacetOptions: Item[] = sortedData(groupedData(content, "topics"))
    .map(([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    }))
    .filter(tagFilter);
  const subjectsFacetOptions: Item[] = sortedData(
    groupedData(content, "subjects")
  )
    .map(([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    }))
    .filter(tagFilter);
  const lectureTypesFacetOptions: Item[] = sortedData(
    groupedData(content, "lectureTypes")
  )
    .map(([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    }))
    .filter(tagFilter);
  const contentTypesFacetOptions: Item[] = sortedData(
    groupedData(content, "contentTypes")
  )
    .map(([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    }))
    .filter(tagFilter);
  const formatsFacetOptions: Item[] = sortedData(
    groupedData(content, "formats")
  )
    .map(([topic, records]) => ({
      label: topic,
      value: topic,
      count: records.length,
    }))
    .filter(tagFilter);

  return (
    <div className={styles.pageWrapper}>
      <header>
        <Link to="/skolestudio">
          <img src={skolestudioLogo} alt="Skolestudio" />
        </Link>
        <TextField
          label="Søk i innhold"
          value={searchText}
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
              !searchText ||
              topicFacet.label.toLowerCase().includes(searchText.toLowerCase())
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
          display:
            showFilterPanel && subjectsFacetOptions.length > 0
              ? undefined
              : "none",
          paddingLeft: "calc(0.5rem + 40px)",
        }}
      >
        {subjectsFacetOptions.map((facet, i) => (
          <Chip
            key={i}
            label={facet.label + ` (${facet.count})`}
            color={subjects?.includes(facet.value) ? "primary" : "default"}
            variant={subjects?.includes(facet.value) ? "filled" : "outlined"}
            onClick={() => {
              onFiltering("subjects", facet.value);
            }}
          />
        ))}
      </section>
      <section
        className={styles.topicGrid}
        style={{
          display:
            showFilterPanel && lectureTypesFacetOptions.length
              ? undefined
              : "none",
          paddingLeft: "calc(0.5rem + 40px)",
        }}
      >
        {lectureTypesFacetOptions.map((facet, i) => (
          <Chip
            key={i}
            label={facet.label + ` (${facet.count})`}
            color={lectureTypes?.includes(facet.value) ? "primary" : "default"}
            variant={
              lectureTypes?.includes(facet.value) ? "filled" : "outlined"
            }
            onClick={() => {
              onFiltering("lectureTypes", facet.value);
            }}
          />
        ))}
      </section>
      <section
        className={styles.topicGrid}
        style={{
          display:
            showFilterPanel && contentTypesFacetOptions.length
              ? undefined
              : "none",
          paddingLeft: "calc(0.5rem + 40px)",
        }}
      >
        {contentTypesFacetOptions.map((facet, i) => (
          <Chip
            key={i}
            label={facet.label + ` (${facet.count})`}
            color={contentTypes?.includes(facet.value) ? "primary" : "default"}
            variant={
              contentTypes?.includes(facet.value) ? "filled" : "outlined"
            }
            onClick={() => {
              onFiltering("contentTypes", facet.value);
            }}
          />
        ))}
      </section>
      <section
        className={styles.topicGrid}
        style={{
          display:
            showFilterPanel && formatsFacetOptions.length ? undefined : "none",
          paddingLeft: "calc(0.5rem + 40px)",
        }}
      >
        {formatsFacetOptions.map((facet, i) => (
          <Chip
            key={i}
            label={facet.label + ` (${facet.count})`}
            color={formats?.includes(facet.value) ? "primary" : "default"}
            variant={formats?.includes(facet.value) ? "filled" : "outlined"}
            onClick={() => {
              onFiltering("formats", facet.value);
            }}
          />
        ))}
      </section>

      <main>
        <div className={styles.contentGrid}>
          {content.filter(contentFilter).map((item, i) => (
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
