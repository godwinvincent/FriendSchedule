import React, { Component } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';


import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';
import { Button } from 'reactstrap';

const styles = StyleSheet.create({
    btn: {
        ':hover': {
            backgroundColor: colors.creamYellow,
            color: colors.navyBlue,
        },
        fontSize: '10pt',
        color: colors.navyBlue,
        backgroundColor: colors.lightBlue,
        float: 'right'
    },
    logo: {
        fontSize: '30px',
        color: colors.redish,
        marginTop: '1rem',
        marginRight: '2rem',
        fontStyle: 'italic'
    },
    nav: {
        backgroundColor: colors.navyBlue,
        padding: '0.75rem',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
    },
    navList: {
        display: 'inline-block',
        margin: '0',
        padding: '.5rem 0 0'
    },
    navListItem: {
        display: 'inline',

        marginRight: '1rem',
        textDecoration: 'none'
    },
    navLink: {
        ':hover': {
            color: colors.lightBlue,
            borderBottom: '.6rem solid #A8D0E6'
        },
        fontSize: '15px',
        color: colors.creamYellow,
        textDecoration: 'none'
    }
})

export class NavBar extends Component {
    render() {
        return (
            // <nav className="navbar navbar-light" style={styles.nav}>
            //     <div className="container-fluid">
            //         <div className="navbar-header">
            //             <span className={css(styles.logo)}>Juvo</span>
            //         </div>
            //         {this.props.shouldShowNav && 

            //         <ul className={"nav navbar-nav"}>
            //             <li>
            //                 <NavLink className="nav-link" exact to="/">Home</NavLink>
            //             </li>
            //             <li>
            //                 <NavLink className="nav-link" to="/schedule">You and Friends</NavLink>
            //             </li>
            //             <li>
            //                 <NavLink className="nav-link" to="/class">Add/Modify Classes</NavLink>
            //             </li>
            //         </ul> 
            //         }

            //     </div>
            // </nav>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" exact to="/">Juvo</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/schedule">You and Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/class">Add/Modify Classes</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


/* {this.props.shouldShowNav && 
                    <Button className={css(styles.btn)} onClick={this.props.signOutCallback}>Sign Out</Button>
                } */