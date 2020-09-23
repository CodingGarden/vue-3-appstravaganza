export interface DadJokeResponse {
  id: string;
  joke: string;
  status: number;
}

export interface Link {
  href: string;
  rel: string;
  prompt?: string;
  render?: string;
}

export interface Metadata {
  total_hits: number;
}

export interface Image {
  nasa_id: string;
  keywords: string[];
  title: string;
  date_created: Date;
  center: string;
  media_type: string;
  description: string;
  secondary_creator: string;
  description_508: string;
  location: string;
  photographer: string;
  album: string[];
}

export interface Item {
  links: Link[];
  href: string;
  data: Image[];
}

export interface Collection {
  links: Link[];
  metadata: Metadata;
  href: string;
  version: string;
  items: Item[];
}

export interface NasaImageResponse {
  collection: Collection;
}

export interface NasaImage {
  caption: string;
  url: string;
}