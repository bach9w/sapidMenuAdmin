import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';
import CreateCategoryPage from '@/components/ui/createCategory/create';
import CategoryMap from '@/components/ui/createCategory/categoryMap';

export default function Notes() {
	return (
		<>
			<Header />

			<div className=" mt-20 h-auto justify-center object-center">
				<CreateCategoryPage />
				<CategoryMap />
			</div>
		</>
	);
}
