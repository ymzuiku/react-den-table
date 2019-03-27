/* eslint-disable */
import React from 'react';
import { VariableSizeList as List } from 'react-window';
import useComponentResize from 'use-component-resize';
import memoize from 'memoize-one';

const createItemData = memoize(params => params);

const RenderPrefix = ({ columns, data, style }) => {
  return <div style={{ left: 0, position: 'sticky' }}>prefix</div>;
};

const RenderSuffix = ({ columns, data, style }) => {
  return <div style={{ right: 0, position: 'sticky' }}>suffix</div>;
};

const RenderCell = React.memo(({ data, columns, column, rowIndex, columnIndex, ...rest }) => {
  return React.useMemo(() => {
    const key = column.key;
    const value = data[rowIndex][key];

    let cell = column.renderCell({
      value,
      key,
      columns,
      data,
      column,
      columnIndex,
      rowIndex,
    });

    if (column.prefix) {
      cell = React.cloneElement(cell, { left: 0, position: 'sticky' });
    } else if (column.suffix) {
      cell = React.cloneElement(cell, { right: 0, position: 'sticky' });
    }
    return cell;
  }, [columnIndex, rowIndex]);
});

const RenderRow = React.memo(({ data: itemData, index, style, ...rest }) => {
  const { data, columns, headerHeight } = itemData;
  return (
    <div style={{ ...style, display: 'flex', flexDirection: 'row' }}>
      {columns.map(column => {
        return <RenderCell data={data} column={column} columns={columns} rowIndex={index} columnIndex={1} />;
      })}
    </div>
  );
});

// 表头
const Header = ({ columns, data, headerHeight }) => {
  return (
    <div className="sticky" style={{ top: 0, left: 0, position: 'sticky', width: '100%', height: headerHeight }}>
      header
    </div>
  );
};

const innerElementType = props =>
  React.forwardRef(({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Header {...props} />
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

    console.log('table-re-render');

    return (
      <div ref={boxRef} style={{ width, height, ...style }}>
        {boxSize.width && (
          <List
            innerElementType={innerElementType({ columns, data, headerHeight })}
            itemData={itemData}
            itemSize={theGetRowHeight}
            itemCount={data.length}
            width={boxSize.width}
            height={boxSize.height}
            overscanCount={overscanCount}
          >
            {RenderRow}
          </List>
        )}
      </div>
    );
  }, [getRowHeight, rowHeight, height, width, data, columns, columnWidth, boxSize]);
};

export default Table;
