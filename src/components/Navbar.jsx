import { useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as PersonOutLineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
		return false;
	};

	return (
		<footer className='navbar'>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					<li className='navbarListItem'>
						<ExploreIcon
							fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
							width='36px'
							height='36px'
							onClick={() => {
								navigate('/');
							}}
						/>
						<p>Explore</p>
					</li>
					<li className='navbarListItem'>
						<OfferIcon
							fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
							width='36px'
							height='36px'
							onClick={() => {
								navigate('/offers');
							}}
						/>
						<p>Offers</p>
					</li>
					<li className='navbarListItem'>
						<PersonOutLineIcon
							fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
							width='36px'
							height='36px'
							onClick={() => {
								navigate('/profile');
							}}
						/>
						<p>Profile</p>
					</li>
				</ul>
			</nav>
		</footer>
	);
}

export default Navbar;
