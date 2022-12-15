import React from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//List
import Divider from '@mui/material/Divider';
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


const pages = [
  "รถโม่",
  "บริษัท",
  "พนักงาน",
  "สวนปาล์ม",
  "ภาษี",
  "รายงานผล",
  "ตั้งค่า",
];

function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#313a46", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justify="center">
            {pages.map((page) => (
              <Grid key={`page-${page}`} item align="center" xs>
                <Button
                  variant="text"
                  onClick={handleToggle}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#313a46",
                    },
                  }}
                >
                  <Typography variant="h6">{page}</Typography>
                </Button>
                <Popper
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  placement={"bottom"}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={0}>
                      <Paper>
                        <List
                          dense={true}
                          sx={{ padding: "0px" }}
                        >
                          <ListItem button>
                            <ListItemText
                              sx={{ color: "black" }}
                              primary={"ทดสอบ"}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              sx={{ color: "black" }}
                              primary={"ทดสอบ"}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              sx={{ color: "black" }}
                              primary={"ทดสอบ"}
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
