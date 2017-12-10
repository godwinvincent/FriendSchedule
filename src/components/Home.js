import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
    logo: {
        fontSize: '30px',
        color: colors.redish,
        marginRight: '1rem',
        fontStyle: 'italic'
    },
    welcome: {
        color: colors.white,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage: 'url("http://cte.uw.edu/w/images/1/1b/Kane130-007.jpg")',
        backgroundRepeat: 'no-repeat'
    },
    welcomeText: {
        width: 'min-width',
        height: 'min-height',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'relative',
        top: '200px',
        textAlign: 'center',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto'
    }
})


export default class Home extends Component{
    render(){
        return(
            <div>
                <div className={css(styles.welcome)} >
                    <div className={css(styles.welcomeText)}>
                        <h2>Welcome to <span className={css(styles.logo)}>FriendFinder</span></h2>
                        <p>Never miss a friend in class again</p>
                        <small>Created by Avani Amin, Godwin Vincent, Taehyun Kwon, and Dustin Langner</small>
                    </div>
                </div>
            </div>
        );
    }
}