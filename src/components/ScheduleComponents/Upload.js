import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';

//this will take in information about the course
class UploadInputBox extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    handleChange(event) {
        this.props.handleChange(event);
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <FormGroup>
                
                <Input id={this.props.type}
                    type={this.props.type}
                    name={this.props.id}
                    valid={this.props.valid}
                    placeholder={this.props.name}
                    onChange={(event) => this.handleChange(event)}
                />
                {this.props.valid !== undefined &&
                    this.props.errors.map((error) => {
                        return <FormFeedback key={error}>{error}</FormFeedback>;
                    })}
                <Label htmlFor={this.props.id}></Label>
            </FormGroup>
        );
    }
}

class UploadButton extends Component {
    render() {
        // if(this.props.type === "upload") {
        return (
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={(e) => this.props.click(e)} disabled={!this.props.isValid[0] || !this.props.isValid[1]}>
                    UploadButton
                </Button>
            </FormGroup>
        );
        // }
    }
}

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: undefined,
            section: undefined,
        }
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    validate(value, validations) {
        let errors = [];

        if (value !== undefined) {
            if (validations.required && value === '') {
                errors.push('Required field.');
            }

            if (validations.minLength && value.length < validations.minLength) {
                errors.push(`Must be at least ${validations.minLength} characters.`);
            }

            if (validations.class) {
                let valid = /\d{3}/.test(value);
                if (!valid) {
                    errors.push('Not a valid course prefix.');
                }
            }

            if (validations.section) {
                let valid = /^[A-Z][A-Z]?$/.test(value);
                if (!valid) {
                    errors.push('Has to be an Uppercase.');
                    console.log(errors);
                }
            }
            return errors;
        }
        return undefined;
    }

    // handlePost(event) {
    //     event.preventDefault();

    //     let newClass = {
    //         class: this.state.class,
    //         section: this.state.section,
    //         userId: this.props.currentUser.uid,
    //         userName: this.props.currentUser.displayName
    //     };
    //     firebase.database().ref('Users/' + this.props.currentUser.uid).push(newClass);
    //     this.setState({ class: '', section: '' });
    // }

    render() {
        let classError = this.validate(this.state.class, { required: true, class: true });
        let sectionError = this.validate(this.state.section, { required: true, section: true });
        let validations = []
        validations.push((classError === undefined) ? undefined : (classError.length === 0));
        validations.push((sectionError === undefined) ? undefined : (sectionError.length === 0));
        return (
            <div className="container mt-5">
                <Row>
                    <Col md={{ size: 3, offset: 2 }}>
                        <UploadInputBox type="class" id="class" name="Class" valid={validations[0]} errors={classError} handleChange={(event) => this.handleChange(event)} />
                    </Col>
                    <Col md={{ size: 3 }}>
                        <UploadInputBox type="section" id="section" name="Section" valid={validations[1]} errors={sectionError} handleChange={(event) => this.handleChange(event)} />
                    </Col>
                    <Col md={{ size: 3 }}>
                        <UploadButton type="upload" isValid={validations} click={(event) => this.handlePost(event)} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UploadForm;