export type SeismicItem = {
  id: string;
  mag: number;
  place: string;
  time: string;
  url: string;
  tsunami: boolean;
  magType: string;
  title: string;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string;
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
