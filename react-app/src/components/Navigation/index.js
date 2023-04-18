import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Link-us</NavLink>
			</li>
			{isLoaded && !sessionUser && (
				<li>
					<div>
						<div><NavLink to="/signup">Sign up</NavLink></div>
						<div><NavLink to="/login">Login</NavLink></div>
					</div>
				</li>
			)}
			{isLoaded && sessionUser && (
				<li>
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
