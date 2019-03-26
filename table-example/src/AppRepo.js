import React from 'react';
import DenTable from 'packages/den-table';
import useComponentResize from 'use-component-resize';

const x = 50;
const y = 2000;
const column = [];
const dataSource = [];

for (let i = 0; i < y; i++) {
  const d = {};

  for (let b = 0; b < x; b++) {
    d['col' + b] = b;
  }
  dataSource.push(d);
}

for (let i = 0; i < x; i++) {
  column.push({
    key: 'col' + i,
    width: 100,
    render: ({ value, key, data, style, rowIndex, columnIndex }) => {
      return (
        <input
          style={style}
          defaultValue={rowIndex * columnIndex + value}
          onChange={e => (data[rowIndex][key] = e.target.value)}
        />
      );
    },
  });
}

export default () => {
  const [boxRef, boxSize] = useComponentResize(30);

  return (
    <div ref={boxRef} style={{ width: '80%', height: '80vh' }}>
      <DenTable column={column} data={dataSource} width={boxSize.width} height={boxSize.height} />
    </div>
  );
};
