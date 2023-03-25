import { Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, IconButton, TextField, Typography, ListSubheader } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SelectTest = () => {
    return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Selected Sequence</InputLabel>
            <Select
            labelId="search-select-label"
            id="search-select"
            // value={selectedOption}
            label="Selected Sequence"
            MenuProps={{
                sx: {height: '300px'}
            }}
            >
                
            <TextField sx={{ 
        // position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 20, 
        zIndex: 1,}}></TextField>
            <MenuItem sx={{position: 'sticky'}}>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem
                // sx={{ 
                // // position: '-webkit-sticky',
                // position: 'sticky',
                // top: 20,
                // bottom: 20, 
                // zIndex: 1,}}
                // 
            >
            namah</MenuItem>
            <MenuItem>hello</MenuItem>
            {/* <ListSubheader>Test</ListSubheader> */}
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>

            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>

            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem>hello</MenuItem>
            <MenuItem
                            sx={{ 
                // position: '-webkit-sticky',
                position: 'sticky',
                top: 20,
                bottom: '1px', 
                zIndex: 1,}}
                
            >okay</MenuItem>
            </Select>
        </FormControl>
    );
}

export default observer(SelectTest);