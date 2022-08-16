import { Fragment, useContext} from "react";
import {Outlet, Link} from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {sigOutUser} from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const signOutHandler = async () => {
        try {
            sigOutUser()
            currentUser.setCurrentUser(null)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Fragment>
            <div className={'navigation'}>
                <Link className={'logo-container'} to={'/'}>
                    <CrwnLogo className={'logo'} />
                </Link>
                <div className={'nav-links-container'}>
                    <Link className={'nav-link'} to={'/shop'}>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (<span className={'nav-link'} onClick={signOutHandler}>Sign out</span>) :
                            (<Link className={'nav-link'} to={'/auth'}>Sign In</Link>)
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation