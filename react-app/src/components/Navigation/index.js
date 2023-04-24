import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='flx width-max-1300p mrg-lr-auto gap-15p'>
			<li className='li-none'>
				<NavLink exact to="/">Link-us</NavLink>
			</li>
			{isLoaded && !sessionUser && (
				<li className='li-none'>
					<div className='flx gap-2rem'>
						<div><NavLink to="/signup" className="fontS-125rem">Sign up</NavLink></div>
						<div><NavLink to="/login" className="fontS-125rem border-second-blue borderR-20p pad-10p">Login</NavLink></div>
					</div>
				</li>
			)}
			{isLoaded && sessionUser && (
				<li className='li-none flx-jc-sb width-max-1000p width-1100p'>
						<div>
							<div>search bar</div>
						</div>
						<div>
							<ProfileButton user={sessionUser} />
						</div>
				</li>
			)}
		</ul>
	);
}

export default Navigation;
