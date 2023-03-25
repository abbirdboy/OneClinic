import React from "react";
import { observer } from "mobx-react";

const Home = () => {
  return <iframe src="src/Test/index.html" title="my-iframe"></iframe>;
};

export default observer(Home);
