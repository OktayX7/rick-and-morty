import { useQuery } from "@tanstack/react-query";
import { Character } from "@/types/interfaces/character";

export const useSearchCharacterQuery = (searchTerm: string) => {
  return useQuery<Character[]>({
    queryKey: ["searchCharacter", searchTerm],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/character/?name=${searchTerm}`
      );
      const data = await response.json();
      return data.results;
    },
  });
};
