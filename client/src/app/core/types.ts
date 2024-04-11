export type SeismicAttributes = {
  external_id: string;
  magnitude: number;
  mag_type: string;
  place: string;
  time: string;
  tsunami: boolean;
  title: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
};

export type SeismicItem = {
  id: string;
  type: string;
  attributes: SeismicAttributes;
  links: {
    external_url: string;
  };
};

export type SeismicApiResponse = {
  data: SeismicItem[];
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
  };
};

export type SeismicComment = {
  id: number;
  content: string;
  feature_id: string;
  created_at: string;
};
