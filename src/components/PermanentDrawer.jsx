import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const PermanentDrawer = ()=>{
    return(
        <Drawer sx={{width:drawerWidth,
                    flexShrink:0,
                    '& .MuiDrawer-paper':{
                        width:drawerWidth,
                        boxSizing:'border-box',
                    }}}
                    variant="permanent"
                    anchor='left'
                    >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon><InboxIcon/></ListItemIcon> */}
                            <ListItemText primary={'Inbox'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon><MailIcon/></ListItemIcon> */}
                            <ListItemText primary={'New Mail'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
        </Drawer>
    );
}

export default PermanentDrawer;