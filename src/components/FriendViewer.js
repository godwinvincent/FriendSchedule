import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { Table } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom'
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
    tr: {
        ':hover': {
            backgroundColor: 'grey',
            color: 'white',
            cursor: 'pointer'
        }
    }
})

export class FriendViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsInClass: [],
            classList: []
        };
    }


    handleClickClass(friendID) {
        this.userRef = firebase.database().ref('Users/' + friendID);
        this.userRef.on('value', (snapshot) => {
            let val = snapshot.val();
            this.setState({ 'classList': val })
        });
    }

    render() {
        if (this.props.friendList) {
        let friends = [];
        Object.keys(this.props.friendList).forEach((key,index) => {
            friends.push( <tr className={css(styles.tr)}  onClick={() => this.handleClickClass(this.props.friendList[index].id)} key={key}><td>{this.props.friendList[index].name}</td></tr>)
        })
        let courseIds = Object.keys(this.state.classList);
        let courseItems = courseIds.map((courseId) => {
            let course = this.state.classList[courseId];
            course.id = courseId;
            return <ClassItem friendsCallback={(className) => this.handleClickClass(className)} userId={this.props.fbID} key={course.id} course={course} currentUser={this.props.fbID} />
        });
            return (
                <div>
                    <div className="container">
                        <div className="row">
                        <div className="col-sm">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Friends List</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           friends
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-sm">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Section</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseItems}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div>You currently don't have any classes! <Link to='/class'>Click here to add classes</Link></div>);
        }
    }
}

class ClassItem extends Component {

    handleClick(className) {
        this.props.friendsCallback(className);
    }

    render() {
        return (
            <tr className={css(styles.tr)}>
                <td>{this.props.course.class}</td>
                <td>{this.props.course.section}</td>
            </tr>
        )
    }
}