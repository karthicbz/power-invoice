const SearchBox = ({changeActiveStatus, handleInput, input, dataDetails})=>{
    return(
        <>
            <TextField onFocus={()=>setSearchActive(true)} onChange={handleInput} value={input}/>
            <List sx={{bgcolor: 'background.paper', padding: '0', position:'fixed', left:0, right:0, top:'90px', zIndex:1}}>
                {
                    (customerDetails.length>0)&&
                    customerDetails.map(customer=>{
                        return(
                            <ListItem key={customer._id}>
                                <ListItemButton>
                                    <ListItemText id={customer._id} primary={customer.name} onClick={handleClick}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </>
    )
}