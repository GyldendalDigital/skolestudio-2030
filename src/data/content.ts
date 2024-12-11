export type Data = {
  title: string;
  description: string;
  subject: string;
  topics: string[];
};

const getLocalContent = (): Data[] => {
  try {
    return JSON.parse(localStorage.getItem("content") || "[]");
  } catch (error) {
    return [];
  }
};

export const createLocalContent = (data: Data) => {
  localStorage.setItem("content", JSON.stringify([...getLocalContent(), data]));
};

export const deleteLocalContent = () => {
  localStorage.setItem("content", JSON.stringify([]));
};

export const getAllContent = () => [...getLocalContent(), ...content];

export const content: Data[] = [
  {
    title: "Quiz om rovfuger",
    description: "Hva kan du om de store rovfuglene?",
    subject: "Naturfag",
    topics: ["Fugler", "Rovdyr", "Fugleliv", "Dyreliv"],
  },
  {
    title: "Verb og substantiv",
    description: "Lær om verb og substantiv i norsk grammatikk.",
    subject: "Norsk",
    topics: ["Verb", "Substantiv", "Grammatikk"],
  },
  {
    title: "Grunnleggende algebra",
    description: "En introduksjon til algebraiske konsepter.",
    subject: "Matematikk",
    topics: ["Algebra", "Tallsystemer"],
  },
  {
    title: "Historiske hendelser i middelalderen",
    description: "Utforsk viktige hendelser i middelalderen.",
    subject: "Historie",
    topics: ["Historiske hendelser", "Middelalderen"],
  },
  {
    title: "Fotballtrening for nybegynnere",
    description: "Grunnleggende fotballøvelser og teknikker.",
    subject: "Kroppsøving",
    topics: ["Fotball", "Gymnastikk"],
  },
  {
    title: "Tegning og maling",
    description: "Lær grunnleggende teknikker i tegning og maling.",
    subject: "Kunst og håndverk",
    topics: ["Tegning", "Maling"],
  },
  {
    title: "Leseferdigheter i engelsk",
    description: "Forbedre dine leseferdigheter på engelsk.",
    subject: "Engelsk",
    topics: ["Leseferdigheter", "Litteratur"],
  },
  {
    title: "Grunnleggende kjemi",
    description: "En introduksjon til kjemiske reaksjoner og stoffer.",
    subject: "Naturfag",
    topics: ["Kjemi", "Biologi"],
  },
  {
    title: "Politikk og økonomi",
    description: "Forstå grunnleggende konsepter i politikk og økonomi.",
    subject: "Samfunnsfag",
    topics: ["Politikk", "Økonomi"],
  },
  {
    title: "Digital kunst og fotografi",
    description: "Utforsk verdenen av digital kunst og fotografi.",
    subject: "Kunst og håndverk",
    topics: ["Digital kunst", "Fotografi"],
  },
  {
    title: "Religionshistorie og etikk",
    description: "Lær om ulike religioner og etiske spørsmål.",
    subject: "Religion",
    topics: ["Religionshistorie", "Etikk"],
  },
  {
    title: "Programmering for nybegynnere",
    description: "Lær grunnleggende konsepter i programmering.",
    subject: "Informatikk",
    topics: ["Programmering", "Algoritmer"],
  },
  {
    title: "Middelalderens arkitektur",
    description: "Utforsk arkitektoniske stiler fra middelalderen.",
    subject: "Historie",
    topics: ["Arkitektur", "Middelalderen"],
  },
  {
    title: "Klimaforandringer",
    description: "Forstå årsakene og konsekvensene av klimaforandringer.",
    subject: "Naturfag",
    topics: ["Klima", "Miljø"],
  },
  {
    title: "Klassisk musikkhistorie",
    description: "Lær om de store komponistene og deres verk.",
    subject: "Musikk",
    topics: ["Klassisk musikk", "Komponister"],
  },
  {
    title: "Grunnleggende fysikk",
    description: "En introduksjon til fysikkens lover og prinsipper.",
    subject: "Naturfag",
    topics: ["Fysikk", "Mekanikk"],
  },
  {
    title: "Skriveferdigheter i norsk",
    description: "Forbedre dine skriveferdigheter på norsk.",
    subject: "Norsk",
    topics: ["Skriveferdigheter", "Litteratur"],
  },
  {
    title: "Økonomistyring",
    description: "Lær om budsjettering og økonomisk planlegging.",
    subject: "Samfunnsfag",
    topics: ["Økonomi", "Budsjettering"],
  },
  {
    title: "Fototeknikker",
    description: "Utforsk avanserte teknikker i fotografering.",
    subject: "Kunst og håndverk",
    topics: ["Fotografi", "Teknikker"],
  },
  {
    title: "Biologi: Cellelære",
    description: "Lær om cellens struktur og funksjon.",
    subject: "Naturfag",
    topics: ["Biologi", "Cellelære"],
  },
  {
    title: "Moderne litteratur",
    description: "Utforsk verkene til moderne forfattere.",
    subject: "Norsk",
    topics: ["Litteratur", "Moderne forfattere"],
  },
  {
    title: "Kunsthistorie",
    description: "En reise gjennom kunstens historie.",
    subject: "Kunst og håndverk",
    topics: ["Kunsthistorie", "Kunstbevegelser"],
  },
  {
    title: "Grunnleggende geometri",
    description: "Lær om grunnleggende geometriske former og deres egenskaper.",
    subject: "Matematikk",
    topics: ["Geometri", "Formler"],
  },
  {
    title: "Sosiale medier og kommunikasjon",
    description: "Forstå hvordan sosiale medier påvirker kommunikasjon.",
    subject: "Samfunnsfag",
    topics: ["Sosiale medier", "Kommunikasjon"],
  },
  {
    title: "Kjemiske reaksjoner",
    description: "Lær om ulike typer kjemiske reaksjoner.",
    subject: "Naturfag",
    topics: ["Kjemi", "Reaksjoner"],
  },
  {
    title: "Historie: Den kalde krigen",
    description: "Utforsk hendelsene under den kalde krigen.",
    subject: "Historie",
    topics: ["Den kalde krigen", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende statistikk",
    description: "Lær om grunnleggende statistiske metoder og begreper.",
    subject: "Matematikk",
    topics: ["Statistikk", "Dataanalyse"],
  },
  {
    title: "Kreativ skriving",
    description: "Utvikle dine ferdigheter i kreativ skriving.",
    subject: "Norsk",
    topics: ["Kreativ skriving", "Fortellinger"],
  },
  {
    title: "Miljøvern og bærekraft",
    description: "Forstå viktigheten av miljøvern og bærekraftig utvikling.",
    subject: "Naturfag",
    topics: ["Miljøvern", "Bærekraft"],
  },
  {
    title: "Grunnleggende anatomi",
    description: "Lær om menneskekroppens anatomi.",
    subject: "Naturfag",
    topics: ["Anatomi", "Biologi"],
  },
  {
    title: "Digital markedsføring",
    description: "Lær om strategier for digital markedsføring.",
    subject: "Samfunnsfag",
    topics: ["Markedsføring", "Digital strategi"],
  },
  {
    title: "Grunnleggende programmering i Python",
    description: "Lær å programmere i Python.",
    subject: "Informatikk",
    topics: ["Python", "Programmering"],
  },
  {
    title: "Historie: Den franske revolusjonen",
    description: "Utforsk hendelsene under den franske revolusjonen.",
    subject: "Historie",
    topics: ["Den franske revolusjonen", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende økonomi",
    description: "Lær om grunnleggende økonomiske prinsipper.",
    subject: "Samfunnsfag",
    topics: ["Økonomi", "Prinsipper"],
  },
  {
    title: "Kunst og kultur",
    description: "Utforsk ulike kunst- og kulturformer.",
    subject: "Kunst og håndverk",
    topics: ["Kunst", "Kultur"],
  },
  {
    title: "Grunnleggende programmering i JavaScript",
    description: "Lær å programmere i JavaScript.",
    subject: "Informatikk",
    topics: ["JavaScript", "Programmering"],
  },
  {
    title: "Historie: Romerriket",
    description: "Utforsk historien til Romerriket.",
    subject: "Historie",
    topics: ["Romerriket", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende matematikk",
    description: "Lær om grunnleggende matematiske konsepter.",
    subject: "Matematikk",
    topics: ["Matematikk", "Konsepter"],
  },
  {
    title: "Kreativ tegning",
    description: "Utvikle dine ferdigheter i kreativ tegning.",
    subject: "Kunst og håndverk",
    topics: ["Tegning", "Kreativitet"],
  },
  {
    title: "Grunnleggende programmering i Java",
    description: "Lær å programmere i Java.",
    subject: "Informatikk",
    topics: ["Java", "Programmering"],
  },
  {
    title: "Historie: Andre verdenskrig",
    description: "Utforsk hendelsene under andre verdenskrig.",
    subject: "Historie",
    topics: ["Andre verdenskrig", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende kjemiske bindinger",
    description: "Lær om ulike typer kjemiske bindinger.",
    subject: "Naturfag",
    topics: ["Kjemi", "Bindinger"],
  },
  {
    title: "Kreativ maling",
    description: "Utvikle dine ferdigheter i kreativ maling.",
    subject: "Kunst og håndverk",
    topics: ["Maling", "Kreativitet"],
  },
  {
    title: "Grunnleggende programmering i C++",
    description: "Lær å programmere i C++.",
    subject: "Informatikk",
    topics: ["C++", "Programmering"],
  },
  {
    title: "Historie: Den industrielle revolusjonen",
    description: "Utforsk hendelsene under den industrielle revolusjonen.",
    subject: "Historie",
    topics: ["Den industrielle revolusjonen", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende algebraiske ligninger",
    description: "Lær om grunnleggende algebraiske ligninger.",
    subject: "Matematikk",
    topics: ["Algebra", "Ligninger"],
  },
  {
    title: "Kreativ skriving i engelsk",
    description: "Utvikle dine ferdigheter i kreativ skriving på engelsk.",
    subject: "Engelsk",
    topics: ["Kreativ skriving", "Fortellinger"],
  },
  {
    title: "Grunnleggende programmering i Ruby",
    description: "Lær å programmere i Ruby.",
    subject: "Informatikk",
    topics: ["Ruby", "Programmering"],
  },
  {
    title: "Historie: Den amerikanske borgerkrigen",
    description: "Utforsk hendelsene under den amerikanske borgerkrigen.",
    subject: "Historie",
    topics: ["Den amerikanske borgerkrigen", "Historiske hendelser"],
  },
  {
    title: "Grunnleggende sannsynlighetsregning",
    description: "Lær om grunnleggende sannsynlighetsregning.",
    subject: "Matematikk",
    topics: ["Sannsynlighet", "Statistikk"],
  },
  {
    title: "Kreativ skriving i norsk",
    description: "Utvikle dine ferdigheter i kreativ skriving på norsk.",
    subject: "Norsk",
    topics: ["Kreativ skriving", "Fortellinger"],
  },
  {
    title: "Grunnleggende programmering i Swift",
    description: "Lær å programmere i Swift.",
    subject: "Informatikk",
    topics: ["Swift", "Programmering"],
  },
  {
    title: "Historie: Den russiske revolusjonen",
    description: "Utforsk hendelsene under den russiske revolusjonen.",
    subject: "Historie",
    topics: ["Den russiske revolusjonen", "Historiske hendelser"],
  },
];
