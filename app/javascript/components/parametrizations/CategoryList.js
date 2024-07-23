import React, { useState } from 'react';
import StatementList from './StatementList';
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


};


const CategoryList = ({ categories, accounts, onCategoryClick, onAccountClick, heard }) => {
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
                    {/*<BlockTitle>
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
                    </BlockTitle>*/}

                    <div
                        style={{
                            height: "60vh",
                            overflowY: "scroll",
                            marginTop: 84,
                            borderRadius: 5,
                            border: "solid 1px #c4c4c4"
                        }}
                    >
                        <StatementList heard={heard} statements={accounts} onAccountClick={onAccountClick} />
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", margin: "0 16px" }}>
                    <ApplyButton disabled={!isSetable()}>
                        Aplicar
                    </ApplyButton>
                </div>
                <div style={{ flex: 2.3,marginTop: 57}}>
                    {/*  <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <BlockTitle>CATEGORIAS</BlockTitle>
                        <GreyButton>
                            <i
                                className={"fa fa-plus"}
                                style={{ marginRight: 10 }}
                            />
                            Adicionar nova conta
                        </GreyButton>
                    </div>*/}
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
