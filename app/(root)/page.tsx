import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';

export default function Notes() {
	return (
		<>
			<Header />
			<div className="h-auto m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800">
				<div className=" mt-10">
					<List />
				</div>
			</div>
		</>
	);
}
