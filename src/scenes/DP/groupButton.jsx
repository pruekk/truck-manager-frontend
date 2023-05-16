import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const options = [
    { name: 'Import', icon: <FileDownloadRoundedIcon /> },
    { name: 'Edit', icon: <EditRoundedIcon /> },
    { name: 'Delete', icon: <DeleteForeverRoundedIcon /> },
];

export default function GroupButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                sx={{
                    ".MuiButtonGroup-grouped:not(:last-of-type)": {
                      borderColor: "#FFFFFF",
                    },
                  }}
            >   
                <Button
                    onClick={handleToggle}
                    // startIcon={options[selectedIndex].icon}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                        width: "8rem",
                        backgroundColor: "#30c464",
                        "&:hover": {
                            backgroundColor: "#269c50",
                        },
                    }}
                >
                    ACTIONS
                </Button>
                {/* <Button
                    size="small"
                    onClick={handleToggle}
                    sx={{
                        backgroundColor: "#30c464",
                        "&:hover": {
                            backgroundColor: "#269c50",
                        },
                    }}
                >
                    <ArrowDropDownIcon />
                </Button> */}
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                    width: "8rem"
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option.name}
                                            disabled={index === 1 || index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option.icon}
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
