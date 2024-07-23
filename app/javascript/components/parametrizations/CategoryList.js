import React, { useState } from 'react';
import Fuse from "fuse.js";
import {
    SearchField,
    ApplyButton,
    WhiteBox,
    ParamTitle,
    LImage,
    SelectedRow,
    ValueLabel,
    BlockTitle,
    GreyButton,
    CircleButton,
    Tabs,
    Check,
    Tab
} from "../../styled_components/balance_sheets.js";
import { BlueButton } from "../../styled_components/default.js";
import LUrl from "../../../assets/images/L.png";
const renderParams = (categories, tabActive, paramsQuery, filteredRow, paramSelected, onCategoryClick, setupSelectedParam) => {
    let data = [];
    debugger
    if (!tabActive) {
        data = categories.filter(row => row.attributes.label.toUpperCase() === tabActive.toUpperCase());
    } else {
        data = categories;
    }

    data = categories;

    let filtered = data;
    if (paramsQuery.length > 0) {
        const options = {
            shouldSort: true,
            threshold: 0.8,
            distance: 1000,
            maxPatternLength: 1500,
            minMatchCharLength: 3,
            keys: ["attributes.childreen_label", "attributes.tree_label"]
        };

        const fuse = new Fuse(data, options); // "list" is the item array
        filtered = fuse.search(paramsQuery).map(result => result.item);
    }

    return filtered.map(ctp => {
        let row = ctp.attributes;
        return (
            <div className={`${row === filteredRow ? "filteredRow" : ""}`} key={row.key}>
                <ParamTitle level={0} head={row.head} className={'comment-wrapper'}>

                    <div style={{ textAlign: "left" }}>
                        {!row.head && <LImage src={LUrl} alt="Icon" />}

                            <i
                                style={{ fontSize: 14, cursor: 'pointer' }}
                                className={`fa ${row === filteredRow ? "fa-eye-slash" : "fa-eye"}`}
                            ></i>

                        {!row.head  && (
                            <span className="radio">
                                <label htmlFor="company_category_group_type">
                                    <input
                                        onChange={e => setupSelectedParam(e)}
                                        className="radio_buttons optional"
                                        type="radio"
                                        checked={row.key === paramSelected}
                                        value={row.key}
                                        name="pattern_param"
                                    />
                                </label>
                            </span>
                        )}
                        {row.label}
                    </div>
                </ParamTitle>
                <div id={"#childreen"}>
                    {renderParams(row.childreen, tabActive, paramsQuery, filteredRow, paramSelected, onCategoryClick, setupSelectedParam)}
                </div>
            </div>
        );
    });
};


const CategoryList = ({ categories, accounts, onCategoryClick, onAccountClick }) => {
    const [selectedVisibility, setSelectedVisibility] = useState(false);
    const [sheetSelected, setSheetSelected] = useState([]);
    const [rootChangeEnabled, setRootChangeEnabled] = useState(false);
    const [tabActive, setTabActive] = useState('Operacional');
    const [paramsQuery, setParamsQuery] = useState('');
    const [filteredRow, setFilteredRow] = useState(null);
    const [paramSelected, setParamSelected] = useState(null);

    const toggleSelectedVisibility = () => {
        setSelectedVisibility(!selectedVisibility);
    };

    const toggleRootEnabled = () => {
        setRootChangeEnabled(!rootChangeEnabled);
    };

    const isSetable = () => {
        return sheetSelected.length > 0;
    };

    const setupSelectedParam = (event) => {
        setParamSelected(event.target.value);
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 4.1 }}>
                    <BlockTitle>
                        <div style={{ display: "flex" }}>
                            <GreyButton onClick={toggleSelectedVisibility}>
                                <i
                                    className={
                                        selectedVisibility
                                            ? "fa fa-eye-slash"
                                            : "fa fa-eye"
                                    }
                                    style={{ marginRight: 10 }}
                                />
                                {selectedVisibility ? "Ocultar" : "Mostrar"} contas
                                parametrizadas
                            </GreyButton>
                            <CircleButton
                                style={{ marginLeft: 10 }}
                                onClick={toggleRootEnabled}
                            >
                                <i
                                    className={
                                        !rootChangeEnabled
                                            ? "fa fa-lock"
                                            : "fa fa-unlock"
                                    }
                                />
                            </CircleButton>
                        </div>
                    </BlockTitle>
                    <div
                        style={{
                            height: "60vh",
                            overflowY: "scroll",
                            marginTop: 12,
                            borderRadius: 5,
                            border: "solid 1px #c4c4c4"
                        }}
                    >
                        <AccountList accounts={accounts} onAccountClick={onAccountClick} />
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", margin: "0 16px" }}>
                    <ApplyButton disabled={!isSetable()}>
                        Aplicar
                    </ApplyButton>
                </div>
                <div style={{ flex: 2.3 }}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <BlockTitle>CATEGORIAS</BlockTitle>
                        <GreyButton>
                            <i
                                className={"fa fa-plus"}
                                style={{ marginRight: 10 }}
                            />
                            Adicionar nova conta
                        </GreyButton>
                    </div>
                    <Tabs>
                        <Tab
                            active={tabActive === "Operacional"}
                            onClick={() => setTabActive('Operacional')}
                        >
                            Operacional
                        </Tab>
                    </Tabs>
                    <WhiteBox style={{ padding: 16 }}>
                        {categories &&
                            renderParams(categories, tabActive, paramsQuery, filteredRow, paramSelected, onCategoryClick, setupSelectedParam)}
                    </WhiteBox>
                </div>
            </div>
        </div>
    );
};
export default CategoryList;
