import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import googleIcon from '../assets/svg/googleIcon.svg';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

function OAuth() {
	const navigate = useNavigate();
	const location = useLocation();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timeStamp: serverTimestamp(),
				});
			}
			navigate('/');
			toast.success('Welcome');
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div className='socialLogin'>
			<p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
			<button className='socialIconDiv' onClick={onGoogleClick}>
				<img className='socialIconImg' src={googleIcon} alt='googleIcon' />
			</button>
		</div>
	);
}

export default OAuth;
