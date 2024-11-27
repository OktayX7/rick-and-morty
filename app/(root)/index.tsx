import React, {useState, FC} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {useSearchCharacterQuery, useDebounce} from '@/hooks';
import {Character} from '@/types/interfaces/character';
import Select from '@/components/Select';
import OptionItem from '@/components/OptionItem';

const HomeScreen = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const {data, isLoading} = useSearchCharacterQuery(debouncedSearchTerm);
	const [selectedOptions, setSelectedOptions] = useState<Character[]>([]);

	return (
		<SafeAreaView>
			<Select<Character>
				options={data}
				isLoading={isLoading}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedOptions={selectedOptions}
				onSelectionChange={setSelectedOptions}
				placeholder='Search Character..'
				searchKeys={['name']}
				primaryKey='id'
				textKey='name'
				clearAll
				renderOptionItem={({option}) => (
					<OptionItem option={option} searchTerm={searchTerm}/>
				)}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;
