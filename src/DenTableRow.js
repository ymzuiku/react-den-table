import React, { memo } from 'react';
import { areEqual } from 'react-window';

const Row = memo(({ data: params, index: rowIndex, style, rowProps }) => {
  const { data, columns, onChangeData, rowStyle, rowClassName, itemSize, tableKey } = params;

  const rowData = data[rowIndex];

  function handleOnChangeData(nextData) {
    if (typeof onChangeData === 'function') {
      onChangeData(nextData);
    }
  }

  return (
    <div
      className={rowClassName}
      style={{
        position: 'relative',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'row',
        ...style,
        width: 'auto',
        ...rowStyle,
      }}
      {...rowProps}
    >
      {columns.map((column, colIndex) => {
        function handleOnChangeDataValue(value) {
          // 如果是input属性, 读取子属性
          if (value && value.target) {
            data[rowIndex][column.key] = value.target.value;
          } else {
            data[rowIndex][column.key] = value;
          }
          if (typeof onChangeData === 'function') {
            onChangeData(data);
          }
        }

        // 如果是prefix
        if (column.prefix) {
          return (
            <div
              key={column.key}
              name={'den-table-prefix' + tableKey}
              style={{
                position: 'sticky',
                left: columns[colIndex - 1] ? columns[colIndex - 1].width : 0,
                top: 0,
                width: column.width,
                height: itemSize(),
              }}
            >
              <column.renderCell
                key={column.key}
                value={rowData[column.key]}
                data={data}
                rowData={rowData}
                column={column}
                rowIndex={rowIndex}
                colIndex={colIndex}
                updateData={handleOnChangeData}
                updateValue={handleOnChangeDataValue}
              />
            </div>
          );
        }

        if (column.suffix) {
          return (
            <div
              key={column.key}
              name={'den-table-suffix' + tableKey}
              style={{
                position: 'sticky',
                right: columns[colIndex + 1] ? columns[colIndex + 1].width : 0,
                top: 0,
                zIndex: 100,
                width: column.width,
                height: itemSize(),
              }}
            >
              <column.renderCell
                key={column.key}
                value={rowData[column.key]}
                data={data}
                rowData={rowData}
                column={column}
                rowIndex={rowIndex}
                colIndex={colIndex}
                updateData={handleOnChangeData}
                updateValue={handleOnChangeDataValue}
              />
            </div>
          );
        }

        return (
          <div
            key={column.key}
            style={{
              width: column.width,
              height: itemSize(),
            }}
          >
            <column.renderCell
              value={rowData[column.key]}
              data={data}
              rowData={rowData}
              column={column}
              rowIndex={rowIndex}
              colIndex={colIndex}
              updateData={handleOnChangeData}
              updateValue={handleOnChangeDataValue}
            />
          </div>
        );
      })}
    </div>
  );
}, areEqual);

export default Row;
