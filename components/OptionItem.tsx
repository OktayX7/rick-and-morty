import {Character} from "@/types/interfaces/character";
import React, {FC} from "react";
import {Image, Text, View} from "react-native";

interface OptionItemProps {
	option: Character;
	searchTerm: string;
}

const OptionItem: FC<OptionItemProps> = ({option, searchTerm}) => {
	const optionText = option.name;
	const regex = new RegExp(`(${searchTerm})`, 'gi');
	const parts = optionText.split(regex);
	return (
		<View className='w-full p-3 flex-row gap-x-3'>
			<Image className='rounded-lg' source={{uri: option.image}} style={{width: 55, height: 55}}/>
			<View className='gap-y-2'>
				<Text>
					{parts.map((part, index) =>
						part.toLowerCase() === searchTerm.toLowerCase() ? (
							<Text key={index} style={{fontWeight: 'bold'}}>
								{part}
							</Text>
						) : (
							part
						)
					)}
				</Text>
				<Text>{`${option.episode.length} Episodes`}</Text>
			</View>
		</View>
	);
};

export default OptionItem;
