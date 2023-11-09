'use client';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StaggeredDropDown from '../DropDown';

export function Search() {
	return (
		<div className="">
			<Input type="search" className="w-full absolute mt-2 " />

			<StaggeredDropDown />
		</div>
	);
}
