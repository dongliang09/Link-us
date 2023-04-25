import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	let navFlex = sessionUser ? "flx " : "flx-jc-sb ";

	return (
		<ul className={navFlex + "width-max-1300p mrg-lr-auto gap-15p"}>
			<li className='li-none'>
				<NavLink exact to="/" className="fontS-125rem pad-15p">Link-us</NavLink>
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
							<div className='bg-gray pad-5p borderR-10p'>
								<form >
									<i className="fas fa-search pad-l-5p"></i>
									<input placeholder='Search coming soon'
										className='bg-gray border-0p'/>
								</form>
							</div>
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
