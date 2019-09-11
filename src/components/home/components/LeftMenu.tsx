import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  ListItem,
  Hidden,
  useTheme
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

export default function LeftMenu(props: any) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, select] = React.useState(0);
  const { container } = props;
  const theme = useTheme();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const menu = (
    <List>
      {["Blog"].map((text, index) => (
        <ListItem
          button
          key={text}
          selected={index === selectedIndex}
          onClick={() => select(index)}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          //   container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {menu}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {menu}
        </Drawer>
      </Hidden>
    </nav>
  );
}
