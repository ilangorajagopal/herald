import {
	chakra,
	Button,
	Flex,
	Icon,
	Tag,
	useColorModeValue,
} from '@chakra-ui/react';
import { BiX } from 'react-icons/bi';
import { VscArrowRight } from 'react-icons/vsc';

export default function BannerPreview(props) {
	const {
		bannerBgColor,
		content,
		cta,
		ctaButtonBgColor,
		ctaText,
		ctaType,
		title,
		type,
	} = props;

	let ctaElement = null;
	if (ctaType === 'link') {
		ctaElement = (
			<chakra.a
				d='flex'
				alignItems='center'
				href={cta}
				textDecoration='underline'
			>
				{ctaText}
				<Icon as={VscArrowRight} ml={2} />
			</chakra.a>
		);
	} else if (ctaType === 'button') {
		ctaElement = (
			<chakra.a href={cta}>
				<Button
					p={4}
					bg={ctaButtonBgColor}
					_hover={{ bg: ctaButtonBgColor }}
					color='white'
				>
					{ctaText}
				</Button>
			</chakra.a>
		);
	}

	let bannerElement = null;
	if (type === 'hero-featured-post') {
		bannerElement = (
			<chakra.div
				d='flex'
				alignItems='center'
				justifyContent='flex-start'
				w='lg'
				h={16}
				bg={bannerBgColor}
				p={4}
				position='relative'
				rounded='lg'
			>
				<Tag bg={ctaButtonBgColor} mr={4} variant='solid'>
					New
				</Tag>
				<chakra.span fontSize='md' fontWeight='bold' mr={2}>
					{title}
				</chakra.span>
				{ctaElement}
			</chakra.div>
		);
	} else if (type === 'top-of-page') {
		bannerElement = (
			<chakra.div
				d='flex'
				alignItems='center'
				justifyContent='center'
				w='full'
				h={16}
				bg={bannerBgColor}
				p={6}
				position='relative'
			>
				<chakra.span
					position='absolute'
					top='50%'
					right={4}
					transform='translateY(-50%)'
				>
					<Icon as={BiX} color='white' w={8} h={8} />
				</chakra.span>
				<chakra.span fontSize='md' fontWeight='bold' mr={4}>
					{title}
				</chakra.span>
				{ctaElement}
			</chakra.div>
		);
	} else if (type === 'in-app') {
		bannerElement = (
			<chakra.div
				d='flex'
				flexDirection='column'
				alignItems='flex-start'
				justifyContent='center'
				w='2xl'
				h='auto'
				bg={bannerBgColor}
				rounded='lg'
				p={6}
				position='relative'
			>
				<chakra.span position='absolute' top={4} right={4}>
					<Icon as={BiX} color='white' w={8} h={8} />
				</chakra.span>
				<chakra.span
					color='white'
					fontSize='2xl'
					fontWeight='bold'
					mb={2}
				>
					{title}
				</chakra.span>
				<chakra.span color='white' fontSize='md' mb={6}>
					{content}
				</chakra.span>
				{ctaElement}
			</chakra.div>
		);
	}

	return (
		<>
			<Flex
				w='full'
				h={96}
				alignItems='center'
				justifyContent='center'
				bg={useColorModeValue('gray.300', 'gray.700')}
				shadow='md'
				rounded='lg'
			>
				{bannerElement}
			</Flex>
			<chakra.span fontSize='sm'>
				<em>
					Note: This is only a preview. When embedding the banners on
					your site, you have complete control over the styling of the
					banners. Check our docs to learn how to style the banners.
				</em>
			</chakra.span>
		</>
	);
}
