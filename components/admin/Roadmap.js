import { useFeatures, useRoadmap } from '../../lib/hooks';
import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Spinner,
	Text,
	VStack,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { mutate } from 'swr';
import { HiPlus } from 'react-icons/hi';
import FeatureModal from '../common/FeatureModal';
import { supabase } from '../../lib/supabaseClient';
import FeatureList from './FeatureList';

function RoadmapHeader(props) {
	return (
		<Flex
			w='full'
			alignItems='center'
			justifyContent='space-between'
			mb={4}
		>
			<Heading as='h3' fontSize='3xl' fontWeight='normal'>
				My Roadmap
			</Heading>
			<Button
				w={12}
				h={12}
				aria-label='Add Feature'
				colorScheme='brand'
				variant='outline'
				onClick={props.onNewFeatureModalOpen}
				size='md'
				borderWidth={2}
			>
				<Icon as={HiPlus} fontSize='2xl' />
			</Button>
		</Flex>
	);
}

export default function Roadmap(props) {
	const { profile } = props;
	const {
		isOpen: isNewFeatureModalOpen,
		onOpen: onNewFeatureModalOpen,
		onClose: onNewFeatureModalClose,
	} = useDisclosure();
	const { roadmap, isLoading } = useRoadmap(profile?.id);
	const { features, areFeaturesLoading } = useFeatures(roadmap?.id);
	const toast = useToast();

	console.log(features);

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
			onNewFeatureModalClose();
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
				borderColor={useColorModeValue('gray.400', 'gray.700')}
				borderRadius='lg'
			>
				<Text fontSize='xl' mb={4}>
					You don&apos;t have any features yet. Create your first
					feature.
				</Text>
				<Button
					aria-label='Create Feature'
					colorScheme='brand'
					onClick={onNewFeatureModalOpen}
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
				borderColor={useColorModeValue('gray.400', 'gray.700')}
				borderRadius='lg'
			>
				<Spinner />
			</Box>
		);
	} else if (features?.length > 0 && !areFeaturesLoading) {
		featuresElement = <FeatureList features={features} />;
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
				borderColor={useColorModeValue('gray.400', 'gray.700')}
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
				<RoadmapHeader onNewFeatureModalOpen={onNewFeatureModalOpen} />
				<Flex
					w='full'
					h={64}
					alignItems='center'
					justifyContent='center'
					borderWidth={1}
					borderStyle='solid'
					borderColor={useColorModeValue('gray.400', 'gray.700')}
					borderRadius='lg'
				>
					<Spinner />
				</Flex>
			</VStack>
		);
	} else if (roadmap && !isLoading) {
		roadmapElement = (
			<VStack alignItems='start' w='full'>
				<RoadmapHeader onNewFeatureModalOpen={onNewFeatureModalOpen} />
				<Flex
					w='full'
					h='auto'
					alignItems='center'
					justifyContent='center'
					borderWidth={1}
					borderStyle='solid'
					borderColor={useColorModeValue('gray.400', 'gray.700')}
					borderRadius='lg'
				>
					{featuresElement}
				</Flex>
			</VStack>
		);
	}

	return (
		<>
			{roadmapElement}
			<FeatureModal
				createFeatureRequest={createFeatureRequest}
				defaultCTA='Save Feature'
				emailRequired={false}
				loadingCTA='Saving Feature...'
				isOpen={isNewFeatureModalOpen}
				onClose={onNewFeatureModalClose}
			/>
		</>
	);
}
