import { Search } from './ui/search';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/nextjs';

export default function Header() {
	return (
		<div className=" top-1 bg-yellow-500">
			<div className="absolute right-3 top-3">
				<UserButton afterSignOutUrl="/sign-in" />
			</div>
			<h1 className="text-left ml-5 text-[min(12vw,2.5rem)] font-bold text-black">
				<a href="/">SAPID ADMIN</a>
			</h1>
			<Search />
		</div>
	);
}
