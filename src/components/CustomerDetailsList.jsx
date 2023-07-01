import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Paper } from '@mui/material';

const CustomerDetailsList = ({data})=>{
    return(
        <List sx={{width:'100%'}}>
            
            {data.map(d=>{
                return<Paper elevation={1} sx={{margin:"10px 1rem;"}}> 
                <ListItem alignItems='flex-start'>
                <ListItemText
                    primary={d.name.toUpperCase()}
                    secondary={
                        <React.Fragment>
                            <Typography component="p">{d.phNumber}</Typography>
                            <Typography component="p">{d.gstNumber}</Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant='middle' component="li" sx={{width:'100%'}}/>
            </Paper>
            })}
        </List>
    );
}

export default CustomerDetailsList;