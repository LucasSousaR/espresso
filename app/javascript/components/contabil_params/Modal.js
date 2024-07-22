import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
export default class FormDialog extends React.Component {
    state = {
        item: {
            operation: "credito"
        },


    }
    onEnter(param){
        this.setState({item: {...this.state.item, ...this.props.currentItem}})
    }
    handleChange(event){
        let newValue = event.currentTarget.value
        console.log(newValue);
        this.setState((oldState)=>{
            oldState.item.operation = newValue
            return {...oldState}
        })

    }
    render() {
        const { open, handleClose, saveEdit, currentItem, currentRoute, currentIndex } = this.props;
        const {item} = this.state;
        return (

            <div>
                <Dialog
                    open={open}
                    onEnter={this.onEnter.bind(this)}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Editar parametro</DialogTitle>
                    <DialogContent style={{minWidth: 552}}>
                        <DialogContentText>
                            Definições do parametro
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Novo parametro"
                            type="email"
                            onChange={(event) => {
                                let newValue = event.currentTarget.value
                                this.setState((oldState) => {
                                    console.log(newValue);
                                    oldState.item.label = newValue
                                    return {...oldState}
                                })

                            }}
                            defaultValue={currentItem.label}
                            fullWidth
                        />
                        <div>
                            <hr/>
                            {/* <DialogContentText>
                <a onClick={()=> this.setState({showAdvanced: !this.state.showAdvanced})}>Avançado <i className={`fa fa-chevron-${this.state.showAdvanced ? 'down' : 'right'}`}/></a>
              </DialogContentText> */}

                            {this.state.showAdvanced && <div><DialogContentText>
                                Este parametro é cabeça das despesas
                            </DialogContentText>
                                {/* <RadioGroup defaultValue={this.getDefaultValue(currentItem)}
                          aria-label="gender"
                          name="customized-radios"
                          onChange={(event)=> {
                                      let newValue = event.currentTarget.value
                                      this.props.setLastHeader(newValue, currentItem.id)
                                      this.setState((oldState)=>{
                                        console.log(newValue);
                                        oldState.item.head_of_cost_center = newValue
                                        return {...oldState}
                                      })

                                    }}
                          >
                <FormControlLabel
                  value="trabalhistas"
                  control={<Radio color="primary" />}
                  label="Trabalhistas"
                  labelPlacement="trabalhistas"
                />
                <FormControlLabel
                  value="operacionais"
                  control={<Radio color="primary" />}
                  label="Gerais"
                  labelPlacement="operacionais"
                />
              </RadioGroup> */}
                            </div>}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => saveEdit(currentRoute, currentIndex, item)} color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }

}