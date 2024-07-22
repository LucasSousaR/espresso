import React from "react";
import axios from "axios";

import {
    WhiteBox,
    Title,
    TextInput,
    Select,
    Label,
    Line,
    BlueButton,
    FilterLabel,
    FilterSection
} from "../../styled_components/default.js";

const [ATIVO, PASSIVO, EXCLUSAO] = ["ativo", "passivo", "exclusao"]
import Modal from "./Modal";
import ParamNode from "./ParamNode";

const uuidv4 = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
class Form extends React.Component {
    state = {
        cleared: {},
        currentItem: {},
        removed: [],
        filtered_by: ATIVO,
        modalIsOpen: false,
        lastHeader: {},
        items: this.validate_items()
    };
    validate_items(){
        let items = []
            items = [
                {
                    key: uuidv4(),
                    head: ATIVO,
                    fixed: true,
                    label: "Operacional",
                    operation: "credito",
                    childreen_attributes:[
                        {
                            key: uuidv4(),
                            head: PASSIVO,
                            fixed: true,
                            label: "Gastos",
                            operation: "credito",
                            childreen_attributes: []
                        }]

                },{
                    key: uuidv4(),
                    head: EXCLUSAO,
                    fixed: true,
                    label: "Exclusão",
                    operation: "credito",
                    childreen_attributes:[]
                }]



        return items
    }
    buildStringRoute(route = [], filterDeleted = false) {
        if(filterDeleted){
            return route
                .map((a, b) => `[route[${b}]].childreen_attributes.filter((x)=> !x._destroy)`)
                .reduce((a, b) => a + b, "");
        }else{
            return route
                .map((a, b) => `[route[${b}]].childreen_attributes`)
                .reduce((a, b) => a + b, "");
        }
    }
    save(route=null, index=null, editedNode=null, data=null){
        let self = this;
        const {items, segment_id, removed, label} = this.state
        const {contabil_pattern} = this.props
        this.setState({saving: true})


        const params = {
            node: editedNode,
            data: data,
            removed: removed,
            contabil_pattern: {
                label: label,
                contabil_pattern_params_attributes: items,
            }
        }

        const success = function(data){
            if (self.props.editing) {
                console.log("salvo...")

                if (data.data.node) {
                    self.saveEdit(route, index, data.data.node, true)
                }

            }else{
                Turbolinks.visit('/contabil_patterns?success=true')
            }

        }

        const fail = function(e){
            console.log(e)
            self.setState({saving: false})
            alert("Ocorreu um erro ao salvar, tente novamente, caso o erro persista entre em contato com o suporte")
        }

        if(contabil_pattern.id){
            axios.patch(`/contabil_patterns/${contabil_pattern.id}.json`, params).then(success).catch(fail)
        }else{
            axios.post('/contabil_patterns', params).then(success).catch(fail)
        }
    }

