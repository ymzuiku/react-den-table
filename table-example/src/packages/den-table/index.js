import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

const Cell = ({ columnIndex, rowIndex, style }) => <input style={style} defaultValue={columnIndex + rowIndex} />;

const Example = () => (
  <Grid columnCount={1000} columnWidth={100} height={150} rowCount={1000} rowHeight={35} width={300}>
    {Cell}
  </Grid>
);

export default Example;
