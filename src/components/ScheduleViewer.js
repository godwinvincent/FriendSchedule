import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { Table } from 'reactstrap'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom'
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
    card: {
        // marginLeft: '20px'
        margin: '0 auto',
        maxWidth: '800px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '5px 5px 5px #24305E'
    }
})

const cardImages = ["http://www.washington.edu/about/files/2014/09/campus-at-night.jpg", "https://i.pinimg.com/originals/66/1d/db/661ddbc5ac32dece7f46b1f108a18749.jpg", "http://www.washington.edu/news/files/2015/10/Campus-Master-Plan-aerial.jpg", "https://az589735.vo.msecnd.net/images/profilepics/1023567/306.jpg",
"https://geriatricnursing.org/wp-content/uploads/2016/03/University-of-Washington.jpg"]

export class ScheduleViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsInClass: []
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
                        friends.push(person)
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
                let randomNumber = Math.floor(Math.random() * 4);               
                return <CardItem friendsCallback={(className) => this.handleClickClass(className)} userId={this.props.fbID} key={course.id} course={course} currentUser={this.props.fbID} randomNumber={randomNumber} />
            });
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <Table>
                                    <thead>
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
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Friends List</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
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

class CardItem extends Component {
    handleClick(className) {
        this.props.friendsCallback(className);
        this.scrollToTop(550);
    }

    scrollToTop(scrollDuration) {
        var scrollStep = -window.scrollY / (scrollDuration / 15),
            scrollInterval = setInterval(function(){
            if ( window.scrollY != 0 ) {
                window.scrollBy( 0, scrollStep );
            }
            else clearInterval(scrollInterval); 
        },15);
    }

    render() {
        let courseName = this.props.course.class;
        let section = this.props.course.section;
        let splitCourseName = courseName.substring(0, courseName.length - 3) + " " + courseName.slice(-3);
        return (
            <Card key={courseName} className={css(styles.card)}>
                <CardImg top width="30%" src={cardImages[this.props.randomNumber]} alt="UW campus" />
                <CardBody>
                    <CardTitle>{splitCourseName}</CardTitle>
                    <CardSubtitle><p>Section: {section}</p></CardSubtitle>
                    <CardText>
                        See what friends are also taking this course!
                    </CardText>
                    <Button onClick={() => this.handleClick(courseName + "" + section)}>Open</Button>
                </CardBody>
            </Card>
        );
    }
}