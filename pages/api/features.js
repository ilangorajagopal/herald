import nc from 'next-connect';
import Cors from 'cors';
import { supabase } from '../../lib/supabaseClient';

async function fetchFeatures(req, res) {
	const { roadmapId } = req.query;

	const { data, error } = await supabase
		.from('features')
		.select()
		.match({ roadmap_id: roadmapId })
		.order('upvotes', { ascending: false });

	if (data && !error) {
		res.status(200).json({ features: data });
	} else {
		res.status(400).json({ error });
	}
}

export default nc({ attachParams: true })
	.use(Cors({ origin: true }))
	.get(fetchFeatures);
