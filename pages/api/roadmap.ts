import nc from 'next-connect';
import Cors from 'cors';
import { supabase } from '../../lib/supabaseClient';

async function fetchRoadmap(req, res) {
	const { userId } = req.query;

	const { data, error } = await supabase
		.from('roadmaps')
		.select()
		.match({ author: userId })
		.single();

	if (data && !error) {
		res.status(200).json({ roadmap: data });
	} else {
		res.status(400).json({ error });
	}
}

export default nc({ attachParams: true })
	.use(Cors({ origin: true }))
	.get(fetchRoadmap);
