import React, { Component, Button } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';
import { Button } from 'reactstrap';

const styles = StyleSheet.create({
    btn: {
        fontSize: '10pt',
        color: colors.navyBlue,
        backgroundColor: colors.lightBlue,
    },
    logo: {
        fontSize: '30px',
        color: colors.redish,
        margin: '1rem',
        marginRight: '2rem',
        fontStyle: 'italic'
    },
    nav: {
        backgroundColor: colors.navyBlue,
        padding: '0.75rem',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%'
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
            <nav className={css(styles.nav)}>
                <span className={css(styles.logo)}>Juvo</span>

                {this.props.shouldShowNav && 
                    <ul className={css(styles.navList)}>
                    <li className={css(styles.navListItem)}>
                        <NavLink className={css(styles.navLink)} exact to="/">Home</NavLink>
                    </li>
                    <li className={css(styles.navListItem)}>
                        <NavLink className={css(styles.navLink)} to="/schedule">You and Friends</NavLink>
                    </li>
                    <li className={css(styles.navListItem)}>
                        <NavLink className={css(styles.navLink)} to="/class">Add/Modify Classes</NavLink>
                    </li>
                    <Button className="btn signout pull-right" onClick={this.props.signOutCallback}>Sign Out</Button>
                </ul>
                }
            </nav>
        );
    }
}