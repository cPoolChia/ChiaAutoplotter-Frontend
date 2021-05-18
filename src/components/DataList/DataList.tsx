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
import { iconMap } from "../../utils/serverDataIconModifier";
import { useStyles } from "./styles";
import { ServerType } from "../../services/ServerService/types";

interface Props {
  data: ServerType;
  title: string;
}

export const DataList: React.FC<Props> = ({ data, title }) => {
  const classes = useStyles();

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
                    <ListItemText primary={key} secondary={value} />
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
