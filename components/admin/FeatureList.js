import { Fragment } from 'react';
import {
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Menu,
	MenuItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Tag,
	Text,
	VStack,
	MenuButton,
	MenuList,
	HStack,
	useDisclosure,
	useColorModeValue,
} from '@chakra-ui/react';
import startCase from 'lodash.startcase';
import truncate from 'lodash.truncate';
import { HiDotsVertical, HiOutlineChevronUp } from 'react-icons/hi';
import FeatureModal from '../common/FeatureModal';

function Feature(props) {
	const {
		deleteFeature,
		feature,
		isFeatureModalOpen,
		onFeatureModalClose,
		onFeatureModalOpen,
		saveFeature,
	} = props;
	const {
		isOpen: isDeleteFeatureConfirmationModalOpen,
		onOpen: onDeleteFeatureConfirmationModalOpen,
		onClose: onDeleteFeatureConfirmationModalClose,
	} = useDisclosure();

	async function saveFeatureWithId(values) {
		await saveFeature(feature?.id, values);
		onFeatureModalClose();
	}

	return (
		<>
			<Grid
				templateColumns='repeat(8, 1fr)'
				gap={2}
				w='full'
				h={36}
				px={6}
				py={4}
				spacing={4}
			>
				<GridItem colSpan={6}>
					<VStack
						w='full'
						h='full'
						alignItems='start'
						justifyContent='center'
						spacing={2}
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
							<Tag px={2}>
								{feature?.status
									? startCase(feature.status)
									: 'Requested'}
							</Tag>
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
					>
						<Flex
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
						</Flex>
					</Flex>
				</GridItem>
				<GridItem colSpan={1}>
					<Flex
						w='full'
						h='full'
						alignItems='center'
						justifyContent='center'
					>
						<Menu placement='bottom-end'>
							<MenuButton as={Button} p={2} w={12} h={12}>
								<Icon as={HiDotsVertical} fontSize='xl' />
							</MenuButton>
							<MenuList mt={2} p={0}>
								<MenuItem onClick={onFeatureModalOpen} p={4}>
									Edit
								</MenuItem>
								<MenuItem
									onClick={
										onDeleteFeatureConfirmationModalOpen
									}
									p={4}
								>
									Delete
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</GridItem>
			</Grid>
			<FeatureModal
				saveFeature={saveFeatureWithId}
				defaultCTA='Save Feature'
				emailRequired={false}
				feature={feature}
				loadingCTA='Saving Feature...'
				isOpen={isFeatureModalOpen}
				onClose={onFeatureModalClose}
				setStatus={true}
			/>
			<Modal
				isCentered={true}
				isOpen={isDeleteFeatureConfirmationModalOpen}
				onClose={onDeleteFeatureConfirmationModalClose}
			>
				<ModalOverlay />
				<ModalContent
					color={useColorModeValue('gray.900', 'gray.100')}
					py={4}
				>
					<ModalBody mb={4}>
						Are you sure you want to delete this feature? This
						process is irreversible.
					</ModalBody>
					<ModalFooter py={0}>
						<Button
							p={2}
							size='md'
							onClick={onDeleteFeatureConfirmationModalClose}
							variant='ghost'
						>
							Cancel
						</Button>
						<Button
							p={2}
							size='md'
							colorScheme='red'
							ml={3}
							onClick={() => deleteFeature(feature?.id)}
						>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default function FeatureList(props) {
	const { deleteFeature, features, saveFeature } = props;
	const {
		isOpen: isFeatureModalOpen,
		onOpen: onFeatureModalOpen,
		onClose: onFeatureModalClose,
	} = useDisclosure();

	return (
		<VStack
			w='full'
			h='auto'
			alignItems='start'
			justifyContent='start'
			bg={useColorModeValue('gray.50', 'gray.700')}
			rounded='xl'
			shadow='md'
		>
			{features.map((feature, index) => (
				<Fragment key={feature.id}>
					<Feature
						deleteFeature={deleteFeature}
						feature={feature}
						isFeatureModalOpen={isFeatureModalOpen}
						onFeatureModalClose={onFeatureModalClose}
						onFeatureModalOpen={onFeatureModalOpen}
						saveFeature={saveFeature}
					/>
					{index < features.length - 1 ? (
						<Divider style={{ marginTop: '0' }} />
					) : null}
				</Fragment>
			))}
		</VStack>
	);
}
