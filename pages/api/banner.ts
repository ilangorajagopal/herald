import nc from 'next-connect';
import Cors from 'cors';
import { supabase } from '../../lib/supabaseClient';

async function fetchBanner(req, res) {
	const { id, userId } = req.query;

	const { data, error } = await supabase
		.from('banners')
		.select()
		.match({ author: userId, id })
		.order('updated_at', { ascending: false })
		.single();

	if (data) {
		res.status(200).json({ banner: data });
	} else {
		res.status(400).json({ error });
	}
}

export default nc({ attachParams: true })
	.use(Cors({ origin: true }))
	.get(fetchBanner);
