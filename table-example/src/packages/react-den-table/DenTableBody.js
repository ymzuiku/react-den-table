import React, { useMemo, forwardRef } from 'react';
import memoize from 'memoize-one';
import { VariableSizeList } from 'react-window';
import DenTableRow from './DenTableRow';

const createItemData = memoize(params => params);

const DenTableBody = ({
  tableKey,
  bodyRef,
  className,
  rowStyle,
  rowClassName,
  rowProps,
  style,
  updateData,
  data,
  columns,
  itemSize,
  getHeaderHeight = () => 0,
  width,
  height,
  onItemsRendered,
  overscanCount,
  updateScroll,
  ...rest
}) => {
  return useMemo(() => {
    const headerHeight = getHeaderHeight();

    const itemData = createItemData({
      data,
      columns,
      updateData,
      rowStyle,
      rowClassName,
      itemSize,
      tableKey,
    });

    const outerElementType = forwardRef((props, ref) => {
      return <div ref={ref} {...props} onScrollCapture={updateScroll} />;
    });

    return (
      <VariableSizeList
        name={'den-table-body' + tableKey}
        ref={bodyRef}
        className={className}
        style={style}
        width={width}
        height={height - headerHeight}
        itemData={itemData}
        itemCount={data.length}
        itemSize={itemSize}
        onItemsRendered={onItemsRendered}
        outerElementType={outerElementType}
        overscanCount={overscanCount}
        {...rest}
      >
        {DenTableRow}
      </VariableSizeList>
    );
  }, [
    getHeaderHeight,
    data,
    columns,
    updateData,
    rowStyle,
    rowClassName,
    itemSize,
    tableKey,
    bodyRef,
    className,
    style,
    width,
    height,
    onItemsRendered,
    overscanCount,
    rest,
    updateScroll,
  ]);
};

export default DenTableBody;
