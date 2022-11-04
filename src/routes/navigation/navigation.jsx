import { Fragment} from "react";
import {Outlet} from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {useDispatch, useSelector} from "react-redux";

import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles'
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const signOutUser = () => { dispatch(signOutStart())}
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
                            (<NavLink as={'span'} onClick={signOutUser}>Sign out</NavLink>) :
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