import {
	chakra,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Textarea,
	useColorModeValue,
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import startCase from 'lodash.startcase';

export default function FeatureModal(props) {
	const {
		createFeatureRequest,
		defaultCTA,
		emailRequired,
		loadingCTA,
		isOpen,
		onClose,
	} = props;
	const [isFeatureSaving, setIsFeatureSaving] = useState(false);
	const [featureStatus, setFeatureStatus] = useState('planned');

	return (
		<Modal isCentered={true} isOpen={isOpen} onClose={onClose} size='3xl'>
			<ModalOverlay />
			<ModalContent
				color={useColorModeValue('gray.900', 'gray.100')}
				p={2}
			>
				<ModalHeader>Create New Feature</ModalHeader>
				<ModalCloseButton />
				<ModalBody py={4}>
					<Formik
						initialValues={{
							requested_by: '',
							title: '',
							description: '',
						}}
						onSubmit={async (values) => {
							setIsFeatureSaving(true);
							await createFeatureRequest({
								...values,
								status: featureStatus,
							});
							setIsFeatureSaving(false);
						}}
					>
						{(formik) => (
							<chakra.form
								w='full'
								onSubmit={formik.handleSubmit}
							>
								{emailRequired ? (
									<FormControl mb={4}>
										<FormLabel>Your email</FormLabel>
										<Input
											onChange={(e) => {
												formik.handleChange(e);
											}}
											name='requested_by'
											type='text'
											value={formik.values.requested_by}
											w='full'
											h={12}
										/>
									</FormControl>
								) : null}
								<FormControl mb={4}>
									<FormLabel>What is the feature?</FormLabel>
									<Input
										onChange={(e) => {
											formik.handleChange(e);
										}}
										name='title'
										type='text'
										value={formik.values.title}
										w='full'
										h={12}
									/>
								</FormControl>
								<FormControl mb={4}>
									<FormLabel>
										Describe the feature in a short
										paragraph
									</FormLabel>
									<Textarea
										onChange={(e) => {
											formik.handleChange(e);
										}}
										name='description'
										type='text'
										value={formik.values.description}
										w='full'
										h={32}
									/>
								</FormControl>
								<FormControl mb={8}>
									<FormLabel>Status</FormLabel>
									<Menu>
										<MenuButton
											as={Button}
											rightIcon={<FiChevronDown />}
											w='auto'
										>
											{startCase(featureStatus)}
										</MenuButton>
										<MenuList mt={2} p={0}>
											<MenuItem
												onClick={() =>
													setFeatureStatus('planned')
												}
												p={4}
											>
												Planned
											</MenuItem>
											<MenuItem
												onClick={() =>
													setFeatureStatus(
														'in progress'
													)
												}
												p={4}
											>
												In Progress
											</MenuItem>
											<MenuItem
												onClick={() =>
													setFeatureStatus(
														'completed'
													)
												}
												p={4}
											>
												Completed
											</MenuItem>
											<MenuItem
												onClick={() =>
													setFeatureStatus('live')
												}
												p={4}
											>
												Live
											</MenuItem>
										</MenuList>
									</Menu>
								</FormControl>
								<FormControl d='flex' justifyContent='flex-end'>
									<Button variant='ghost'>Cancel</Button>
									<Button
										colorScheme='brand'
										ml={3}
										isLoading={isFeatureSaving}
										type='submit'
									>
										{isFeatureSaving
											? loadingCTA
											: defaultCTA}
									</Button>
								</FormControl>
							</chakra.form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
