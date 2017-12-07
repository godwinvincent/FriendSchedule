import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Button, Row, Col } from 'reactstrap';

class UpdateTable extends Component {
    render() {
        let userId = "tester";
        if (this.state[userId]) {
            let courseIds = Object.keys(this.state[userId]);
            let courseItems = courseIds.map((courseId) => {
                let course = this.state[userId][courseId];
                course.id = courseId;
                return <ClassItem userId={"tester"} key={course.id} currentUser={"tester"} />
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
        let userRef = firebase.database().ref('Users/tester');
        userRef.on('value', (snapshot) => {
            let val = snapshot.val();
            let courseObj = {};
            courseObj['tester'] = val;
            this.setState(courseObj);
        });
    }

    componentWillUnmount() {
        firebase.database.ref('Users/tester').off();
    }

    // componentWillReceiveProps(props) {
    //     let userRef = firebase.database().ref('Users/' + props.userId);
    //     userRef.on('value', (snapshot) => {
    //         let val = snapshot.val();
    //         let courseObj = {};
    //         courseObj['tester'] = val;
    //         this.setState(courseObj);
    //     });
    // }

    render() {
        let userId = 'tester';
        if (this.state[userId]) {
            let courseIds = Object.keys(this.state[userId]);
            let courseItems = courseIds.map((courseId) => {
                let course = this.state[userId][courseId];
                course.id = courseId;
                return <ClassItem userId={"tester"} key={course.id} course={course} currentUser={"tester"} />
            });
            return (<div className="container">
                {courseItems}
            </div>);
        } else {
            return null;
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
    }

    render() {
        let course = this.props.course;
        return (
            <Row>
                <Col>
                    <span>{course.class}</span> <span>{course.section}</span>
                    <Button color="danger" onClick={(e) => this.handleDrop(e)} />
                </Col>
            </Row>
        );
    }
}

export default ClassList;