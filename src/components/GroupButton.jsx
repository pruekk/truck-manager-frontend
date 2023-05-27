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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const options = [
    { name: 'Import', icon: <FileDownloadRoundedIcon fontSize="small" /> },
    { name: 'Add', icon: <AddCircleRoundedIcon fontSize="small" /> },
    { name: 'Edit', icon: <EditRoundedIcon fontSize="small" /> },
    { name: 'Delete', icon: <DeleteForeverRoundedIcon fontSize="small" /> },
];

export default function GroupButton({ command }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const updatedCommand = command.map((cmd) => {
        const option = options.find((opt) => opt.name === cmd.name);
        if (option) {
            return { ...cmd, icon: option.icon };
        }
        return cmd;
    });

    const handleMenuItemClick = (event, index) => {
        updatedCommand[index].setOpenDialog(true)
        if (updatedCommand[index].name === "Edit") {
            updatedCommand[index].setEditData()
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
                                <MenuList autoFocusItem>
                                    {updatedCommand.map((option, index) => (
                                        <MenuItem
                                            key={option.name}
                                            disabled={option.disabled}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            <ListItemIcon>
                                                {option.icon}
                                            </ListItemIcon>
                                            <ListItemText>
                                                {option.name}
                                            </ListItemText>
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
