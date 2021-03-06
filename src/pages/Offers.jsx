import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	collection,
	getDoc,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	getDocs,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebaseConfig';
import ListingItem from '../components/ListingItem';

function Category() {
	const [listing, setListing] = useState(null);
	const params = useParams();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const listingRef = collection(db, 'listing');
				const q = query(
					listingRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(10)
				);
				const querySnap = await getDocs(q);

				let listing = [];

				querySnap.forEach((doc) => {
					listing.push({ id: doc.id, data: doc.data() });
				});
				setListing(listing);
			} catch (error) {
				console.log(error);
				toast.error('error');
			}
		};

		fetchListing();
	}, [params.categoryName]);

	const onDelete = () => {};

	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>Offers</p>
			</header>
			{listing && listing.length > 0 ? (
				<>
					<main>
						<ul className='categoryListings'>
							{listing.map((listing) => {
								return (
									<ListingItem
										key={listing.id}
										onDelete={onDelete}
										listing={listing.data}
										id={listing.id}
									/>
								);
							})}
						</ul>
					</main>
				</>
			) : (
				<p>There are no offers</p>
			)}
		</div>
	);
}

export default Category;
