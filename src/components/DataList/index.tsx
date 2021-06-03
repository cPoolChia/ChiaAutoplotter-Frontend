import React from "react";
import {
  List,
  Grid,
  ListItem,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  dataKeyMap,
  getDirectoryLocationById,
  iconMap,
  valueFormatter,
} from "../../utils/dataListModifier";
import { useStyles } from "./styles";
import { useGlobalState } from "../../common/GlobalState/hooks/useGlobalState";

interface Props {
  data: { [key: string]: any };
  title: string;
}

export const DataList: React.FC<Props> = ({ data, title }) => {
  const classes = useStyles();
  const [globalState] = useGlobalState();

  return (
    <Grid container spacing={2}>
      <Paper className={classes.paper}>
        <Typography className={classes.heading} align="center">
          {title}
        </Typography>
        <Grid item md={12}>
          <List>
            <Grid container spacing={2}>
              {Object.entries(data).map(([key, value]) => (
                <Grid key={key} item md={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>{iconMap[key]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={dataKeyMap[key] || key}
                      secondary={
                        valueFormatter(key, value) ||
                        getDirectoryLocationById(
                          globalState.directories,
                          value
                        ) ||
                        value
                      }
                    />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </List>
        </Grid>
      </Paper>
    </Grid>
  );
};
