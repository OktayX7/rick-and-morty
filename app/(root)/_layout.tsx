import {Stack} from 'expo-router';


import {
	QueryClient,
	QueryClientProvider,
	focusManager,
} from "@tanstack/react-query";
import { AppStateStatus, Platform } from "react-native";
import { useOnlineManager } from "@/hooks/query/useOnlineManager";
import {useAppState} from "@/hooks/query/useAppState";

export default function RootLayout() {
	function onAppStateChange(status: AppStateStatus) {
		if (Platform.OS !== "web") {
			focusManager.setFocused(status === "active");
		}
	}

	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 2 } },
	});

	useOnlineManager();
	useAppState(onAppStateChange);

	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen
					name="index"
					options={{
						title: 'Home',
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
}
