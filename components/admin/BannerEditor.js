import { useState } from 'react';
import {
	chakra,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Select,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { BlockPicker } from 'react-color';
import BannerPreview from './BannerPreview';

export default function BannerEditor(props) {
	const {
		bannerBgColor,
		setBannerBgColor,
		content,
		setContent,
		cta,
		setCta,
		ctaButtonBgColor,
		setCtaButtonBgColor,
		ctaText,
		setCtaText,
		ctaType,
		setCtaType,
		title,
		setTitle,
		type,
		setType,
		saveBanner,
		publishBanner,
	} = props;
	const [showBannerBgColorPicker, setShowBannerBgColorPicker] =
		useState(false);
	const [showCtaButtonBgColorPicker, setShowCtaButtonBgColorPicker] =
		useState(false);

	return (
		<>
			<BannerPreview
				bannerBgColor={bannerBgColor}
				content={content}
				cta={cta}
				ctaButtonBgColor={ctaButtonBgColor}
				ctaText={ctaText}
				ctaType={ctaType}
				title={title}
				type={type}
			/>
			<Divider />
			<VStack alignItems='flex-start' w='full' spacing={8}>
				<Input
					borderRadius='lg'
					h={16}
					fontSize='xl'
					defaultValue={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Banner Title'
				/>

				<Textarea
					defaultValue={content}
					fontSize='xl'
					h={48}
					onChange={(e) => setContent(e.target.value)}
					placeholder='Content of your banner'
					size='lg'
				/>

				<Heading as='h3' fontSize='2xl'>
					Banner Settings
				</Heading>
				<FormControl
					d='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<FormLabel fontSize='xl'>Banner Type</FormLabel>
					<Select
						fontSize='lg'
						w='auto'
						h={12}
						defaultValue={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value='hero-featured-post'>
							Featured Post
						</option>
						<option value='top-of-page'>Top of the page</option>
						<option value='in-app'>In-app</option>
					</Select>
				</FormControl>
				<FormControl
					d='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<FormLabel fontSize='xl'>Banner Background Color</FormLabel>
					<chakra.div position='relative'>
						<Button
							w='auto'
							h='auto'
							p={0}
							borderRadius='lg'
							overflow='hidden'
							onClick={() =>
								setShowBannerBgColorPicker(
									!showBannerBgColorPicker
								)
							}
						>
							<chakra.span
								w={8}
								h={8}
								style={{
									backgroundColor: bannerBgColor,
								}}
							/>
							<chakra.span px={4}>{bannerBgColor}</chakra.span>
						</Button>
						{showBannerBgColorPicker ? (
							<chakra.div
								position='absolute'
								top={12}
								left='-12'
								shadow='md'
								zIndex={10}
							>
								<chakra.div
									position='fixed'
									top={0}
									bottom={0}
									left={0}
									right={0}
									onClick={() =>
										setShowBannerBgColorPicker(false)
									}
								/>
								<BlockPicker
									color={bannerBgColor}
									colors={[]}
									onChange={(color) =>
										setBannerBgColor(color.hex)
									}
								/>
							</chakra.div>
						) : null}
					</chakra.div>
				</FormControl>
				<FormControl
					d='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<FormLabel fontSize='xl'>Banner Call-to-action</FormLabel>
					<Input
						borderRadius='lg'
						w='50%'
						h={12}
						fontSize='xl'
						defaultValue={cta}
						onChange={(e) => setCta(e.target.value)}
						placeholder='Call To Action'
					/>
				</FormControl>
				<FormControl
					d='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<FormLabel fontSize='xl'>CTA Text</FormLabel>
					<Input
						borderRadius='lg'
						w='50%'
						h={12}
						fontSize='xl'
						defaultValue={ctaText}
						onChange={(e) => setCtaText(e.target.value)}
						placeholder='Link/Button text'
					/>
				</FormControl>
				<FormControl
					d='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<FormLabel fontSize='xl'>CTA Type</FormLabel>
					<Select
						fontSize='lg'
						w='auto'
						h={12}
						defaultValue={ctaType}
						onChange={(e) => setCtaType(e.target.value)}
					>
						<option value='link'>Link</option>
						<option value='button'>Button</option>
						<option value='user-defined'>User Defined</option>
					</Select>
				</FormControl>
				{ctaType === 'button' ? (
					<FormControl
						d='flex'
						alignItems='center'
						justifyContent='space-between'
					>
						<FormLabel fontSize='xl'>
							Banner Background Color
						</FormLabel>
						<chakra.div position='relative'>
							<Button
								w='auto'
								h='auto'
								p={0}
								borderRadius='lg'
								overflow='hidden'
								onClick={() =>
									setShowCtaButtonBgColorPicker(
										!showCtaButtonBgColorPicker
									)
								}
							>
								<chakra.span
									w={8}
									h={8}
									style={{
										backgroundColor: ctaButtonBgColor,
									}}
								/>
								<chakra.span px={4}>
									{ctaButtonBgColor}
								</chakra.span>
							</Button>
							{showCtaButtonBgColorPicker ? (
								<chakra.div
									position='absolute'
									top={12}
									left='-12'
									shadow='md'
									zIndex={10}
								>
									<chakra.div
										position='fixed'
										top={0}
										bottom={0}
										left={0}
										right={0}
										onClick={() =>
											setShowCtaButtonBgColorPicker(false)
										}
									/>
									<BlockPicker
										color={ctaButtonBgColor}
										colors={[]}
										onChange={(color) =>
											setCtaButtonBgColor(color.hex)
										}
									/>
								</chakra.div>
							) : null}
						</chakra.div>
					</FormControl>
				) : null}
				<HStack
					w='full'
					d='flex'
					alignItems='center'
					justifyContent='flex-end'
					spacing={4}
				>
					<Button onClick={saveBanner}>Save</Button>
					<Button colorScheme='brand' onClick={publishBanner}>
						Publish
					</Button>
				</HStack>
			</VStack>
		</>
	);
}
