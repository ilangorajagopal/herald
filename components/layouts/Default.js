import { chakra } from '@chakra-ui/react';
import { Container, Header } from '../common';

const DefaultLayout = (props) => (
	<Container height='auto' minH='100vh'>
		<Header />
		<chakra.div
			w='full'
			maxW='container.md'
			h='auto'
			d='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='flex-start'
			flex='1 0 auto'
		>
			{props.children}
		</chakra.div>
	</Container>
);

export default DefaultLayout;
