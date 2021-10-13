import { chakra } from '@chakra-ui/react';
import { Container, Footer, PublicPageHeader } from '../common';

const TimelineLayout = (props) => (
	<Container height='auto' minH='100vh'>
		<PublicPageHeader />
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
		<Footer />
	</Container>
);

export default TimelineLayout;
