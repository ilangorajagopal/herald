import useSWR from 'swr';
import { fetcher } from './utils';

export function useRoadmap(userId) {
	const { data, error } = useSWR(`/api/roadmap?userId=${userId}`, fetcher);

	return {
		roadmap: data?.roadmap,
		isLoading: !data && !error,
	};
}

export function useFeatures(roadmapId) {
	const { data, error } = useSWR(
		`/api/features?roadmapId=${roadmapId}`,
		fetcher
	);

	return {
		features: data?.features,
		areFeaturesLoading: !data && !error,
	};
}
