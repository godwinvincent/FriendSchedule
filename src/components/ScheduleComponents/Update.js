import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Button, Row, Col, Table } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../../styles/colors'

const styles = StyleSheet.create({
    class: {
        // marginLeft: '20px'
        margin: '0 auto',
        maxWidth: '800px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '5px 5px 5px #24305E',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white
    },
    tableHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: colors.white
    },
    row: {
        margin: '0 auto',
        padding: '0 auto',
        borderTop: '1px solid white',
        borderBottom: '1px solid white'
    },
    col: {
        paddingRight: 0
    }
})


/*
This component will fetch data from firebase and then render all the courses that the currently logged in user is registered for
*/
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
        let courseItems;
        /*
        will only fetch when the userid is valid
        */
        if (this.state[userId]) {
            let courseIds = Object.keys(this.state[userId]);
            courseItems = courseIds.map((courseId) => {
                let course = this.state[userId][courseId];
                course.id = courseId;
                return <ClassItem userId={this.props.fbID} key={course.id} course={course} currentUser={this.props.fbID} />
            });
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 offset-md-3">
                            <Table>
                                <thead className={css(styles.tableHeader)}>
                                    <tr>
                                        <th>Your Current Classes: {!courseItems && "Not enrolled in a class"}</th>
                                    </tr>
                                </thead>
                                {courseItems &&
                                    <tbody className={css(styles.class)}>
                                        {courseItems}
                                    </tbody>
                                }
                            </Table>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

//Individual course
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

    //this allows user to drop a course
    handleDrop(event) {
        event.preventDefault();
        this.state.courseNode.remove();
        this.classRef = firebase.database().ref("Classes/" + this.state.class + this.state.section)
        this.classRef.once('value', snapshot => {
            let updates = {};
            snapshot.forEach(child => {
                if (child.val() === this.props.userId) {
                    updates[child.key] = null
                }
            });
            this.classRef.update(updates);
        })

    }

    render() {
        let course = this.props.course;
        return (
            <Row className={css(styles.row)}>
                <Col className={css(styles.col)}>
                    <span>{course.class}</span> <span>{course.section}</span>
                    <Button type='button' className="pull-right" color="danger" onClick={(e) => this.handleDrop(e)}> Delete </Button>
                </Col>
            </Row>

        );
    }
}

export default ClassList;