import { Box, chakra, useColorModeValue } from '@chakra-ui/react';
import SettingsLayout from '../../components/layouts/Settings';

function Widget() {
	return (
		<SettingsLayout>
			<chakra.h2 fontSize='2xl' mb={8}>
				Widget Settings
			</chakra.h2>
			<Box
				w='full'
				h={48}
				d='flex'
				alignItems='center'
				justifyContent='center'
				borderWidth={2}
				borderStyle='solid'
				borderColor={useColorModeValue('gray.400', 'gray.700')}
				borderRadius='lg'
			>
				Coming soon!
			</Box>
		</SettingsLayout>
	);
}

export default Widget;