    componentDidMount(){

        const {label} = this.props.contabil_pattern
        if(this.props.items.length > 0){
            this.setState({
                items: this.props.items,
                label: label,

            })
        }

        console.log(this.props)
    }
    editNode(route = [], index, item) {
        this.setState({
            modalIsOpen: true,
            currentRoute: route,
            currentIndex: index,
            currentItem: item
        });
    }
    saveEdit(route = [], index, editedNode, savingFromRemote=false){
        this.handleClose();
        editedNode.childreen_attributes = editedNode.childreen_attributes || []
        editedNode.label ||= "Sem nome"
        let strRoute = this.buildStringRoute(route);

        this.setState(oldParams => {
            if (route.length > 0) {
                eval(`oldParams.items${strRoute}[${index}] = {...oldParams.items${strRoute}[${index}], ...editedNode}`);
            } else {
                eval(`oldParams.items[${index}] = {...oldParams.items[${index}], ...editedNode}`);
            }

            return { ...oldParams };
        });
        let self = this;
        setTimeout(()=>{
            if (self.props.editing && !savingFromRemote) {
                self.save(route, index, editedNode)
            }
        }, 100)

    }
    async addNode(route = [], index, item) {
        let {configured_patterns} = this.props;
        let already_configured = configured_patterns[item.id] && item.childreen_attributes.length <= 0
        if(already_configured && !this.state.cleared[item.id]){
            let remove_parameters = confirm("Antes de adicionar um novo Nó é necessário que você desvincule qualquer conta que possa estar vinculada a esse parametro, deseja remover todos os parametros vinculados a essa conta?")
            if (remove_parameters) {
                let remove_request = await axios.post(`/configured_patterns/${item.id}/clear.json`)
                if(remove_request.data.success){
                    this.setState((oldState)=>{
                        oldState.cleared[item.id] = true
                        return {...oldState}
                    })
                }
            }else{
                return false
            }

        }
        let strRoute = this.buildStringRoute(route);
        let lastIndex = 0
        let newNode = ()=> ({
            key: uuidv4(),
            label: null,
            childreen_attributes: []
        });

        this.setState(oldParams => {
            if (route.length > 0) {
                eval(`oldParams.items${strRoute}[${index}].childreen_attributes.push(newNode())`);
            } else {
                eval(`oldParams.items[${index}].childreen_attributes.push(newNode())`);
            }

            return { ...oldParams };
        });

        if (route.length > 0) {
            eval(`lastIndex = this.state.items${strRoute}[${index}].childreen_attributes.length`)
        } else {
            eval(`lastIndex = this.state.items[${index}].childreen_attributes.length`)
        }
        console.log("added", lastIndex)
        this.editNode([...route, index], lastIndex, newNode())


    }
    async removeNode(route = [], index, item={}) {
        let can_remove = confirm("Tem certeza que quer remover esse parametro?")
        if (!can_remove) {
            return false
        }

        let strRoute = this.buildStringRoute(route);
        let removed = null
        this.setState(oldParams => {
            if (route.length > 0) {
                eval(`removed = oldParams.items${strRoute}.splice(${index}, 1)`);
            } else {
                eval(`removed = oldParams.items.splice(${index}, 1)`);
            }

            return { ...oldParams };
        });

        this.setState((oldState)=>{
            if (removed[0].id){
                oldState.removed.push(removed[0].id);
            }
            return {...oldState}
        })
        // this.setState(oldParams => {
        //   if (route.length > 0) {
        //     eval(`oldParams.items${strRoute}[${index}]._destroy = true`);
        //   } else {
        //     eval(`oldParams.items[${index}]._destroy = true`);
        //   }

        //   return { ...oldParams };
        // });

        if (this.props.editing) {
            this.save()
        }
    }
    getNode(params, route) {
        let strRoute = this.buildStringRoute(route);

        this.setState(oldParams => {
            if (strRoute) {
                eval(`oldParams.items${strRoute} = params`);
            } else {
                eval(`oldParams.items = params`);
            }

            // // oldParams.items[route[0]].childreen_attributes[route[1]].childreen_attributes = params;
            console.log(oldParams.items);
            return { ...oldParams };
        });
    }
    setLastHeader(lastHeader, id){
        this.setState((oldState)=>{
            oldState.lastHeader[lastHeader] = id
            return {...oldState}
        })
    }
    handleClose(){
        this.setState({modalIsOpen: false})
    }

    render() {
        const {editing, route} = this.props;
        const {modalIsOpen, filtered_by} = this.state;
        var click = 'Operacional'
        var click_segund = 'Exclusão'
        var title = 'PLANO DE PADRÃO DE CONTAS'



        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                    <FilterSection>
                        <FilterLabel
                            active={filtered_by === ATIVO}
                            onClick={() => this.setState({filtered_by: ATIVO})}>
                            {click}
                        </FilterLabel>
                        {click_segund === 'Exclusão' && <FilterLabel
                            active={filtered_by === EXCLUSAO}
                            onClick={() => this.setState({filtered_by: EXCLUSAO})}>
                            {click_segund}
                        </FilterLabel>}


                    </FilterSection>
                </div>

                <div style={{display: "flex"}}>
                    <Modal
                        open={modalIsOpen}
                        handleClose={this.handleClose.bind(this)}
                        saveEdit={this.saveEdit.bind(this)}
                        currentRoute={this.state.currentRoute}
                        currentIndex={this.state.currentIndex}
                        currentItem={this.state.currentItem}
                        lastHeader={this.state.lastHeader}
                        setLastHeader={(lastHeader, id) => this.setLastHeader(lastHeader, id)}
                    />

                    <WhiteBox style={{flex: 2}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <Title>{title}</Title>
                        </div>
                        <div>
                            <ParamNode
                                filtered_by={this.state.filtered_by}
                                nodePath={[]}
                                node={this.state.items}
                                getNode={this.getNode.bind(this)}
                                addNode={this.addNode.bind(this)}
                                editNode={this.editNode.bind(this)}
                                removeNode={this.removeNode.bind(this)}
                                configured_patterns={this.props.configured_patterns}
                                onDragEnd={(data) => this.save(null, null, null, data)}
                            />
                        </div>
                    </WhiteBox>

                </div>

                {/*<div style={{display: 'flex', justifyContent: 'center'}}>

                        <BlueButton disabled={this.state.saving} style={{alignSelf: 'center'}} className={'right'}
                                    onClick={() => this.save()}>
                            Concluir
                        </BlueButton>

                </div>*/}

            </div>
        );


    }
}
export default Form;