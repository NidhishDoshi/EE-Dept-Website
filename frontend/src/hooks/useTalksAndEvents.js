import { useQuery } from "@tanstack/react-query";
import { getTalksAndEvents } from "../api/api";

const transformTalksAndEvents = (talks) =>
	talks
		// Sort by the new 'sortingDate' field instead of 'updatedAt'
		?.sort((a, b) => new Date(b.sortingDate) - new Date(a.sortingDate))
		.map((item) => ({
			id: item.documentId || item.id,
			title: item.Title || "",
			speaker: item.Speaker || null,
			designation: item.designation || null,
			venue: item.venue || null,
			time: item.date || null,
			date: null,
			description: item.description || null,
			link: item.link || null,
			image: item.Image || null,
			poster: item.Poster || null,
			eventStatus: item.eventStatus || "Past",
		})) || [];

export function useTalksAndEvents() {
	return useQuery({
		queryKey: ["talks-and-events"],
		queryFn: getTalksAndEvents,
		select: transformTalksAndEvents,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}