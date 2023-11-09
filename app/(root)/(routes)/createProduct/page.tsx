import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';
import CreateProductPage from '@/components/ui/createProduct/create';

export default function Notes() {
	return (
		<>
			<Header />

			<div className=" mt-20 h-auto justify-center object-center">
				<CreateProductPage />
			</div>
		</>
	);
}
