import { createClient } from "next-sanity";

const client = createClient({
  projectId: "t5ydop5b",
  dataset: "production",
  apiVersion: "2022-08-18",
  useCdn: false,
});

export interface aboutSectionDataType {
  title: string;
  subtitle: string;
  index: number;
  link: string | null;
  linkName: string | null;
  body: any[];
}

// export interface infoType {
//   _createdAt: string;
//   _id: string;
//   _rev: string;
//   _type: string;
//   _updatedAt: string;
//   slug: { _type: string; current: string };
//   title: string;
//   body: any[];
// }

export default client;
