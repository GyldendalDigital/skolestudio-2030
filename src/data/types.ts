export const subjects = [
  "Norsk",
  "Engelsk",
  "Samfunnsfag",
  "Naturfag",
  "Matematikk",
  "KRLE",
  "Kunst og håndverk",
  "Kroppsøving",
  "Musikk",
  "Spansk",
  "Fransk",
  "Tysk",
  "Mat og helse",
] as const;
type Subject = (typeof subjects)[number];

const lectureTypes = [
  "Indvididuelt arbeid",
  "Gruppearbeid",
  "Helklasse undervisning",
];
type LectureType = (typeof lectureTypes)[number];

const contentTypes = [
  "Kom i gang",
  "Fagstoff",
  "Øve",
  "Oppsummering",
  "Til lærer",
];
type ContentType = (typeof contentTypes)[number];

const formats = [
  "Video",
  "Lyd",
  "Utskrift",
  "Samhandling",
  "Spill",
  "Fysiske aktiviteter",
  "Oppgaver",
  "Regler/sammendrag",
  "Del av et opplegg", // kan utledes?
  "Biblioteksbok",
  "Fagtekst",
];
type Format = (typeof formats)[number];

export type Content = {
  /** unique slug per content. @example fakta-om-hunder */
  slug: string;
  /** @example Fakta om hunder */
  title: string;
  /** @example Visste du at hunder har fire bein og kan bjeffe? */
  description: string;
  /** html string.
   * @example "<p>Hund eller tamhund er en rovdyrart i hundefamilien. Dens nærmeste viltlevende slektning er ulven. For omkring 50 000 år siden begynte ulver å leve sammen med menneskene og utviklet seg gradvis til den hunden vi kjenner i dag.</p>
   * <p>Hunden var det første husdyret vårt, og er i dag den arten som viser størst variasjon i størrelse, farge, fasong og atferd.</p>"  */
  body: string;
  /** values from the subjects array, which fits the content of title, description and body */
  subjects: Subject[];
  /** values from the lectureTypes array, which fits the content of title, description and body */
  lectureTypes: LectureType[];
  /** values from the contentTypes array, which fits the content of title, description and body */
  contentTypes: ContentType[];
  /** values from the formats array, which fits the content of title, description and body */
  formats: Format[];
  /** values from the subjects array, which fits the content of title, description and body */
  topics: string[];

  /** date format ISO. @example "2011-10-05T14:48:00.000Z" */
  createdAt: string;

  /** unique id author. @example "1" */
  createdBy: string;
};
