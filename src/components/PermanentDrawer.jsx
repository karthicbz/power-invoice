import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CustomerIcon from '@mui/icons-material/People';
import SalesIcon from '@mui/icons-material/Sell';
import PurchaseIcon from '@mui/icons-material/ShoppingCart';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useState } from 'react';

const drawerWidth = 240;

const PermanentDrawer = ()=>{
    const [open, setOpen] = useState(true);

    function handleClick(){
        setOpen(!open);
    };

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
                    <ListItemButton>
                        <ListItemIcon><CustomerIcon/></ListItemIcon>
                        <ListItemText primary={'Customers'}/>
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon><SalesIcon/></ListItemIcon>
                        <ListItemText primary={'Sales'}/>
                        {open ? <ExpandLess /> :<ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon><CurrencyRupeeIcon/></ListItemIcon>
                            <ListItemText primary="Invoice" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon><ReceiptIcon/></ListItemIcon>
                            <ListItemText primary="Delivery Challan" />
                        </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton>
                        <ListItemIcon><PurchaseIcon/></ListItemIcon>
                        <ListItemText primary={'Purchase'}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><InventoryIcon/></ListItemIcon>
                        <ListItemText primary={'Inventory'}/>
                    </ListItemButton>
                </List>
        </Drawer>
    );
}

export default PermanentDrawer;