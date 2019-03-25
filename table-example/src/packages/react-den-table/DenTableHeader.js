import React from 'react';

function DenTableHeader({
  getHeaderHeight,
  columns,
  data,
  headerStyle,
  headerClassName = '',
  headerProps,
  tableKey,
  headerRef,
}) {
  function renderItem() {
    return columns.map((column, colIndex) => {
      // 如果是prefix
      if (column.prefix) {
        return (
          <div
            key={column.key}
            name={'den-table-header-item' + tableKey}
            style={{
              position: 'sticky',
              left: columns[colIndex - 1] ? columns[colIndex - 1].width : 0,
              top: 0,
              width: column.width,
              height: getHeaderHeight(),
            }}
          >
            <column.renderHeader
              height={getHeaderHeight()}
              key={column.key}
              columns={columns}
              column={column}
              data={data}
            />
          </div>
        );
      }

      if (column.suffix) {
        return (
          <div
            key={column.key}
            name={'den-table-header-item' + tableKey}
            style={{
              position: 'sticky',
              right: columns[colIndex + 1] ? columns[colIndex + 1].width : 0,
              top: 0,
              zIndex: 100,
              width: column.width,
              height: getHeaderHeight(),
            }}
          >
            <column.renderHeader
              height={getHeaderHeight()}
              key={column.key}
              columns={columns}
              column={column}
              data={data}
            />
          </div>
        );
      }

      return (
        <column.renderHeader
          height={getHeaderHeight()}
          key={column.key}
          columns={columns}
          column={column}
          data={data}
        />
      );
    });
  }

  return (
    <div
      ref={headerRef}
      className={headerClassName + ' den-no-scroll'}
      name={'den-table-header' + tableKey}
      style={{
        height: getHeaderHeight(),
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 3,
        overflowY: 'auto',
        ...headerStyle,
      }}
      {...headerProps}
    >
      {renderItem()}
    </div>
  );
}

export default DenTableHeader;
