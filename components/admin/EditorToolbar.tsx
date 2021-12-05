import { useRef, useState } from 'react';
import {
	Button,
	Heading,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	FaBold,
	FaCode,
	FaFileCode,
	FaHeading,
	FaItalic,
	FaLink,
	FaListOl,
	FaListUl,
	FaQuoteRight,
} from 'react-icons/fa';

function EditorToolbar({ editor }) {
	const [link, setLink] = useState('');
	const linkInputRef = useRef();

	function linkChangeHandler(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			// Call tiptap's link extension
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: link })
				.run();
			setLink('');
		}
	}

	return (
		<HStack w='full' spacing={2} mb={4}>
			<Menu>
				<MenuButton
					as={Button}
					bg='transparent'
					color={useColorModeValue('gray.900', 'gray.100')}
				>
					<FaHeading />
				</MenuButton>
				<MenuList>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run()
						}
					>
						<Heading as='h1' size='lg'>
							Heading 1
						</Heading>
					</MenuItem>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run()
						}
					>
						<Heading as='h2' size='md'>
							Heading 2
						</Heading>
					</MenuItem>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 3 })
								.run()
						}
					>
						<Heading as='h3' size='sm'>
							Heading 3
						</Heading>
					</MenuItem>
				</MenuList>
			</Menu>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<FaBold />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<FaItalic />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<FaListOl />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<FaListUl />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<FaQuoteRight />
			</Button>
			<Popover initialFocusRef={linkInputRef}>
				<PopoverTrigger>
					<Button
						bg='transparent'
						color={useColorModeValue('gray.900', 'gray.100')}
					>
						<FaLink />
					</Button>
				</PopoverTrigger>
				<PopoverContent p={4}>
					<Input
						ref={linkInputRef}
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyUp={linkChangeHandler}
					/>
				</PopoverContent>
			</Popover>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleCode().run()}
			>
				<FaCode />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<FaFileCode />
			</Button>
		</HStack>
	);
}

export default EditorToolbar;
