import React from 'react';
import {BlockTitle, Tab, Tabs, WhiteBox} from "../../styled_components/balance_sheets";

class StatementList extends React.Component {
    handleStatementClick = (account) => {
        this.props.onAccountClick(account);
    };

    handleCheckboxChange = (account, event) => {
        this.props.onAccountClick(account, event.target.checked);
    };

    render() {
        const { statements, heard } = this.props;

        return (
            <div>

                <Tabs>
                    <Tab>
                       Check
                    </Tab>
                    {heard.map((r) =>
                        <Tab>
                            {r}
                        </Tab>
                    )}

                </Tabs>
                <WhiteBox style={{padding: 16}}>

                </WhiteBox>
            </div>
        );
    }
}

export default StatementList;