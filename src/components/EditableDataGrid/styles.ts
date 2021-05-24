import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: 500,
      "& .MuiDataGrid-cellEditing": {
        backgroundColor: "rgb(255,215,115, 0.19)",
        color: "#1a3e72",
      },
      "& .Mui-error": {
        backgroundColor: `rgb(126,10,15, 0.1)`,
        color: "#750f0f",
      },
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: 30,
    },
    gridHeading: {
      marginBottom: 15,
      fontSize: "2rem",
    },
  };
});
