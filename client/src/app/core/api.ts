import { SeismicApiResponse, SeismicComment } from "./types";
const ENDPOINT = "http://localhost:3000/api/features";

export async function getSeismicData(
  page: string,
  limit: string,
  query: string
): Promise<SeismicApiResponse> {
  try {
    const res = await fetch(
      `${ENDPOINT}?page=${page}&per_page=${limit}&${query}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function getSeismicComments(
  id: string
): Promise<SeismicComment[]> {
  try {
    const res = await fetch(`${ENDPOINT}/${id}/comments`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function postSeismicData(
  id: string,
  content: string
): Promise<any> {
  try {
    const res = await fetch(`${ENDPOINT}/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(String(err));
  }
}
