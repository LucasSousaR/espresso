import styled from "styled-components";
import expandImage from '../../assets/images/menu-expand-icon.png';
import retractImage from '../../assets/images/menu-retract-icon.png';

export const ExpandButton = styled.div`
  margin-top: 10px;
  width: 80%;
  height: 30px;
  border-radius: 5px;
  background-color: #ebebeb;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
  cursor: pointer;
  ${props =>
    props.active ?
      `
      background-image: url(${expandImage});
    `: `
      background-image: url(${retractImage});
    `

  }
`

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const WhiteBox = styled.div`
  padding: 36px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 0.5px #e5e5e5;
  background-color: #ffffff;
  margin: 7px;
  flex: 1;
`;

export const Title = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #31b7bc;
  text-transform: uppercase;
  margin-bottom: 37px;
`;

export const TextArea = styled.textarea`
  height: 40px;
  border-radius: 6px;
  background-color: #f8f8f8;
  width: 100%;
  border: solid 0.5px #acacac;
  margin-bottom: 17px;
`;
export const TextInput = styled.input`
  height: 40px;
  border-radius: 6px;
  background-color: #f8f8f8;
  width: 100%;
  border: solid 0.5px #acacac;
  margin-bottom: 17px;
`;

export const Select = styled.select`
  height: 40px;
  border-radius: 6px;
  background-color: #f8f8f8;
  width: 100%;
  border-radius: 6px;
  border: solid 0.5px #acacac;
  margin-bottom: 17px;
`;

export const Label = styled.label`
  width: 39px;
  height: 11px;
  font-family: Roboto;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #494949;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d2d2d2;
  margin: 29px auto;
`;

export const GreenButton = styled.button`
  width: 121px;
  height: 40px;
  border-radius: 6px;
  background-color: #03ab79;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//Param layout items

export const EntryBox = styled.div`
  width: 411px;
  height: 47px;
  border-radius: 5px;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  font-family: Roboto;
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const FilterLabel = styled.a`
  width: 85px;
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
  color: #2a3170;
  cursor: pointer;
  margin-right: 30px;
  ${props =>
    props.active &&
    `
    color: #31b7bc;
  `}
`;

export const Operation = styled.div`
  width: 8px;
  height: 14px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.6px;
  color: #ed1c24;
  text-transform: uppercase;
  ${props =>
    props.operation == "debito" &&
    `
    color: #009c53;  
  `}
`;


export const LeftButton = styled.button`
  width: 100px;
  height: 50px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #676767;
 border-top-right-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
  background-color: #f5f5f5;
  cursor: pointer;
  ${props =>
    props.active &&
    `
      background-color: #1598d3;
      color: #c4e5f4;
    `

}
`;
export const RightButton = styled.button`
  width: 100px;
  height: 50px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #676767;
  border-top-left-radius: 15px 15px;
  border-bottom-left-radius: 15px 15px;
  background-color: #f5f5f5;
  cursor: pointer;
  ${props =>
    props.active &&
    `
      background-color: #1598d3;
      color: #c4e5f4;
    `

}
`;
export const CentralButton = styled.button`
  width: 100px;
  height: 50px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #676767;
  background-color: #f5f5f5;
  cursor: pointer;
  ${props =>
    props.active &&
    `
      background-color: #1598d3;
      color: #c4e5f4;
    `

}
`;
export const BlueButton = styled.button`
  width: 167px;
  height: 40px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #ffffff;
  border-radius: 6px;
  background-color: #2a3170;
  cursor: pointer;
  ${props =>
    props.invalidCheck &&
      `
      background-color: #6f6f6f;
    `

  }
`;

export const AddButton = styled.a`
  width: 19px;
  height: 19px;
  border-radius: 14px;
  background-color: #03ab79;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-right: 1px;
`;

export const GreenLabel = styled.label`
  width: 79px;
  height: 13px;
  font-family: Roboto;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.6px;
  color: #31b7bc;
`;

export const BlueLink = styled.a`
   font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
  color: #2a3170;
  margin: 0 15px;
  cursor: pointer;
  ${props =>
    props.active &&
    `
      color: #31b7bc;  
    `}
  ${props =>
    (props.active && props.bordered) &&
    `
      color: #31b7bc;
      background: white;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 31px;
      margin-top: 20px;
      border-radius: 5px 5px 0px 0;
    `}
`;
