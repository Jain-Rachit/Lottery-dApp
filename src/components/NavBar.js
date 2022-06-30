import React from 'react'

function NavBar(props) {
    return (
        <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand">Ether Lottery</a>
        <form className="d-flex">      
        <button onClick= {props.connectWallet} className="btn btn-outline-primary" type="button">Connect to Wallet</button>
        </form>
    </div>
    </nav>
    );
}

export default NavBar