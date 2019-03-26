import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

const Cell = (data, column) => ({ columnIndex, rowIndex, style }) => {
  const columnItem = column[columnIndex];
  const key = columnItem.key;
  const value = data[rowIndex][column[columnIndex].key];

  if (rowIndex === 0) {
    return null;
  }
  return column[columnIndex].render({ value, key, columnItem, data, column, columnIndex, rowIndex, style });
};

const Example = ({ data, column, width, height, getRowHeight, columnWidth = 100, rowHeight = 60 }) => {
  return React.useMemo(() => {
    const theGetColumnWidth = index => {
      return column[index].width || columnWidth;
    };

    const theGetRowHeight = index => {
      if (getRowHeight) {
        return getRowHeight(index);
      }
      return rowHeight;
    };

    return (
      <Grid
        columnCount={column.length}
        columnWidth={theGetColumnWidth}
        rowHeight={theGetRowHeight}
        height={height}
        rowCount={data.length}
        width={width}
      >
        {Cell(data, column)}
      </Grid>
    );
  }, [getRowHeight, rowHeight, height, width, data, column, columnWidth]);
};

export default Example;
