import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Button, Row, Col } from 'reactstrap';
import { NavBar } from '../Navigation';

class UpdateTable extends Component {
    render() {
        let userId = "tester";
        if (this.state[userId]) {
            let courseIds = Object.keys(this.state[userId]);
            let courseItems = courseIds.map((courseId) => {
                let course = this.state[userId][courseId];
                course.id = courseId;
                return <ClassItem userId={this.props.fbID} key={course.id} currentUser={this.props.fbID} />
            });
            return (<div className="container">
                {courseItems}
            </div>);
        } else {
            return null;
        }
    }
}

class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('Users/'+this.props.fbID);
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
    constructor(props) {
        super(props);
        this.state = { class: this.props.course.class, section: this.props.course.section };
    }

    componentDidMount() {
        let courseRef = firebase.database().ref('Users/' + this.props.currentUser + "/" + this.props.course.id);
        this.setState({ courseNode: courseRef });
    }

    componentWillUnmount() {
        if (this.state.courseNode) {
            this.state.courseNode.off();
        }
    }

    handleDrop(event) {
        event.preventDefault();
        this.state.courseNode.remove();
        this.classRef = firebase.database().ref("Classes/"+this.state.class+this.state.section)
        this.classRef.once('value', snapshot => {
            let updates = {};
            snapshot.forEach(child => {
                if(child.val() === this.props.userId){
                    updates[child.key] = null
                }
            });
            this.classRef.update(updates);
       })
        
    }

    render() {
        let course = this.props.course;
        return (
            <Row>
                <Col>
                    <span>{course.class}</span> <span>{course.section}</span>
                    <Button className={'ml-3'} color="danger" onClick={(e) => this.handleDrop(e)}> Delete </Button>
                </Col>
            </Row>
        );
    }
}

export default ClassList;