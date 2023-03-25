import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Stack, Typography, Popover, TextField, IconButton } from '@mui/material';
import { observer } from 'mobx-react';
import PostStore from '../stores/PostStore';

import AddReactionIcon from '@mui/icons-material/AddReaction';

import Picker from 'emoji-picker-react';

const PostEditor = () => {
    const [post, setPost] = useState(PostStore.post);

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectionStart, setSelectionStart] = useState<number | null>();
    const [selectionEnd, setSelectionEnd] = useState<number | null>();

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        setTimeout(() => {
            setPost(PostStore.post);
          }, 500);
    }, [PostStore.post]);

    useEffect(() => {
        if (selectionStart)
            setSelectionStart(selectionStart + 1);
        if (selectionEnd)
            setSelectionEnd(selectionEnd + 1);
    }, [chosenEmoji]);

    const updateSelection = () => {
        setSelectionStart(inputRef.current?.selectionStart);
        setSelectionEnd(inputRef.current?.selectionEnd);
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        if (selectionStart != null) {
            const postArr: string[] = post ? Array.from(post) : [];

            const updatedPost = postArr.slice(0, selectionStart).join('')
                + emojiObject.emoji
                + postArr.slice(selectionStart).join('');
            PostStore.setPostText(updatedPost);
        }
        setChosenEmoji(emojiObject);
    }

    return (
        <Stack
            direction="column"
            gap={2}
            paddingX={2}
            paddingY={1.4}
            style={{backgroundColor: "#FFFFFF", borderRadius: 10, outline: "1px solid #D9D7D3"}}
            
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Stack
                    direction="row"
                    gap={1.5}
                >
                    <Avatar
                        alt="Amma"
                        src="http://www.cameralook.it/web/wp-content/uploads/2022/04/Amma-0.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                    <Stack
                        direction="column"
                        alignItems="flex-start"
                    >
                        <Typography style={{ color: "#000000" }}>Amma</Typography>
                        <Typography style={{ color: "#000000" }}>Chancellor at Amrita University</Typography>
                        <Typography style={{ color: "#000000" }}>1hr</Typography>
                    </Stack>
                </Stack>
                <IconButton aria-label='emoji' onClick={handleOpenPopover}>
                    <AddReactionIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Picker onEmojiClick={onEmojiClick} />
            </Popover>
            </Stack>
            <TextField
                id="outlined-multiline-static"
                multiline
                variant='standard'
                sx={{backgroundColor: "#FFFFFF", borderRadius: 3, paddingBottom: 1}}
                rows={20}
                style={{width: "540px"}}
                InputProps={{ style: { fontSize: '1rem' } }}
                InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                value={post}
                onChange={(event) => {
                    const { value } = event.target;
                    setPost(value);
                    PostStore.setPostText(value);
                    (/\r|\n/.exec(value)) && console.log(`linebreak: ${(/\r|\n/.exec(value))}`);
                }}
                onSelect={updateSelection}
                inputRef={inputRef}
            />
            <Typography style={{ color: "#000000" }}>{`selectionStart: ${selectionStart}`}</Typography>
            <Typography style={{ color: "#000000" }}>{`selectionEnd: ${selectionEnd}`}</Typography>
        </Stack>
    );
}

export default observer(PostEditor);