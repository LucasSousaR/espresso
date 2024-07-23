import React from 'react';

class StatementList extends React.Component {
    handleStatementClick = (account) => {
        this.props.onAccountClick(account);
    };

    handleCheckboxChange = (account, event) => {
        this.props.onAccountClick(account, event.target.checked);
    };

    render() {
        const { statements } = this.props;

        return (
            <div>
                <h3>Contas</h3>
                <ul>
                    {statements.map(statement => (
                        <li key={statement.id}>
                            <input
                                type="checkbox"
                                onChange={(event) => this.handleCheckboxChange(statement, event)}
                            />
                            {statement.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default StatementList;