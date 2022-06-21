import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			if (userCredential.user) {
				toast('Welcome');
				navigate('/');
			}
		} catch (error) {
			toast.error('Bad user credentials\nTry again.');
		}
	};

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back</p>
				</header>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>
					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							id='password'
							placeholder='Password'
							className='passwordInput'
							value={password}
							onChange={onChange}
						/>

						<img
							src={visibilityIcon}
							alt='show password'
							className='showPassword'
							onClick={() => {
								setShowPassword((prevState) => !prevState);
							}}
						/>
					</div>
					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password
					</Link>
					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#fff' width='36px' height='36px' />
						</button>
					</div>
				</form>

				<Link to='/sign-up' className='registerLink'>
					Sign Up Instead
				</Link>
			</div>
		</>
	);
}

export default SignIn;
