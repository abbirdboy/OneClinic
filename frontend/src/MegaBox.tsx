import React from "react";
import { observer } from "mobx-react";
import { FormControlLabel, makeStyles, Switch } from "@mui/material";

const MegaBox = () => {
  const [state, setState] = React.useState({
    checked: true,
  });

  return (
    <div>
      <FormControlLabel
        value={state.checked ? "yes" : "no"}
        control={<Switch color="primary" checked={state.checked} />}
        label={state.checked ? "Yes" : "No"}
        labelPlacement={state.checked ? "start" : "end"}
      />
    </div>
  );
};

export default observer(MegaBox);
