import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

/**
 * This hook will refetch data when the screen is focused
 */

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
	const firstTimeRef = React.useRef(true);

	useFocusEffect(
		React.useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false;
				return;
			}

			refetch();
		}, [refetch]),
	);
}
