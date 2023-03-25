import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { observer } from 'mobx-react';
import { Card, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Stack, styled, Typography } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MailingItem = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{
        maxWidth: 345,
        backgroundColor: 'black'
    }}>
      <CardHeader
        // title={<Typography sx={{color: '#E6E4F4'}}>Subject: Welcome</Typography>}
        title='Subject: Welcome'
        titleTypographyProps={{
            sx: {
                color: '#E6E4F4',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'left'
            }
        }}
        sx={{ paddingBottom: '4px' }}
      />
      <CardContent
        sx={{
            paddingTop: '0px',
            paddingBottom: '0px',
            '&:last-child': {
                paddingBottom: 1
            },
        }}
    >
        <Stack direction='row'>
            <Typography variant="body2" sx={{ color: '#E6E4F4', fontSize: '10px', textAlign: 'left', width: '270px' }}>
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>
            {!expanded && <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon sx={{ color: 'white' }} />
            </ExpandMore>}
        </Stack>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
            sx={{
                paddingBottom: '0px',
                '&:last-child': {
                    paddingBottom: 1
                },
            }}
        >
            <Stack direction='row'>
                <Typography variant="body2" sx={{ color: '#E6E4F4', fontSize: '10px', textAlign: 'left', width: '270px' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
                {expanded && <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon sx={{ color: 'white' }} />
                </ExpandMore>}
            </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default observer(MailingItem);