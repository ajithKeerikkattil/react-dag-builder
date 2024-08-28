import React, {useState} from 'react';
import {Handle, Position, NodeProps, Node} from "@xyflow/react";
import {IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

let activitiesList: string[] = ['Build Docker Container', 'Push image to ECR', 'Deploy container to ECS' ]

    /* Type definition of the custom activity node */
    export type customActivityNode = Node<
    {
        label: string;
        activityType: string;
        onDeleteNodeButtonClick: (nodeId: string) => void;
    },
    'activityNode'>;

/**
 * CustomActivityNode component.
 * @param data -> The destructured data prop of this component. onDeleteNodeButtonClick prop triggers the delete function in Parent.
 * @param id -> Node ID
 * @constructor
 */
function CustomActivityNode({data, id}: NodeProps<customActivityNode>) {
    let [selection, setSelection] = useState('');

    /* Set the selected activity. Adds the selection to data prop passed up to parent */
    const onselectionchange = (e: any) => {
        setSelection(e.target.value);
        data.activityType = (e.target.value);
    }

    return (
        <>
            <div style={{backgroundColor:'darkgray', paddingLeft: '20px', paddingBottom: '20px', paddingRight: '5px'}}>
                <InputLabel style={{fontSize: '12px'}}>{`${data.label}`}</InputLabel>
                <div style={{display: "flex", flexDirection:"row"}}>
                    <Select style={{padding: '0px', width: '250px', backgroundColor: 'white'}}
                            className="nodrag nopan"
                            id="activity-select"
                            value={selection}
                            label="Age"
                            onChange={onselectionchange}
                    >
                        {activitiesList.map(activity => (<MenuItem style={{fontSize: '12px'}} key={activity} value={activity}>{activity}</MenuItem>))}
                    </Select>
                    <IconButton onClick={() => data.onDeleteNodeButtonClick(id)}>
                        <DeleteIcon style={{fontSize: '20px'}} />
                    </IconButton>
                </div>

                {/*Position of the edge connectors*/}
                <Handle type="source" position={Position.Right}/>
                <Handle type="target" position={Position.Left}/>
            </div>
        </>
    );
}

export default CustomActivityNode;