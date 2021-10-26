import { Fragment } from 'react';
import {
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Tag,
	Text,
	VStack,
	HStack,
	useDisclosure,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import startCase from 'lodash.startcase';
import truncate from 'lodash.truncate';
import { HiOutlineChevronUp } from 'react-icons/hi';
import FeatureModal from '../common/FeatureModal';
import { supabase } from '../../lib/supabaseClient';
import { mutate } from 'swr';

function Feature(props) {
	const { feature, isFeatureModalOpen, onFeatureModalClose, saveFeature } =
		props;

	return (
		<>
			<Grid
				templateColumns='repeat(8, 1fr)'
				gap={4}
				w='full'
				h={36}
				px={6}
				py={4}
				spacing={4}
			>
				<GridItem colSpan={7}>
					<VStack
						w='full'
						h='full'
						alignItems='start'
						justifyContent='center'
						spacing={2}
						px={4}
					>
						<HStack alignItems='center' spacing={4}>
							<Heading
								as='h4'
								fontSize='lg'
								fontWeight='semibold'
								title={feature.title}
							>
								{truncate(feature.title, { length: 40 })}
							</Heading>
							{feature?.status ? (
								<Tag px={2}>{startCase(feature.status)}</Tag>
							) : null}
						</HStack>
						<Text fontSize='sm' title={feature.description}>
							{truncate(feature.description, { length: 140 })}
						</Text>
					</VStack>
				</GridItem>
				<GridItem colSpan={1}>
					<Flex
						w='full'
						h='full'
						alignItems='center'
						justifyContent='start'
						px={4}
					>
						<Button
							w={16}
							h={16}
							p={2}
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							rounded='lg'
							bg={useColorModeValue('gray.100', 'gray.600')}
						>
							<Icon as={HiOutlineChevronUp} fontSize='2xl' />
							<Text>{feature?.upvotes}</Text>
						</Button>
					</Flex>
				</GridItem>
			</Grid>
			<FeatureModal
				saveFeature={saveFeature}
				defaultCTA='Save Request'
				emailRequired={true}
				setStatus={false}
				loadingCTA='Saving Request...'
				isOpen={isFeatureModalOpen}
				onClose={onFeatureModalClose}
			/>
		</>
	);
}

export default function PublicFeaturesList(props) {
	const { features, roadmap } = props;
	const {
		isOpen: isFeatureModalOpen,
		onOpen: onFeatureModalOpen,
		onClose: onFeatureModalClose,
	} = useDisclosure();
	const toast = useToast();

	async function createFeatureRequest(feature) {
		const { data, error } = await supabase.from('features').insert({
			...feature,
			is_approved: false,
			roadmap_id: roadmap?.id,
			status: '',
		});

		if (data && !error) {
			await mutate(`/api/features?roadmapId=${roadmap?.id}`);
			toast({
				title: 'Request Saved!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
			onFeatureModalClose();
		} else {
			toast({
				title: 'There was a problem creating your request',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
	}

	return (
		<>
			<HStack w='full' alignItems='center' justifyContent='space-between'>
				<Button
					w='auto'
					aria-label='Add Feature'
					colorScheme='brand'
					onClick={onFeatureModalOpen}
					size='lg'
				>
					Request Feature
				</Button>
			</HStack>
			<VStack
				w='full'
				h='auto'
				alignItems='start'
				justifyContent='start'
				bg={useColorModeValue('gray.50', 'gray.700')}
				rounded='xl'
				shadow='lg'
				mt={8}
			>
				{features.map((feature, index) => (
					<Fragment key={feature.id}>
						<Feature
							feature={feature}
							isFeatureModalOpen={isFeatureModalOpen}
							onFeatureModalClose={onFeatureModalClose}
							saveFeature={createFeatureRequest}
						/>
						{index < features.length - 1 ? (
							<Divider style={{ marginTop: '0' }} />
						) : null}
					</Fragment>
				))}
			</VStack>
		</>
	);
}
