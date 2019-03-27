/* eslint-disable */
import React from 'react';
import DenTable from 'packages/den-table';

const x = 20;
const y = 5000;
const columns = [];
const dataSource = [];

for (let i = 0; i < y; i++) {
  const d = {};

  for (let b = 0; b < x; b++) {
    d['col' + b] = 'value-' + b;
  }
  dataSource.push(d);
}

for (let i = 0; i < x; i++) {
  columns.push({
    key: 'col' + i,
    width: 100,
    otherWidth: 1,
    prefix: i < 2,
    suffix: i > x - 3,
    renderHeader: ({ columnIndex, style, height, column, width }) => {
      return (
        <div
          style={{
            width,
            height,
            background: '#fff',
            borderRight: columnIndex === 1 && '1px solid #f3f3f3',
            borderLeft: columnIndex === columns.length - 3 && '1px solid #f3f3f3',
          }}
        >
          header{columnIndex}
        </div>
      );
    },
    renderCell: ({ isScrolling, value, key, data, rowIndex, column, columnIndex, width }) => {
      // if (isScrolling) {
      //   return <div>scrolling...</div>;
      // }
      return (
        <div
          style={{
            width,
            background: '#fff',
            borderRight: columnIndex === 1 && '1px solid #f3f3f3',
            borderLeft: columnIndex === columns.lenght - 3 && '1px solid #f3f3f3',
          }}
        >
          {value}
        </div>
      );
    },
  });
}

function RenderLoading() {
  return <div>loading...</div>;
}

export default () => {
  return <DenTable renderLoading={RenderLoading} width="80%" height="80vh" columns={columns} data={dataSource} />;
};
