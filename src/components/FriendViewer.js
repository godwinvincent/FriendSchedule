import React, { Component } from 'react';
import { Table } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom'
import * as colors from '../styles/colors'

const styles = StyleSheet.create({
    friendTr: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white
    },
    tr: {
        ':hover': {
            backgroundColor: colors.creamYellow,
            color: colors.navyBlue,
            cursor: 'pointer'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white
    },
    tableHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white
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
                    <h1>View Friends Schedule</h1>
                    <div className="container">
                        <div className="row">
                        <div className="col-sm">
                                <Table>
                                    <thead className={css(styles.tableHeader)}>
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
                                    <thead className={css(styles.tableHeader)}>
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
            return (<div>Looks like you don't have any friends using the app :( Encourage them to sign up today!</div>);
        }
    }
}

class ClassItem extends Component {

    handleClick(className) {
        this.props.friendsCallback(className);
    }

    render() {
        return (
            <tr className={css(styles.friendTr)}>
                <td>{this.props.course.class}</td>
                <td>{this.props.course.section}</td>
            </tr>
        )
    }
}