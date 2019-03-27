/* eslint-disable */
import React from 'react';
import { VariableSizeList as List } from 'react-window';
import useComponentResize from 'use-component-resize';
import memoize from 'memoize-one';

const createItemData = memoize(params => params);

const RenderCell = React.memo(
  ({ data, rowStyle, columns, column, rowIndex, isScrolling, columnIndex, height, ...rest }) => {
    return React.useMemo(() => {
      const key = column.key;
      const value = rowIndex !== void 0 && data[rowIndex][key];
      const renderKey = rowIndex !== void 0 ? 'renderCell' : 'renderHeader';

      const width = typeof column.width === 'function' ? column.width() : column.width;
      const otherWidth = typeof column.otherWidth === 'function' ? column.otherWidth() : column.otherWidth;

      let cell = column[renderKey]({
        value,
        key,
        columns,
        data,
        column,
        columnIndex,
        rowIndex,
        height,
        width,
        rowStyle,
        isScrolling,
      });

      if (column.prefix) {
        let left = 0;
        for (let i = 0; i < columnIndex; i++) {
          const theColumn = columns[i];
          const theWidth = typeof theColumn.width === 'function' ? theColumn.width() : theColumn.width;
          const theOtherWidth =
            typeof theColumn.otherWidth === 'function' ? theColumn.otherWidth() : theColumn.otherWidth;
          left += theWidth || 0;
          left += theOtherWidth || 0;
        }
        cell = React.cloneElement(cell, {
          style: {
            ...(cell.props && cell.props.style),
            left,
            position: 'sticky',
            zIndex: 5 + columnIndex,
          },
        });
      } else if (column.suffix) {
        let right = 0;
        for (let i = columnIndex + 1; i < columns.length; i++) {
          const theColumn = columns[i];
          const theWidth = typeof theColumn.width === 'function' ? theColumn.width() : theColumn.width;
          const theOtherWidth =
            typeof theColumn.otherWidth === 'function' ? theColumn.otherWidth() : theColumn.otherWidth;
          right += theWidth || 0;
          right += theOtherWidth || 0;
        }
        cell = React.cloneElement(cell, {
          style: {
            ...(cell.props && cell.props.style),
            right,
            position: 'sticky',
            zIndex: 5 + columnIndex,
          },
        });
      }

      return cell;
    }, [columnIndex, rowIndex]);
  },
);

const RenderRow = React.memo(({ data: itemData, index, isScrolling, style, ...rest }) => {
  const { data, columns, headerHeight, rowProps, renderPrefixRow, renderSuffixRow } = itemData;
  const props = rowProps ? rowProps({ data, index, columns, style }) : {};

  return (
    <div
      {...props}
      style={{
        ...style,
        top: style.top + headerHeight,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        ...props.style,
      }}
    >
      {renderPrefixRow && renderPrefixRow({ columns, data, headerHeight, isScrolling })}
      {columns.map((column, columnIndex) => {
        return (
          <RenderCell
            key={columnIndex}
            data={data}
            column={column}
            columns={columns}
            rowIndex={index}
            columnIndex={columnIndex}
            height={style.height}
            rowStyle={style}
            isScrolling={isScrolling}
          />
        );
      })}
      {renderSuffixRow && renderSuffixRow({ columns, data, headerHeight, isScrolling })}
    </div>
  );
});

// 表头
const Header = ({ columns, data, headerHeight, renderPrefixHeader, renderSuffixHeader, style, headerProps }) => {
  const props = headerProps ? rowProps({ data, index, columns, style }) : {};

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: 'sticky',
        width: 'auto',
        height: headerHeight,
        zIndex: 10 + columns.length,
      }}
    >
      <div
        {...props}
        style={{
          top: 0,
          left: 0,
          position: 'absolute',
          width: 'auto',
          height: headerHeight,
          display: 'flex',
          flexDirection: 'row',
          ...props.style,
        }}
      >
        {renderPrefixHeader && renderPrefixHeader({ columns, data, headerHeight })}
        {columns.map((column, columnIndex) => {
          return (
            <RenderCell
              key={columnIndex}
              data={data}
              column={column}
              columns={columns}
              rowIndex={void 0}
              columnIndex={columnIndex}
            />
          );
        })}
        {renderSuffixHeader && renderSuffixHeader({ columns, data, headerHeight })}
      </div>
    </div>
  );
};

const innerElementType = props =>
  React.forwardRef(({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Header {...props} {...rest} />
        {children}
      </div>
    );
  });

const Table = ({
  overscanCount = 1,
  data,
  headerHeight = 60,
  columns,
  width,
  height,
  getRowHeight,
  columnWidth = 100,
  rowHeight = 60,
  renderPrefixHeader,
  renderSuffixHeader,
  renderPrefixRow,
  renderSuffixRow,
  rowProps,
  headerProps,
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
      rowProps,
      headerHeight,
      renderPrefixRow,
      renderSuffixRow,
    });

    console.log('table-re-render');

    return (
      <div ref={boxRef} style={{ width, height, ...style }}>
        {boxSize.width && (
          <List
            innerElementType={innerElementType({
              headerProps,
              columns,
              data,
              headerHeight,
              renderPrefixHeader,
              renderSuffixHeader,
            })}
            useIsScrolling
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
