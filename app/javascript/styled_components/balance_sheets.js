import styled from "styled-components";

export const SearchField = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  border: solid 0.5px #acacac;
  background-color: #f5f5f5;
  padding-left: 16px;
`;
export const Tabs = styled.div`
  display: flex;
  
`
export const Tab = styled.div`
  cursor: pointer;
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
  color: #2a3170;
  margin: 16px;
  text-transform: none;
  ${props => props.active && `
    color: #31b7bc;
  `}
`

export const ApplyButton = styled.button`
  width: 106px;
  height: 40px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #ffffff;
  border-radius: 6px;
  background-color: #31b7bc;
  justify-content: center;
  display: flex;
  align-items: center;
  border: none;
  :disabled {
    background-color: #e5e5e5;
  }
`;

export const WhiteBox = styled.div`
  overflow-y: scroll;
  height: calc(60vh - 32px);
  border-radius: 5px;
  border: solid 1px #c4c4c4;
  margin-top: 12px;
`;

export const ParamTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.6px;
  color: #617e94;
  border-radius: 5px;
  padding: 16px 20px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${props => props.level * 16 + 16}px;
  ${props =>
    props.head &&
    `
    background-color: #f5f5f5;
    `}
`;

export const LImage = styled.img`
  width: 19px;
  margin-right: 5px;
`;

export const SelectedRow = styled.tr`
  height: 47px;
  border-radius: 5px;
  background-color: #21ca97 !important;
  color: white;
`;

export const ValueLabel = styled.label`
  width: 61px;
  height: 12px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.5px;
  color: #009c53;
  flex: 1;
  text-align: right;
`;
export const BlockTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #2a3170;
  margin-bottom: 36px;
  display: flex;
  justify-content: space-between;
`;

export const GreyButton = styled.div`
  height: 19px;
  border-radius: 14px;
  background-color: #acacac;
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: 0.6px;
  color: #ffffff;
  text-transform: none;
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
`;

export const CircleButton = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 14px;
  background-color: #03ab79;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Check = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 26px;
    text-transform: capitalize;
    color: #617e94;
    ${props =>
    !props.valid &&
    `
      color: darkred;
    `}
`
