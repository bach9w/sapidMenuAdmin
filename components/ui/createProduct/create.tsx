'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import MapPage from '../productMap/map';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
type CategoryType = {
	id: number;
	title: string;
};

function CreateProductPage() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [price, setPrice] = useState('');
	const [date, setDate] = useState('');
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase.from('category').select('*');
			if (error) {
				console.log(error);
			} else {
				setCategories(data);
			}
		};
		fetchCategories();
	}, []);

	async function createProduct() {
		console.log('Title: ', title);
		console.log('Description: ', description);
		console.log('Category: ', categoryId);
		console.log('Price: ', price);

		if (!title || !description || !categoryId || !price) {
			alert('Моля, попълнете всички полета.');
			return;
		}

		try {
			const { data, error } = await supabase
				.from('content')
				.insert([
					{
						title: title,
						description: description,
						category_id: categoryId,
						price: price,
					},
				])
				.single();
			if (error) throw error;
			window.location.reload();
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	}
	const handleCategoryChange = (value: string) => {
		console.log('Selected Category ID:', value);
		console.log('Selected Category ID:', value);
		setCategoryId(value);
	};

	return (
		<>
			<div className="  flex justify-center items-top">
				<div className="h-full w-auto ">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Create product</CardTitle>
							<CardDescription>Add new product to the menu</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Title</Label>
										<Input
											id="name"
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Title of product"
										/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="category">Category</Label>

										<Select
											value={categoryId}
											onValueChange={handleCategoryChange}
										>
											<SelectTrigger id="framework">
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent position="popper">
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id.toString()}
													>
														{category.title}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="description">Description</Label>
										<Input
											id="description"
											placeholder="Description of product"
											onChange={(e) => setDescription(e.target.value)}
										/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											placeholder="Price"
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Cancel</Button>
							<Button onClick={(e) => createProduct()}>Create</Button>
						</CardFooter>
					</Card>
					<MapPage />
				</div>
			</div>
		</>
	);
}

export default CreateProductPage;
