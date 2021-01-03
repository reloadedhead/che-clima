import React, { ChangeEvent, useState } from "react";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SearchPopover from "./search";
import { LocationSearchItem } from "../../../types";
import { useApi } from "../../../contexts/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const [searchAnchorEl, setSearchAnchorEl] = useState<
    HTMLTextAreaElement | HTMLInputElement | null
  >(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [options, setOptions] = useState<LocationSearchItem[]>([]);
  const { fetchLocations } = useApi();

  const getLocations = async (name: string) => {
    try {
      setOptions((await fetchLocations(name)).data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.currentTarget.value === "") {
      handleCloseSearchPopover();
    } else if (event.currentTarget.value.length > 2) {
      getLocations(event.currentTarget.value);
    } else {
      setSearchAnchorEl(event.currentTarget);
    }
    setFilterTerm(event.currentTarget.value);
  };

  const handleCloseSearchPopover = () => {
    setSearchAnchorEl(null);
    setOptions([]);
    setFilterTerm("");
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Che Weather!
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar..."
              value={filterTerm}
              onChange={handleSearchInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <SearchPopover
        anchorEl={searchAnchorEl}
        options={options}
        handleClose={handleCloseSearchPopover}
      />
    </div>
  );
};

export default Header;
