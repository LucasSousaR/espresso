import React from "react"

import StatementList from './StatementList';
import CategoryList from './CategoryList';

const accountsData = [
    { id: 1, name: 'Conta 1' },
    { id: 2, name: 'Conta 2' },
    // Mais contas...
];

const categoriesData = [
    {
        id: '154',
        label: 'ress',
        position: 0,
        key: '15454dfsd',
        contabil_pattern_id: null,
        childreen: [
            {
                id: '155',
                contabil_pattern_id: '154',
                label: 'ress',
                position: 0,
                key: '15454dfsd',
                childreen: []
            },
            {
                id: '156',
                contabil_pattern_id: '154',
                label: 'dfsd',
                position: 1,
                key: '15454dfsfvgbfdd',
                childreen: []
            },
        ]
    }
];

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: accountsData,
            categories: categoriesData,
            selectedCategory: null,
            selectedAccounts: [],
        };
    }

    handleAccountClick = (account, isChecked) => {
        const { selectedAccounts } = this.state;
        if (isChecked) {
            this.setState({ selectedAccounts: [...selectedAccounts, account] });
        } else {
            this.setState({ selectedAccounts: selectedAccounts.filter(a => a.id !== account.id) });
        }
    };

    handleCategoryClick = (category, isChecked) => {
        if (isChecked) {
            this.setState({ selectedCategory: category });
        } else {
            this.setState({ selectedCategory: null });
        }
    };

    render() {
        const { accounts, categories, selectedAccounts, selectedCategory } = this.state;

        return (
            <div className=" col-lg-12 d-flex justify-content-space-betwee " >
                <div className="col-lg-6">
                    <div className="card-default card">
                        <div className="card-body">
                            <StatementList statements={accounts} onAccountClick={this.handleAccountClick}/>

                        </div>

                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card-default card">
                        <div className="card-body">

                            <CategoryList categories={categories} onCategoryClick={this.handleCategoryClick}/>
                        </div>

                    </div>
                </div>



            </div>
        );
    }
}