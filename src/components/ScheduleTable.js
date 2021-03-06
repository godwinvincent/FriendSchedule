import React, { Component } from 'react'; //import React Component
import UploadForm from './ScheduleComponents/Upload.js'
import ClassList from './ScheduleComponents/Update.js'
import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
    addClass: {
        color: colors.navyBlue
    }
})

class ScheduleTable extends Component {
    render() {
        return (
            <div>
                <h1>Add/Edit Your Schedule</h1>
                {/*these 2 divs were added for padding purposes. The nav wasn't being reconigzed as block elemtns*/}
                <div className="pt-5"></div>
                <div className="pt-2"></div>
                <div className="container mt-3">
                    <div className={css(styles.addClass)}>
                        <ClassList fbID={this.props.fbID} />
                    </div>
                    <div className={css(styles.addClass)}>
                        <UploadForm fbID={this.props.fbID} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleTable