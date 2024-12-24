import { NavLink } from "react-router-dom";

function Nav({ link, title,...props }) {
  return (
    <li>
      <NavLink to={link} {...props} className='text-white text-center font-medium text-3xl'>
        {title}
      </NavLink>
    </li>
  );
}

export default Nav;
