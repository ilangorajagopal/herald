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
} from '@chakra-ui/react';
import startCase from 'lodash.startcase';
import truncate from 'lodash.truncate';
import { HiOutlineChevronUp } from 'react-icons/hi';
import FeatureModal from '../common/FeatureModal';

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
							<Tag px={2}>{startCase(feature.status)}</Tag>
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
	const { features, saveFeature } = props;
	const {
		isOpen: isFeatureModalOpen,
		onOpen: onFeatureModalOpen,
		onClose: onFeatureModalClose,
	} = useDisclosure();

	return (
		<>
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
			>
				{features.map((feature, index) => (
					<Fragment key={feature.id}>
						<Feature
							feature={feature}
							isFeatureModalOpen={isFeatureModalOpen}
							onFeatureModalClose={onFeatureModalClose}
							saveFeature={saveFeature}
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
