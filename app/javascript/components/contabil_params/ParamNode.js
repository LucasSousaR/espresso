import React from "react";

import {
    EntryBox,
    AddButton
} from "../../styled_components/default.js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
export default class ParamNode extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   items: this.props.node
        // };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        this.props.onDragEnd(result)
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.node,
            result.source.index,
            result.destination.index
        );

        // this.setState({
        //   items
        // });

        this.props.getNode(items, this.props.nodePath);
    }
    isVisible(head){

        const {filtered_by} = this.props

        if(filtered_by && head){
            return head == filtered_by
        }else{
            return true
        }
    }
    render() {
        const { node, nodePath, addNode, removeNode, editNode, configured_patterns } = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">

                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {node.filter((x)=> !x._destroy ).map((item, index) => {
                                item.position = index
                                return (
                                    <Draggable
                                        key={item.key}
                                        draggableId={item.key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div style={{display: this.isVisible(item.head) ? 'block': 'none'}}>
                                                <EntryBox
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                >

                                                    {item.label }
                                                    <div style={{display: 'flex', alignItems: 'center'}}>

                                                        {
                                                             <AddButton style={{marginRight: 5}} className={'btn'} onClick={()=> addNode(nodePath, index, item)}>
                                                                <i className="fa fa-plus" />
                                                            </AddButton>
                                                        }
                                                        {!item.fixed &&
                                                            <a style={{marginRight: 5}} className={"btn edit"} onClick={()=> editNode(nodePath, index, item)}>
                                                                <i className="fa fa-pencil" /> editar
                                                            </a>}

                                                        {!item.fixed  && <a style={{marginRight: 5}} className={"btn suspend"} onClick={()=> removeNode(nodePath, index, item)}>
                                                            <i className="fa fa-trash" /> excluir
                                                        </a>
                                                        }
                                                    </div>
                                                </EntryBox>
                                                {item.childreen_attributes.length > 0 && (
                                                    <div style={{ marginLeft: 29 }}>
                                                        <ParamNode
                                                            onDragEnd={this.props.onDragEnd}
                                                            nodePath={[...nodePath, index]}
                                                            node={item.childreen_attributes}
                                                            getNode={this.props.getNode}
                                                            addNode={this.props.addNode}
                                                            editNode={this.props.editNode}
                                                            removeNode={this.props.removeNode}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                )})}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        );
    }

}