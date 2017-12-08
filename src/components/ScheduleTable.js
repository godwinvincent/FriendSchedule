import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import UploadForm from './ScheduleComponents/Upload.js'
import ClassList from './ScheduleComponents/Update.js'
import { NavBar } from './Navigation';

class ScheduleTable extends Component {
    render() {
        return (
            <div>
                <NavBar shouldShowNav={true} />
                <div className="pt-5"></div>
                <div className="pt-2"></div>
                <div className="container mt-3">
                    <div className="border">
                        <ClassList fbID={this.props.fbID} />
                    </div>
                    <div className="border">
                        <UploadForm fbID={this.props.fbID} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleTable