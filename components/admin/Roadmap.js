import { useFeatures, useRoadmap } from '../../lib/hooks';
import {
	Box,
	Button,
	Flex,
	HStack,
	Spinner,
	Text,
	VStack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { mutate } from 'swr';
import FeatureModal from '../common/FeatureModal';
import { supabase } from '../../lib/supabaseClient';
import FeatureList from './FeatureList';

function RoadmapHeader(props) {
	return (
		<HStack
			w='full'
			alignItems='center'
			justifyContent='space-between'
			mb={4}
		>
			<Button
				w='auto'
				aria-label='Add Feature'
				colorScheme='brand'
				onClick={props.onFeatureModalOpen}
				size='lg'
			>
				Add Feature
			</Button>
		</HStack>
	);
}

export default function Roadmap(props) {
	const { profile } = props;
	const {
		isOpen: isFeatureModalOpen,
		onOpen: onFeatureModalOpen,
		onClose: onFeatureModalClose,
	} = useDisclosure();
	const { roadmap, isLoading } = useRoadmap(profile?.id);
	const { features, areFeaturesLoading } = useFeatures(roadmap?.id);
	const toast = useToast();

	async function createRoadmap() {
		const user = supabase.auth.user();
		const { data, error } = await supabase
			.from('roadmaps')
			.insert({ author: user?.id })
			.single();

		if (data && !error) {
			await mutate(`/api/roadmap?userId=${user?.id}`);
			toast({
				title: 'Roadmap Created!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		} else {
			toast({
				title: 'There was a problem creating your roadmap',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
	}

	async function createFeatureRequest(feature) {
		const { data, error } = await supabase.from('features').insert({
			...feature,
			is_approved: true,
			roadmap_id: roadmap?.id,
			requested_by: 'Admin',
		});

		if (data && !error) {
			await mutate(`/api/features?roadmapId=${roadmap?.id}`);
			toast({
				title: 'Feature Created!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
			onFeatureModalClose();
		} else {
			toast({
				title: 'There was a problem creating the feature',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
	}

	async function saveFeature(id, feature) {
		const { data, error } = await supabase
			.from('features')
			.update(feature)
			.match({ id });

		if (data && !error) {
			await mutate(`/api/features?roadmapId=${roadmap?.id}`);
			toast({
				title: 'Feature Updated!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		} else {
			toast({
				title: 'There was a problem updating the feature',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
	}

	async function deleteFeature(id) {
		const { data, error } = await supabase
			.from('features')
			.delete()
			.match({ id });

		if (data && !error) {
			await mutate(`/api/features?roadmapId=${roadmap?.id}`);
			toast({
				title: 'Feature Deleted!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
			onFeatureModalClose();
		} else {
			toast({
				title: 'There was a problem deleting the feature',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
	}

	let featuresElement = null;
	if (features?.length === 0 && !areFeaturesLoading) {
		featuresElement = (
			<Box
				w='full'
				h={64}
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				borderWidth={1}
				borderStyle='solid'
				borderRadius='lg'
			>
				<Text fontSize='xl' mb={4}>
					You don&apos;t have any features yet. Create your first
					feature.
				</Text>
				<Button
					aria-label='Create Feature'
					colorScheme='brand'
					onClick={onFeatureModalOpen}
				>
					Create Feature
				</Button>
			</Box>
		);
	} else if (features?.length === 0 && areFeaturesLoading) {
		featuresElement = (
			<Box
				w='full'
				h={48}
				d='flex'
				alignItems='center'
				justifyContent='center'
				borderWidth={1}
				borderStyle='solid'
				borderRadius='lg'
			>
				<Spinner />
			</Box>
		);
	} else if (features?.length > 0 && !areFeaturesLoading) {
		featuresElement = (
			<FeatureList
				deleteFeature={deleteFeature}
				features={features}
				saveFeature={saveFeature}
			/>
		);
	}

	let roadmapElement = null;
	if (!roadmap && !isLoading) {
		roadmapElement = (
			<Box
				w='full'
				h={64}
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				borderWidth={1}
				borderStyle='solid'
				borderRadius='lg'
			>
				<Text fontSize='xl' mb={4}>
					You don&apos;t have a roadmap yet. Create one.
				</Text>
				<Button colorScheme='brand' onClick={createRoadmap}>
					Create Roadmap
				</Button>
			</Box>
		);
	} else if (!roadmap && isLoading) {
		roadmapElement = (
			<VStack alignItems='start' w='full'>
				<RoadmapHeader onFeatureModalOpen={onFeatureModalOpen} />
				<Flex
					w='full'
					h={64}
					alignItems='center'
					justifyContent='center'
					borderWidth={1}
					borderStyle='solid'
					borderRadius='lg'
				>
					<Spinner />
				</Flex>
			</VStack>
		);
	} else if (roadmap && !isLoading) {
		roadmapElement = (
			<VStack alignItems='start' w='full'>
				<RoadmapHeader onFeatureModalOpen={onFeatureModalOpen} />
				{featuresElement}
			</VStack>
		);
	}

	return (
		<>
			{roadmapElement}
			<FeatureModal
				saveFeature={createFeatureRequest}
				defaultCTA='Save Feature'
				emailRequired={false}
				loadingCTA='Saving Feature...'
				isOpen={isFeatureModalOpen}
				onClose={onFeatureModalClose}
			/>
		</>
	);
}
