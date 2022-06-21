import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
	const navigate = useNavigate();
	const auth = getAuth();

	const [formData, setFormData] = useState({
		email: auth?.currentUser?.email,
		name: auth?.currentUser?.displayName,
	});
	const [changeDetails, setChangeDetails] = useState(false);

	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate('/sign-in');
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, { name });
			}
			toast.success('Updated profile');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
	};

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Person Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>

				<div className='profileCard'>
					<form>
						<input
							type='text'
							id='name'
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
							value={name}
							disabled={!changeDetails}
							onChange={onChange}
						/>
						<input
							type='text'
							id='email'
							className={
								!changeDetails ? 'profileEmail' : 'profileEmailActive'
							}
							value={email}
							disabled={!changeDetails}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Profile;
