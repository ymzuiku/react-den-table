import './DenTable.css';
import React, { useMemo, useEffect, useRef } from 'react';
import useComponentResize from 'use-component-resize';
import { findDOMNode } from 'react-dom';
import DenTableBody from './DenTableBody';
import DenTableHeader from './DenTableHeader';

let tableKey = 0;

const DenTable = ({
  className,
  rowStyle,
  rowClassName,
  rowProps,
  style,
  data,
  columns,
  getCellHeight,
  onChangeData,
  getHeaderHeight = () => 0,
  headerStyle,
  headerClassName,
  headerProps,
  prefixClassName,
  prefixStyle,
  suffixClassName,
  suffixStyle,
  overscanCount = 2,
  onItemsRendered,
  renderHeaderTop,
  renderHeaderBottom,
  ...rest
}) => {
  const [boxRef, boxSize] = useComponentResize(30);
  const bodyRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    tableKey += 1;
  }, []);

  return useMemo(() => {
    function handleOnChangeData(nextData) {
      onChangeData(nextData);
    }

    const prefixColumns = columns.filter(v => v.prefix === true);
    let prefixWidth = 0;

    prefixColumns.forEach(v => (prefixWidth += v.width));

    const suffixColumns = columns.filter(v => v.suffix === true);
    let suffixWidth = 0;

    suffixColumns.forEach(v => (suffixWidth += v.width));

    function handleUpdateScroll(e) {
      if (e && e.target && headerRef && headerRef.current) {
        const dom = findDOMNode(headerRef.current);

        if (dom) {
          dom.scrollLeft = e.target.scrollLeft;
        }
      }
    }

    return (
      <div ref={boxRef} style={{ zIndex: 0, width: '100%', height: '100%', position: 'relative', ...style }}>
        {boxSize.width && boxSize.height && (
          <>
            {renderHeaderTop && renderHeaderTop()}
            <DenTableHeader
              tableKey={tableKey}
              headerRef={headerRef}
              data={data}
              updateData={handleOnChangeData}
              columns={columns}
              getHeaderHeight={getHeaderHeight}
              headerStyle={headerStyle}
              headerClassName={headerClassName}
              headerProps={headerProps}
            />
            {renderHeaderBottom && renderHeaderBottom()}
            <DenTableBody
              tableKey={tableKey}
              bodyRef={bodyRef}
              className={className}
              width={boxSize.width}
              height={boxSize.height}
              getHeaderHeight={getHeaderHeight}
              itemCount={data.length}
              data={data}
              columns={columns}
              updateData={handleOnChangeData}
              updateScroll={handleUpdateScroll}
              itemSize={getCellHeight}
              onItemsRendered={onItemsRendered}
              overscanCount={overscanCount}
              {...rest}
            />
          </>
        )}
      </div>
    );
  }, [
    boxRef,
    boxSize.height,
    boxSize.width,
    className,
    columns,
    data,
    getCellHeight,
    getHeaderHeight,
    headerClassName,
    headerProps,
    headerStyle,
    onChangeData,
    onItemsRendered,
    overscanCount,
    renderHeaderBottom,
    renderHeaderTop,
    rest,
    style,
  ]);
};

export default DenTable;
