import React, { Component } from 'react';
import { Table } from 'reactstrap'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom'
import * as colors from '../styles/colors'

const styles = StyleSheet.create({
    card: {
        // marginLeft: '20px'
        margin: '0 auto',
        maxWidth: '800px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '5px 5px 5px #24305E',
        color: colors.navyBlue
    },
    friendTable: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: colors.navyBlue
    },
    tableHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white,
        textDecoration: 'underline'
    }
})

export class ScheduleViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsInClass: [],
            firstView: true,
            loading: true
        };
    }

    componentDidMount() {
        // Retrieves list of classes for current user
        this.userRef = firebase.database().ref('Users/' + this.props.fbID);
        this.userRef.on('value', (snapshot) => {
            let val = snapshot.val();
            this.setState({ 'classList': val, loading: false })
        });
    }

    componentWillUnmount() {
        this.userRef.off();
    }

    handleClickClass(className) {
        // Retrieves and calculates if other users, who are Facebook friends
        // with the current user, are taking the same course for the 
        // clicked/pressed class
        this.setState({ firstView: false })                
        firebase.database().ref('Classes/' + className)
            .once('value', (snapshot) => {
                let allKeys = Object.keys(snapshot.val())
                let allPeople = [];
                allKeys.forEach(key => allPeople.push(snapshot.val()[key]))
                let friends = [];
                this.props.friendList.forEach(person => {
                    if (allPeople.includes(person.id)) {
                        friends.push(person)
                    }
                })
                this.setState({ friendsInClass: friends })
            })
    }

    render() {
        if(this.state.loading){
            return  (<div className="text-center">
            <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
            </div>)
        }
        else if (this.state.classList) {
            let courseIds = Object.keys(this.state.classList);
            // Creates a list of CardItem objects to be displayed representing
            // the current user's' courses
            let courseItems = courseIds.map((courseId) => {
                let course = this.state.classList[courseId];
                course.id = courseId;
                return <CardItem friendsCallback={(className) => this.handleClickClass(className)} userId={this.props.fbID} key={course.id} course={course} currentUser={this.props.fbID} />
            });
            return (
                <div>
                    <h1>View Your Schedule</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <Table>
                                    <thead className={css(styles.tableHeader)}>
                                        <tr>
                                            <th>Course</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseItems}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-sm">
                                <Table >
                                    <thead className={css(styles.tableHeader)}>
                                        <tr>
                                            <th>Friends In This Course</th>
                                        </tr>
                                    </thead>
                                    <tbody className={css(styles.friendTable)}>
                                        {
                                            // Maps the current list of friends
                                            // for the selected user's course and displays the appropriate message
                                            !this.state.firstView &&
                                            this.state.friendsInClass.length === 0 ? <p>No friends found :( time to make some new ones!</p> :
                                            this.state.friendsInClass.map(friend => <tr className={css(styles.tr)} key={friend.name}><td><a target="_blank" href={"https://www.facebook.com/" + friend.id}>{friend.name}</a></td></tr>)
                                        }
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

// Cards displayed when the user selects the "Your Schedule" section from
// the navigation bar
class CardItem extends Component {
    handleClick(className) {
        this.props.friendsCallback(className);
    }

    render() {
        let courseName = this.props.course.class;
        let section = this.props.course.section;
        let splitCourseName = courseName.substring(0, courseName.length - 3) + " " + courseName.slice(-3);
        return (
            <Card key={courseName} className={css(styles.card)}>
                <CardBody>
                    <CardTitle>{splitCourseName}</CardTitle>
                    <CardSubtitle><p>Section: {section}</p></CardSubtitle>
                    <CardText>
                        See what friends are also taking this course!
                    </CardText>
                    <Button type='button' onClick={() => this.handleClick(courseName + "" + section)}>See Friends</Button>
                </CardBody>
            </Card>
        );
    }
}