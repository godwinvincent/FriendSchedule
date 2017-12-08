import React, { Component } from 'react';
import { NavBar } from './Navigation';

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
        backgroundImage: 'url("http://blog.colourfulrebel.com/en/files/2017/07/15-1024x682.jpg")',
        backgroundRepeat: 'no-repeat'
    },
    welcomeText: {
        width: 'min-width',
        height: 'min-height',
        backgroundColor: 'rgba(36, 48, 94, 0.5)',
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
                <NavBar shouldShowNav={true} />
                <div className={css(styles.welcome)} >
                <div className={css(styles.welcomeText)}>
                    <h2>Welcome To <span className={css(styles.logo)}>Juvo</span></h2>
                    <p>Never miss a friend in class again</p>
                    <small>Created by Avani Amin, Godwin Vincent, Taehyun Kwon, and Dustin Langner</small>
                </div>
            </div>
            </div>
           
        );
    }
}