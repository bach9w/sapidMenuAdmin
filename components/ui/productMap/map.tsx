import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Content {
	id: number;
	title: string;
	description: string;
	category_id: number;
	price: number;
}

async function fetchTitleById(id: number): Promise<string | null> {
	const { data, error } = await supabase
		.from('category')
		.select('title')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data?.title ?? null;
}

function MapPage() {
	const [products, setProducts] = useState<any[]>([]);
	const [titles, setTitles] = useState<{ [key: number]: string }>({});
	const searchParams = useSearchParams();

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const categoryId = searchParams.get('categoryId');
		getProducts();
	}, []);

	useEffect(() => {
		products.forEach(async (item: Content) => {
			const title = await fetchTitleById(item.category_id);
			setTitles((prev) => ({ ...prev, [item.category_id]: title ?? '' }));
		});
	}, [products]);

	async function getProducts() {
		try {
			const { data, error } = await supabase
				.from('content')
				.select('*')
				.order('id', { ascending: false })
				.limit(1);
			if (error) throw error;
			if (data != null) {
				setProducts(data);
			}
		} catch (error) {
			alert((error as Error).message);
		}
	}

	return (
		<div className="h-auto w-[350px] absolute justify-center object-center items-center">
			<div></div>
			{products.map((content) => (
				<div className="bg-white mt-5 rounded-md">
					<div>
						<h1 className="text-center font-bold">LAST PRODUCT</h1>
					</div>
					<div className="text-center bg-yellow-500 font-bold">
						{content.title}
					</div>
					<div className="justify-center bg-yellow-500 items-center flex mt-3">
						<label htmlFor="title" className="mr-3">
							{content.description}
						</label>
					</div>
					<div className="justify-center bg-yellow-500 items-center flex mt-3">
						<label htmlFor="title" className="mr-3">
							{titles[content.category_id] || 'Зарежда се...'}
						</label>
					</div>
					<div className="justify-center bg-yellow-500 items-center flex mt-3">
						<label htmlFor="title" className="mr-3">
							{content.price} ЛВ.
						</label>
					</div>
				</div>
			))}
		</div>
	);
}
export default MapPage;
