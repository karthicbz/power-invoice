import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import MaterialButton from './Button';

const CustomerDetailsList = ({data, handleOpenFunc, handleEditOpenFunc})=>{
    return(
        <List sx={{width:'100%'}}>
            
            {data.length > 0? data.map(d=>{
                return(
                <Paper elevation={1} sx={{margin:"10px 1rem;"}} key={d._id}> 
                    <ListItem alignItems='flex-start' id={d._id}>
                    <ListItemText
                        primary={d.name.toUpperCase()}
                        secondary={
                            <React.Fragment>
                                <Typography component="p">Phone: {d.phNumber}</Typography>
                                <Typography component="p">GST: {d.gstNumber}</Typography>
                            </React.Fragment>
                        }
                    />
                    <Box sx={{display:'flex'}}>
                        <MaterialButton 
                        variant='text' 
                        text="Delete" 
                        handleFunction={handleOpenFunc}
                        dataSetName={d.name}
                        dataSetId={d._id}/>
                        <MaterialButton variant='text' text="Edit" dataSetName={d.name} dataSetId={d._id} handleFunction={handleEditOpenFunc}/>
                    </Box>
                </ListItem>
                <Divider variant='middle' component="li" sx={{width:'100%'}}/>
            </Paper>);
            }):<p>No data found..</p>}
        </List>
    );
}

export default CustomerDetailsList;