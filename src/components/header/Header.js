import React from 'react'


function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = props.title ? capitalize(props.title) : "Welcome to To-DO App"
    return (
        <nav className="navbar navbar-dark bg-primary ">
            <div className="row col-md-10 d-flex justify-content-center text-white">
                <span className="h3">{title}</span>
            </div>
            <div className="row col-md-2 d-flex justify-content-center text-white">
                {props.loggedIn === true && (
                    <div>
                        <button className="button" onClick={() => props.handleMySkyLogout()}>
                            Log-Out of MySky
                        </button>
                    </div>
                )}

                {props.loggedIn === false && (
                    <button className="button" color="green" onClick={() => props.handleMySkyLogin()}>
                        Login with MySky
                    </button>
                )}

            </div>
        </nav>
    )
}

export default Header
