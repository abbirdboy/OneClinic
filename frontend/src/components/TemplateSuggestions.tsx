import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';

import PostStore from '../stores/PostStore';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

const TemplateSuggestions = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <>
            <Stack
                direction="column"
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Hooks" {...a11yProps(0)} />
                        <Tab label="Body" {...a11yProps(1)} />
                        <Tab label="Conclusion" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Stack
                    direction="column"
                >
                    <Button
                        onClick={() => {
                            console.log('button clicked');
                            PostStore.setPostText(
`This is a viral hook 👇

` + PostStore.post);
                        }}
                    >
                        Add Text
                    </Button>
                </Stack>
            </Stack>
            {/* <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel> */}
        </>
    )
}

export default observer(TemplateSuggestions);