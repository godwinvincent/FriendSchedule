import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';
import { NavBar } from '../Navigation';


class UploadButton extends Component {
    render() {
        return (
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={(e) => this.props.click(e)} disabled={!this.props.isValid[0] || !this.props.isValid[1]}>
                    UploadButton
                </Button>
            </FormGroup>
        );
    }
}

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startedClass: false,
            startedSection: false,
            class: '',
            section: '',
            click: false
        }
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        newState["click"] = false;
        if(event.target.name == 'class'){
            newState["startedClass"] = true;
        }
        if(event.target.name == 'section'){
            newState["startedSection"] = true;
        }
        this.setState(newState);
    }

    validate(value, validations) {
        let errors = [];

        if (value !== undefined) {
            if (validations.required && value === '') {
                errors.push('Required field.');
            }

            if (validations.class) {
                let valid = /^[A-Z]+\d{3}/.test(value);
                if (!valid) {
                    errors.push('Not a valid course prefix.');
                }
            }

            if (validations.section && validations.minLength) {
                if (value.length > validations.minLength) {
                    errors.push(`No more than ${validations.minLength} characters.`);
                } else {
                    let valid = /^[A-Z][A-Z]?$/.test(value);
                    if (!valid) {
                        errors.push('Has to be an Uppercase.');
                    }
                }
            }
            return errors;
        }
        return undefined;
    }

    handleUpload(event) {
        event.preventDefault();
        let newClass = {
            class: this.state.class,
            section: this.state.section,
        };
        firebase.database().ref('/Users/'+this.props.fbID).push(newClass);
        this.setState({ class: '', section: '', click: true });
    }

    render() {
        let classErrors = this.validate(this.state.class, { required: true, class: true });
        let sectionErrors = this.validate(this.state.section, { required: true, section: true, minLength: 2 });
        let validations = []
        validations.push((classErrors === undefined) ? undefined : (classErrors.length === 0));
        validations.push((sectionErrors === undefined) ? undefined : (sectionErrors.length === 0));
        return (
            <div>
                <NavBar />
            <div className="container mt-5">
                {this.state.click &&
                    <Row>
                        <Col md={{offset:2}}>
                            <FormGroup>
                                <Label htmlFor="instruction after submit">
                                    Thanks for submitting a course, please submit another if you please
                            </Label>
                            </FormGroup>
                        </Col>
                    </Row>}
                <Row>
                    <Col md={{ size: 3, offset: 2 }}>
                        <FormGroup>
                            <Input id="class"
                                type="input"
                                name="class"
                                valid={validations[0]}
                                placeholder="Class"
                                value={this.state.class}
                                onChange={(event) => this.handleChange(event)}
                            />
                            {validations[0] !== undefined &&
                                classErrors.map((error) => {
                                    return <FormFeedback key={error}>{error}</FormFeedback>;
                                })}
                            <Label htmlFor="class"></Label>
                        </FormGroup>
                    </Col>
                    <Col md={{ size: 3 }}>
                        <FormGroup>
                            <Input id="section"
                                type="section"
                                name="section"
                                valid={validations[1]}
                                placeholder="Section"
                                value={this.state.section}
                                onChange={(event) => this.handleChange(event)}
                            />
                            {validations[1] !== undefined &&
                                sectionErrors.map((error) => {
                                    return <FormFeedback key={error}>{error}</FormFeedback>;
                                })}
                            <Label htmlFor="section"></Label>
                        </FormGroup>
                    </Col>
                    <Col md={{ size: 3 }}>
                        <UploadButton type="upload" isValid={validations} click={(event) => this.handleUpload(event)} />
                    </Col>
                </Row>
            </div>
            </div>
        );
    }
}

export default UploadForm;