import React    from "react";
import template from "./pokemonGrid.jsx";

class pokemonGrid extends React.Component {
  render() {
    return template.call(this);
  }
}

export default pokemonGrid;
