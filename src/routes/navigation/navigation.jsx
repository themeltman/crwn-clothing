import { Fragment, useContext} from "react";
import {Outlet, Link} from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {sigOutUser} from "../../utils/firebase/firebase.utils";

import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles'
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer  to={'/'}>
                    <CrwnLogo className={'logo'} />
                </LogoContainer>
                <NavLinks>
                    <NavLink to={'/shop'}>
                        SHOP
                    </NavLink>

                    {
                        currentUser ?
                            (<NavLink as={'span'} onClick={sigOutUser}>Sign out</NavLink>) :
                            (<NavLink to={'/auth'}>Sign In</NavLink>)
                    }
                    <CartIcon/>

                </NavLinks>
                {isCartOpen && <CartDropdown/> }


            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}
export default Navigation