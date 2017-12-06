import React, { Component } from 'react'; //import React Component
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

import { StyleSheet, css } from 'aphrodite/no-important';
import * as colors from '../styles/colors';

export class Header extends Component {
    render() {
        return (
            <header>
                <Tabs onChange={this.onChange} defaultSelectedIndex={1}>
                    <Tab value="pane-1" label="Tab 1" onActive={this.onActive}>Pane-1</Tab>
                    <Tab value="pane-2" label="Tab 2">Pane-2</Tab>
                </Tabs>
            </header>
        );
    }
}