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
	Tag,
	Text,
	VStack,
	MenuButton,
	MenuList,
	HStack,
} from '@chakra-ui/react';
import startCase from 'lodash.startcase';
import truncate from 'lodash.truncate';
import { HiDotsVertical, HiOutlineChevronUp } from 'react-icons/hi';

function Feature(props) {
	const { feature } = props;

	return (
		<Grid
			templateColumns='repeat(8, 1fr)'
			gap={2}
			w='full'
			h={40}
			px={6}
			py={4}
			spacing={4}
		>
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
						borderWidth={1}
						borderStyle='solid'
						rounded='lg'
					>
						<Icon as={HiOutlineChevronUp} fontSize='2xl' />
						<Text>{feature?.upvotes}</Text>
					</Flex>
				</Flex>
			</GridItem>
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
					justifyContent='center'
				>
					<Menu placement='bottom-end'>
						<MenuButton as={Button} p={2} w={12} h={12}>
							<Icon as={HiDotsVertical} fontSize='xl' />
						</MenuButton>
						<MenuList mt={2} p={0}>
							<MenuItem p={4}>Edit</MenuItem>
							<MenuItem p={4}>Delete</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</GridItem>
		</Grid>
	);
}

export default function FeatureList(props) {
	const { features } = props;

	return (
		<VStack
			w='full'
			h='auto'
			alignItems='start'
			justifyContent='start'
			borderWidth={1}
			borderStyle='solid'
			borderRadius='lg'
		>
			{features.map((feature, index) => (
				<>
					<Feature feature={feature} key={feature.id} />
					{index < features.length - 1 ? (
						<Divider style={{ marginTop: '0' }} />
					) : null}
				</>
			))}
		</VStack>
	);
}
