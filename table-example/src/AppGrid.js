/* eslint-disable */
import React from 'react';
import DenTable from 'packages/den-table';

const x = 200;
const y = 5000;
const columns = [];
const dataSource = [];

for (let i = 0; i < y; i++) {
  const d = {};

  for (let b = 0; b < x; b++) {
    d['col' + b] = b;
  }
  dataSource.push(d);
}

for (let i = 0; i < x; i++) {
  columns.push({
    key: 'col' + i,
    width: 100,
    prefix: i < 2,
    suffix: i < x - 3,
    renderHeader: ({ columnIndex, style, height }) => {
      return <div style={{ ...style, top: 0, height }}>header{columnIndex}</div>;
    },
    renderCell: ({ value, key, data, style, rowIndex, columnIndex }) => {
      // 30% 的input框
      // if (columnIndex % 3 === 1) {
      //   return (
      //     <input
      //       style={style}
      //       defaultValue={rowIndex * columnIndex + value}
      //       onChange={e => (data[rowIndex][key] = e.target.value)}
      //     />
      //   );
      // }
      return <div style={style}>{rowIndex * columnIndex + value}</div>;
    },
  });
}

function RenderLoading() {
  return <div>loading...</div>;
}

export default () => {
  return <DenTable renderLoading={RenderLoading} width="80%" height="80vh" columns={columns} data={dataSource} />;
};
