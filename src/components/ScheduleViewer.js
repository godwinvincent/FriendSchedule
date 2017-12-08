import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { Table } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';

export class ScheduleViewer extends Component {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                    <th>Class Name</th>
                    <th>Friend List</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        )
    }
}

class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('Users/' + this.props.fbID);
        this.userRef.on('value', (snapshot) => {
            let val = snapshot.val();
            let courseObj = {};
            courseObj['tester'] = val;
            this.setState(courseObj);
        });
    }

    componentWillUnmount() {
        this.userRef.off();
    }

    render() {
        let userId = 'tester';
        if (this.state[userId]) {
            let courseIds = Object.keys(this.state[userId]);
            let courseItems = courseIds.map((courseId) => {
                let course = this.state[userId][courseId];
                course.id = courseId;
                return <ClassItem userId={this.props.fbID} key={course.id} course={course} currentUser={this.props.fbID} />
            });
            return (
            <div>
            <div className="container">
            Your Current Classes:
                {courseItems}
            </div>
            </div>);
        } else {
            return  (<div>
        <div className="container">
            No Classes Found!
        </div>
        </div>);
        }
    }
}

class ClassItem extends Component {
    render() {
        return(
            <td key={this.props.key}>{this.props.course}</td>
        )
    }
}