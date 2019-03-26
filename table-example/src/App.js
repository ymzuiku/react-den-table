/* eslint-disable */
import React from 'react';
import DenTable from 'packages/react-den-table';
import Pseudo from 'react-dom-pseudo';
import Form from 'react-den-form';
// import { useDen } from 'react-den';

const DATA = [];
const cellNumber = 1000;
const colNumber = 20;

for (let i = 0; i < cellNumber; i++) {
  const d = {};

  for (let b = 0; b < colNumber; b++) {
    d['aaa' + String(b)] = 'value-' + b;
  }
  DATA.push(d);
}

const Input = ({ value, column, updateValue, rowIndex, colIndex }) => {
  function handleChangeValue(e) {
    updateValue(e.target.value);
  }

  const field = `field-${rowIndex}-${colIndex}`;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRight: column.key === 'aaa2' ? '1px solid #f3f3f3' : 'none',
      }}
    >
      <input
        field={field}
        className="app-table-cell"
        key={column.key}
        style={{ width: column.width || '200px' }}
        defaultValue={value}
        onChange={handleChangeValue}
      />
    </div>
  );
};

const Head = ({ column, height }) => {
  return (
    <div style={{ backgroundColor: '#fff', minWidth: column.width || '200px', alignSelf: 'center', height }}>
      {column.key}
    </div>
  );
};

const COLUMNS = [];

for (let i = 0; i < colNumber; i++) {
  COLUMNS.push({
    key: 'aaa' + String(i),
    prefix: i < 2,
    suffix: i > colNumber - 3,
    // suffix: true,
    width: 80,
    renderHeader: Head,
    renderCell: Input,
  });
}

function TestInput(props) {
  console.log(props);
  return <input field="field" />;
}

/** 用于演示的 hello world */
function App() {
  function handleOnChangeData(nextData) {
    // console.log(',,app', nextData);
  }

  return (
    <div>
      <header>
        <Form onChange={({ data }) => console.log(data)}>
          <input />
        </Form>
        <DenTable
          headerInFooter
          // className="den-scroll"
          overscanCount={500}
          onChangeData={handleOnChangeData}
          data={DATA}
          columns={COLUMNS}
          rowClassName="app-table-row"
          headerClassName="app-table-header"
          getCellHeight={() => 60}
          getHeaderHeight={() => 40}
          style={{ width: '90%', height: '90vh' }}
          rowStyle={{ borderBottom: '1px solid #f0f0f0' }}
          prefixStyle={{ borderRight: '1px solid #f3f3f3', backgroundColor: '#fff' }}
          suffixStyle={{ borderLeft: '1px solid #f3f3f3', backgroundColor: '#fff' }}
        />
      </header>
    </div>
  );
}

export default App;
