import axios from "axios";
import { constant } from "../constant/constant";

const axiosInstance = axios.create({
  baseURL: constant.baseURL,
});

export const getNews = async () => {
  const { data } = await axiosInstance.get("/newss");
  return data?.data;
};

// Fetch News from Google Sheets
export const getNewsFromSheets = async () => {
  const { data } = await axiosInstance.get("/news-sheets");
  return data?.data;
};

// Fetch People from Google Sheets
export const getPeopleFromSheets = async () => {
  const { data } = await axiosInstance.get("/people-sheets");
  return data?.data;
};

export const getTalksAndEvents = async () => {
  const { data } = await axiosInstance.get("/talk-and-events?populate=*");
  return data?.data;
};

// Fetch Talks and Events from Google Sheets
export const getTalksAndEventsFromSheets = async () => {
  const { data } = await axiosInstance.get("/talks-events-sheets");
  return data?.data;
};

// Fetch Research Projects from Google Sheets
export const getResearchProjectsFromSheets = async () => {
  const { data } = await axiosInstance.get("/research-projects-sheets");
  return data?.data;
};

// Fetch Research Labs from Google Sheets
export const getResearchLabsFromSheets = async () => {
  const { data } = await axiosInstance.get("/research-labs-sheets");
  return data?.data;
};

// Fetch Gallery from Google Sheets
export const getGalleryFromSheets = async () => {
  const { data } = await axiosInstance.get("/gallery-sheets");
  return data?.data;
};

// Fetch Carousel from Google Sheets
export const getCarouselFromSheets = async () => {
  const { data } = await axiosInstance.get("/carousel-sheets");
  return data?.data;
};

// Fetch FAQ from Google Sheets
export const getFAQFromSheets = async () => {
  const { data } = await axiosInstance.get("/faq-sheets");
  return data?.data;
};

// Fetch Contact Points from Google Sheets
export const getContactPointsFromSheets = async () => {
  const { data } = await axiosInstance.get("/contact-points-sheets");
  return data?.data;
};

// Fetch Statistics from Google Sheets
export const getStatisticsFromSheets = async () => {
  const { data } = await axiosInstance.get("/statistics-sheets");
  return data?.data;
};

export const getAboutPageData = async () => {
  const { data } = await axiosInstance.get("/about-pages?populate=*");
  return data?.data;
};

export const getAcademicRules = async () => {
  const { data } = await axiosInstance.get("/academic-ruless");
  return data?.data?.[0]?.Rules;
};

export const getAcademicFaq = async () => {
  const { data } = await axiosInstance.get("/faq");
  return data?.data?.map((item) => ({
    question: item.Question,
    answer: item.Answer,
  }));
};

export const getAdmissionsInfo = async () => {
  const { data } = await axiosInstance.get("/admissions-pages");
  return data?.data?.[0].allData;
};

export const getPeopleInfo = async () => {
  const { data } = await axiosInstance.get("/peoples?populate=*&pagination[pageSize]=50");

  if (!data || !Array.isArray(data.data)) {
    console.error("Fetched data is not in the expected format:", data);
    return [];
  }

  const sortedData = [...data.data].sort((a, b) => {
    const nameA = (a?.Name || "").toLowerCase();
    const nameB = (b?.Name || "").toLowerCase();

    return nameA.localeCompare(nameB);
  });

  return sortedData;
};

export const getResearchData = async () => {
  const { data } = await axiosInstance.get("/research-labs?populate=*");
  return data?.data;
};

export const getResearchProjectsData = async () => {
  const { data } = await axiosInstance.get("/research-projects");
  return data?.data;
};

export const getCarouselImages = async () => {
  const { data } = await axiosInstance.get("/carousel-imagess?populate=*");
  return data?.data;
};

export const getGalleryImages = async () => {
  const { data } = await axiosInstance.get("/gallery-images?populate=*");
  return data?.data;
};

export const getSearchResult = async (query) => {
  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("A valid search query must be provided.");
  }
  const encodedQuery = encodeURIComponent(query.trim());
  const { data } = await axiosInstance.get(
    `/fuzzy-search/search?query=${encodedQuery}`
  );
  return data;
};

export const getDepartmentStatistics = async () => {
  const { data } = await axiosInstance.get("/department-statistic");
  return data?.data;
};

// Fetch recruiters (company logos) for Home page
export const getRecruiters = async () => {
  const { data } = await axiosInstance.get("/recruiters?populate=*");
  return data?.data;
};

export const getJoinAsFacultyData = async () => {
  const { data } = await axiosInstance.get("/join-as-faculty-pages");
  // Sort by Level field and return the data array
  return data?.data?.sort((a, b) => a.Level - b.Level) || [];
};

// Fetch About page data from Google Sheets
export const getAboutPageDataFromSheets = async () => {
  const { data } = await axiosInstance.get("/about");
  return data?.data;
};
