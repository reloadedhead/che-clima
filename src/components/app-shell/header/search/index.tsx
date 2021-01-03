import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useWeather } from "../../../../contexts/weather";
import { LocationSearchItem } from "../../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      maxHeight: 400,
    },
    avatar: {
      borderRadius: 6,
    },
    listItem: {
      maxWidth: 350,
      minWidth: 250,
    },
  })
);

interface SearchPopover {
  handleClose: () => void;
  anchorEl: HTMLInputElement | HTMLTextAreaElement | null;
  options: LocationSearchItem[];
}

const SearchPopover = ({ handleClose, anchorEl, options }: SearchPopover) => {
  const classes = useStyles();
  const { setLocation } = useWeather();

  const handleSelectLocation = (selected: LocationSearchItem) => {
    setLocation({
      id: selected[0] as number,
      name: selected[1] as string,
      department: selected[2] as string,
      province: selected[4] as string,
      type: selected[4] as string,
      coord: {
        lat: selected[6] as number,
        lon: selected[7] as number,
      },
      distance: selected[8] as number,
    });
    handleClose();
  };

  return (
    <Popover
      disableAutoFocus
      disableEnforceFocus
      className={classes.root}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {options.length > 0 ? (
        <List>
          {options.map((location) => (
            <ListItem
              key={location[0]}
              className={classes.listItem}
              button
              onClick={() => handleSelectLocation(location)}
            >
              <ListItemText primary={location[1]} secondary={location[3]} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography className={classes.typography}>
          No hay resultados
        </Typography>
      )}
    </Popover>
  );
};

export default SearchPopover;
