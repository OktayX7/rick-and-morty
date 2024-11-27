import {create} from "zustand";
import type {Character} from "@/types/interfaces/character";

interface SearchCharacterState {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	searchResults: Character[];
	setSearchResults: (searchResults: Character[]) => void;
}

//unused
export const useSearchCharacterStore = create<SearchCharacterState>((set) => ({
	searchTerm: "",
	setSearchTerm: (searchTerm) => set({searchTerm}),
	searchResults: [],
	setSearchResults: (searchResults) => set({searchResults}),
}));
