import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { Table } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';

export class ScheduleViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsInClass : []
        };
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('Users/' + this.props.fbID);
        this.userRef.on('value', (snapshot) => {
            let val = snapshot.val();
            this.setState({ 'classList': val })
        });
    }

    componentWillUnmount() {
        this.userRef.off();
    }

    handleClickClass(className) {
        let classRef = firebase.database().ref('Classes/' + className)
            .once('value', (snapshot) => {
                let allKeys = Object.keys(snapshot.val())
                let allPeople = [];
                allKeys.forEach(key => allPeople.push(snapshot.val()[key]))
                let friends = [];
                this.props.friendList.forEach(person => {
                    if (allPeople.includes(person.id)) {
                        friends.push(person.name)
                    }
                })
                this.setState({ friendsInClass: friends })
            })
    }

    render() {
        let userId = this.props.fbID
        if (this.state.classList) {
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
                                            <th>Class Name</th>
                                            <th>Section</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseItems}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-sm">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Friends List</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.friendsInClass.map(friendName => <tr key={friendName}><td>{friendName}</td></tr>)
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div>This is some text</div>);
        }
    }
}

class ClassItem extends Component {

    handleClick(className) {
        this.props.friendsCallback(className);
    }

    render() {
        return (
            <tr onClick={() => this.handleClick(this.props.course.class + "" + this.props.course.section)}>
                <td>{this.props.course.class}</td>
                <td>{this.props.course.section}</td>
            </tr>
        )
    }
}