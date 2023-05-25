import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	let navFlex = sessionUser ? "flx " : "flx-jc-sb ";

	return (
		<ul className={navFlex + "width-max-1300p mrg-lr-auto gap-15p"}>
			<li className='li-none mrg-tb-auto'>
				<NavLink exact to="/" className="fontS-125rem pad-15p fontF-Bruno">Link<span className='bg-main-blue borderR-5p color-white pad-lr-3p'>Yet</span></NavLink>
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

						<div className='bg-gray mrg-tb-auto borderR-10p'>
							{/* <form >
								<i className="fas fa-search pad-l-5p"></i>
								<input placeholder='Search coming soon'
									className='bg-gray border-0p'/>
							</form> */}
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
