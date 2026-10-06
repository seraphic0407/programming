const API_URL = "http://localhost:3000";

export type GalleryItem = {
  id: number;
  type: "image" | "video";
  media: string;
  event: string;
  location: string;
  date: string;
  mainArtists: string[];
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    media: `${API_URL}/uploads/images/moment1.jpg`,
    event: "Java Jazz Festival",
    location: "JIEXPO Kemayoran, Jakarta",
    date: "29 - 31 Mei 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 2,
    type: "image",
    media: `${API_URL}/uploads/images/moment2.jpg`,
    event: "Bigu Fest",
    location: "Jakarta International Stadium, Jakarta",
    date: "04 - 05 Juli 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 3,
    type: "image",
    media: `${API_URL}/uploads/images/moment3.jpg`,
    event: "The Lion King",
    location: "Ciputra Artpreneur, Jakarta",
    date: "13 - 14 Juni 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 4,
    type: "video",
    media: `${API_URL}/uploads/videos/moment4.mp4`,
    event: "Java Jazz Festival",
    location: "JIEXPO Kemayoran, Jakarta",
    date: "29 - 31 Mei 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 5,
    type: "video",
    media: `${API_URL}/uploads/videos/moment5.mp4`,
    event: "Java Jazz Festival",
    location: "JIEXPO Kemayoran, Jakarta",
    date: "29 - 31 Mei 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 6,
    type: "video",
    media: `${API_URL}/uploads/videos/moment6.mp4`,
    event: "Bigu Fest",
    location: "Jakarta International Stadium, Jakarta",
    date: "04 - 05 Juli 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 7,
    type: "video",
    media: `${API_URL}/uploads/videos/moment7.mp4`,
    event: "Bigu Fest",
    location: "Jakarta International Stadium, Jakarta",
    date: "04 - 05 Juli 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 8,
    type: "video",
    media: `${API_URL}/uploads/videos/moment8.mp4`,
    event: "The Lion King",
    location: "Ciputra Artpreneur, Jakarta",
    date: "13 - 14 Juni 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 9,
    type: "video",
    media: `${API_URL}/uploads/videos/moment9.mp4`,
    event: "The Lion King",
    location: "Ciputra Artpreneur, Jakarta",
    date: "13 - 14 Juni 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },

  {
    id: 10,
    type: "video",
    media: `${API_URL}/uploads/videos/moment10.mp4`,
    event: "Music Festival",
    location: "Jakarta, Indonesia",
    date: "20 - 21 Juni 2026",
    mainArtists: ["Artist 1", "Artist 2", "Artist 3"],
  },
];
