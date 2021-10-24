import {
	Divider,
	Flex,
	HStack,
	Heading,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';

function Feature(props) {
	const { feature } = props;

	return (
		<HStack w='full' h={32} p={4} spacing={4}>
			<VStack spacing={4}>
				<Heading as='h4' fontSize='lg' fontWeight='semibold'>
					{feature.title}
				</Heading>
				<Text>{feature.description}</Text>
			</VStack>
		</HStack>
	);
}

export default function FeatureList(props) {
	const { features } = props;

	return (
		<Flex
			w='full'
			h='auto'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			borderWidth={1}
			borderStyle='solid'
			borderColor={useColorModeValue('gray.400', 'gray.700')}
			borderRadius='lg'
		>
			{features.map((feature, index) => (
				<>
					<Feature feature={feature} key={feature.id} />
					{index === features.length - 1 ? <Divider /> : null}
				</>
			))}
		</Flex>
	);
}
