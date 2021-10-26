import { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
	chakra,
	Button,
	VStack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import BannerEditor from '../../../components/admin/BannerEditor';
import DefaultLayout from '../../../components/layouts/Default';
import { saveBanner, publishBanner } from '../../../lib/utils';

export default function NewBanner() {
	const router = useRouter();
	const [banner, setBanner] = useState(null);
	const [bannerBgColor, setBannerBgColor] = useState('#2cb67d');
	const [content, setContent] = useState('');
	const [cta, setCta] = useState('');
	const [ctaButtonBgColor, setCtaButtonBgColor] = useState('#010101');
	const [ctaText, setCtaText] = useState('');
	const [ctaType, setCtaType] = useState('link');
	const [title, setTitle] = useState('');
	const [type, setType] = useState('hero-featured-post');
	const toast = useToast();

	async function saveHandler() {
		const bannerData = {
			title,
			content,
			cta,
			cta_type: ctaType,
			cta_text: ctaText,
			cta_bg: ctaButtonBgColor,
			bg: bannerBgColor,
			type,
		};
		await saveBanner(bannerData, banner, setBanner);
		toast({
			title: 'Saved!',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right',
		});
	}

	async function publishHandler() {
		const bannerData = {
			title,
			content,
			cta,
			cta_type: ctaType,
			cta_text: ctaText,
			cta_bg: ctaButtonBgColor,
			bg: bannerBgColor,
			type,
		};
		await publishBanner(bannerData, banner, setBanner);
		toast({
			title: 'Published!',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right',
		});
		await router.push('/dashboard');
	}

	return (
		<DefaultLayout>
			<VStack
				py={8}
				w='full'
				d='flex'
				alignItems='start'
				justifyContent='start'
				spacing={8}
			>
				<chakra.a>
					<NextLink href='/dashboard'>
						<Button
							variant='outline'
							borderWidth={1}
							borderColor={useColorModeValue('gray.400', 'white')}
							color={useColorModeValue('gray.400', 'white')}
							w={10}
							h={10}
							p={0}
						>
							<FaChevronLeft />
						</Button>
					</NextLink>
				</chakra.a>
				<BannerEditor
					bannerBgColor={bannerBgColor}
					setBannerBgColor={setBannerBgColor}
					content={content}
					setContent={setContent}
					cta={cta}
					setCta={setCta}
					ctaButtonBgColor={ctaButtonBgColor}
					setCtaButtonBgColor={setCtaButtonBgColor}
					ctaText={ctaText}
					setCtaText={setCtaText}
					ctaType={ctaType}
					setCtaType={setCtaType}
					title={title}
					setTitle={setTitle}
					type={type}
					setType={setType}
					saveBanner={saveHandler}
					publishBanner={publishHandler}
				/>
			</VStack>
		</DefaultLayout>
	);
}
