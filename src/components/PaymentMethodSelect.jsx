import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PaymentMethodSelect = ({paymentMode, handlePaymentMode})=>{
    // const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    return (
        <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth>
            <InputLabel id="paymentmode-input-label">Payment Mode</InputLabel>
            <Select
            labelId="paymentmode-select-label"
            id="paymentmode-select"
            value={paymentMode}
            label="Payment Mode"
            onChange={handlePaymentMode}
            defaultValue={'credit'}
            >
            <MenuItem value={'credit'}>Credit</MenuItem>
            <MenuItem value={'cash '}>Cash</MenuItem>
            <MenuItem value={'cheque'}>Cheque</MenuItem>
            <MenuItem value={'Online'}>Online</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
}

export default PaymentMethodSelect;