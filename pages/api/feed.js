import nc from 'next-connect';
import Cors from 'cors';
import { supabase } from '../../lib/supabaseClient';

async function changelogFeed(req, res) {
	const { userId } = req.query;

	const { data, error } = await supabase
		.from('changelogs')
		.select()
		.match({ author: userId })
		.order('updated_at', { ascending: false });

	if (data && data.length > 0) {
		res.status(200).json({ feed: data });
	} else {
		res.status(400).json({ error });
	}
}

export default nc({ attachParams: true })
	.use(Cors({ origin: true }))
	.get(changelogFeed);
