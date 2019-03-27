/* eslint-disable */
import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import useComponentResize from 'use-component-resize';
import memoize from 'memoize-one';

const createItemData = memoize(params => params);

const Cell = React.memo(({ data: itemData, columnIndex, rowIndex, style }) => {
  return React.useMemo(() => {
    const { data, columns, headerHeight, renderLoading } = itemData;
    const column = columns[columnIndex];
    const key = column.key;
    const value = data[rowIndex][key];

    const header = column.renderHeader();

    return column[columnIndex].renderCell({
      value,
      key,
      columnItem,
      data,
      column,
      columnIndex,
      rowIndex,
      style,
    });
  }, [columnIndex, rowIndex, style]);
});

// const Header = ({
//   headerProps = {},
//   data,
//   headerHeight: height,
//   column,
//   width: bodyWidth,
//   getRowHeight,
//   columnWidth,
//   rowHeight,
// }) => {
//   return (
//     <div
//       style={{
//         height,
//         width: 'auto',
//         display: 'flex',
//         flexDirection: 'row',
//         zIndex: 3,
//         // overflowY: 'auto',
//         overflowY: 'hidden',
//         ...headerProps.style,
//       }}
//       {...headerProps}
//     >
//       {column.map(col => {
//         return col.renderHeader({ data, column, bodyWidth, width: column.width || columnWidth, height });
//       })}
//     </div>
//   );
// };

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

    const itemData = createItemData({
      data,
      columns,
      headerHeight,
    });

    return (
      <div ref={boxRef} style={{ width, height, ...style }}>
        {boxSize.width && (
          <Grid
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
  }, [getRowHeight, rowHeight, height, width, data, columns, columnWidth]);
};

// const Table = ({ width = '100%', height = '100%', style, headerProps, headerHeight, ...rest }) => {
//   const [boxRef, boxSize] = useComponentResize(30);
//
//   return (
//     <div ref={boxRef} style={{ width, height, ...style }}>
//       // {boxSize.width && <Header headerProps={headerProps} width={boxSize.width} height={headerHeight} {...rest} />}
//       {boxSize.width && <Body width={boxSize.width} height={boxSize.height - headerHeight} {...rest} />}
//     </div>
//   );
// };

export default Table;
