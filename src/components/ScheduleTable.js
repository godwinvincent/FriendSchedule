import React, { Component } from 'react'; //import React Component
import UploadForm from './ScheduleComponents/Upload.js'
import ClassList from './ScheduleComponents/Update.js'

class ScheduleTable extends Component {
    render() {
        console.log(this.props.fbID)
        return (
            <div>
                <h1>Add/Edit Your Schedule</h1>
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