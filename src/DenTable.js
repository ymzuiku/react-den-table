import './DenTable.css';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import useGetResize from 'use-component-resize';
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
  overscanCount = 3,
  onItemsRendered,
  renderHeaderTop,
  renderHeaderBottom,
  ...rest
}) => {
  const [boxRef, boxSize] = useGetResize(30);
  const [antiData, setAntiData] = useState(data);
  const bodyRef = useRef(null);
  const headerRef = useRef(null);

  function handleOnChangeData(nextData) {
    setAntiData(nextData);
    onChangeData(nextData);
  }

  useEffect(() => {
    tableKey += 1;
  }, []);

  useEffect(() => {
    setAntiData(data);
  }, [data]);

  return useMemo(() => {
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
              data={antiData}
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
              itemCount={antiData.length}
              data={antiData}
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
    columns,
    boxRef,
    style,
    boxSize.width,
    boxSize.height,
    renderHeaderTop,
    antiData,
    handleOnChangeData,
    getHeaderHeight,
    headerStyle,
    headerClassName,
    headerProps,
    renderHeaderBottom,
    className,
    getCellHeight,
    onItemsRendered,
    overscanCount,
    rest,
  ]);
};

export default DenTable;
