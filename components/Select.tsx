import React, {useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

interface CustomMultiSelectProps<T> {
	options: T[] | undefined;
	selectedOptions: T[];
	onSelectionChange: (selected: T[]) => void;
	renderOptionItem: React.ComponentType<{ option: T; searchTerm: string }>;
	searchKeys: (keyof T)[];
	primaryKey: keyof T;
	textKey: keyof T;
	placeholder?: string;
	isLoading?: boolean;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	clearAll?: boolean;
}

const SeparatorComponent = () => {
	return (
		<View className='border-b border-[#94A3B8]'/>
	);
}

const CustomMultiSelect = <T, >({
											  options = [],
											  selectedOptions,
											  onSelectionChange,
											  renderOptionItem: RenderOptionItem,
											  searchKeys,
											  primaryKey,
											  textKey,
											  placeholder,
											  isLoading = false,
											  searchTerm,
											  setSearchTerm,
											  clearAll = false
										  }: CustomMultiSelectProps<T>) => {

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const filteredOptions = options?.filter(option =>
		searchKeys.some(key =>
			String(option[key]).toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const toggleOption = (option: T) => {
		const optionId = option[primaryKey];
		if (selectedOptions.some(selected => selected[primaryKey] === optionId)) {
			onSelectionChange(selectedOptions.filter(selected => selected[primaryKey] !== optionId));
		} else {
			onSelectionChange([...selectedOptions, option]);
		}
	};

	const removeOption = (option: T) => {
		onSelectionChange(selectedOptions.filter(selected => selected[primaryKey] !== option[primaryKey]));
	};

	const clearAllOptions = () => {
		onSelectionChange([]);
		setSearchTerm('');
	};

	return (
		<View className="m-2">
			<View className={`flex-row items-center border border-[#94A3B8] rounded-2xl px-3`}>
				<TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex-row items-center flex-1 ${selectedOptions.length > 0 ? 'py-1' : 'py-3'}`}>
					<View className="flex-row flex-wrap flex-1">
						{selectedOptions.map(option => (
							<View key={String(option[primaryKey])} className="flex-row items-center gap-x-2 bg-gray-300 rounded-lg px-3 py-1.5 m-1">
								<Text className='font-medium text-gray-900'>{String(option[textKey])}</Text>
								<TouchableOpacity className='bg-[#94A3B8] p-1 rounded-md' onPress={() => removeOption(option)}>
									<Icon name="close" size={16} className='!text-white'/>
								</TouchableOpacity>
							</View>
						))}
						<TextInput
							autoCapitalize='none'
							className="flex-1 p-1 ml-1 outline-none"
							placeholder={placeholder || 'Search...'}
							placeholderTextColor='rgba(28,53,63, 1)'
							value={searchTerm}
							onChangeText={(value) => {
								(!isDropdownOpen && searchTerm !== '') && setIsDropdownOpen(true);
								setSearchTerm(value);
							}}
							onPress={() => setIsDropdownOpen(!isDropdownOpen)}
						/>
					</View>
					{clearAll && selectedOptions.length > 0 && (
						<TouchableOpacity onPress={clearAllOptions} className='ml-2'>
							<Icon name="clear" size={24} className='text-gray-600'/>
						</TouchableOpacity>
					)}
					<Icon name={isDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={28}/>
				</TouchableOpacity>

			</View>
			{isDropdownOpen && (
				<View className="mt-1 border border-[#94A3B8] rounded-lg pb-16  z-50 bg-slate-100 max-h-screen">
					{isLoading ? (
						<View className="p-4 items-center">
							<ActivityIndicator size="large" color="#0000ff"/>
						</View>
					) : (
						<FlatList<T>
							data={filteredOptions}
							keyExtractor={item => String(item[primaryKey])}
							ItemSeparatorComponent={SeparatorComponent}
							renderItem={({item}) => {
								const isSelected = selectedOptions.some(selected => selected[primaryKey] === item[primaryKey]);
								return (
									<TouchableOpacity onPress={() => toggleOption(item)} className="p-2 flex-row justify-between items-center">
										<Checkbox value={isSelected} onValueChange={() => toggleOption(item)} className='!rounded-md'/>
										<RenderOptionItem option={item} searchTerm={searchTerm}/>
									</TouchableOpacity>
								);
							}}
						/>
					)}
				</View>
			)}
		</View>
	);
};

export default CustomMultiSelect;
