/* eslint-disable */
import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import useComponentResize from 'use-component-resize';
import memoize from 'memoize-one';

const createItemData = memoize(params => params);

const Cell = React.memo(({ data: itemData, columnIndex, rowIndex, style }) => {
  return React.useMemo(() => {
    const { data, columns, headerHeight, renderLoading, cellCache } = itemData;
    const column = columns[columnIndex];
    const key = column.key;
    const value = data[rowIndex][key];

    // if (!cellCache[rowIndex]) {
    //   cellCache[rowIndex] = [];
    // }
    //
    // if (!cellCache[rowIndex][columnIndex] && (rowIndex === 0 || column.prefix)) {
    //   cellCache[rowIndex][columnIndex] = column.renderCell({
    //     value,
    //     key,
    //     columns,
    //     data,
    //     column,
    //     columnIndex,
    //     rowIndex,
    //     style: { ...style, zIndex: 10, position: 'sticky' },
    //   });
    // }

    const cell = column.renderCell({
      value,
      key,
      columns,
      data,
      column,
      columnIndex,
      rowIndex,
      // style,
      style: { ...style, top: style.top + headerHeight },
    });
    return cell;

    return [...cellCache[rowIndex], cell].filter(Boolean);
  }, [columnIndex, rowIndex, style]);
});

const StickyRow = ({ index, style }) => (
  <div className="sticky" style={style}>
    Sticky Row {index}
  </div>
);

const innerElementType = columns =>
  React.forwardRef(({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <StickyRow columns={columns} style={{ top: 0, left: 0, position: 'sticky', width: '100%', height: 35 }} />
        {children}
      </div>
    );
  });

const Table = ({
  overscanCount = 2,
  data,
  headerHeight = 60,
  columns,
  width,
  height,
  getRowHeight,
  columnWidth = 100,
  rowHeight = 60,
  style,
}) => {
  const [boxRef, boxSize] = useComponentResize(30);

  // data = [data[0], ...data];

  return React.useMemo(() => {
    const theGetColumnWidth = index => {
      return columns[index].width || columnWidth;
    };

    const theGetRowHeight = index => {
      if (getRowHeight) {
        return getRowHeight(index);
      }
      return rowHeight;
    };

    const itemData = createItemData({
      data,
      columns,
      headerHeight,
      cellCache: {},
    });

    const innerCache = {};

    console.log('table-re-render');

    return (
      <div ref={boxRef} style={{ width, height, ...style }}>
        {boxSize.width && (
          <Grid
            innerElementType={innerElementType(innerCache)}
            columnCount={columns.length}
            columnWidth={theGetColumnWidth}
            itemData={itemData}
            rowHeight={theGetRowHeight}
            rowCount={data.length}
            width={boxSize.width}
            height={boxSize.height}
            overscanCount={overscanCount}
          >
            {Cell}
          </Grid>
        )}
      </div>
    );
  }, [getRowHeight, rowHeight, height, width, data, columns, columnWidth, boxSize]);
};

export default Table;
