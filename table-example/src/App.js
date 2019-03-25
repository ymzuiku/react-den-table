import React from 'react';
import DenTable from 'packages/react-den-table';
import Pseudo from 'react-dom-pseudo';

const DATA = [];

for (let i = 0; i < 30000; i++) {
  DATA.push({
    aaa1: 'value1-' + i,
    aaa2: 'value2-' + i,
    aaa3: 'value3-' + i,
    aaa4: 'value4-' + i,
    aaa5: 'value5-' + i,
    aaa6: 'value6-' + i,
    aaa7: 'value7-' + i,
    aaa8: 'value8-' + i,
    aaa9: 'value9-' + i,
    aaa10: 'value10-' + i,
    aaa11: 'value11-' + i,
    aaa12: 'value12-' + i,
    aaa13: 'value13-' + i,
    aaa14: 'value14-' + i,
  });
}

const Input = ({ value: defaultValue, column, updateValue }) => {
  const [value, setValue] = React.useState(defaultValue);

  function handleChangeValue(e) {
    setValue(e.target.value);
  }

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
        className="app-table-cell"
        key={column.key}
        style={{ width: column.width || '200px' }}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            updateValue(value);
          }
        }}
        onBlur={updateValue}
      />
    </div>
  );
};

const Head = ({ column, height }) => {
  return (
    <Pseudo
      hoverStyle={{ backgroundColor: '#ff7' }}
      style={{ backgroundColor: '#fff', minWidth: column.width || '200px', alignSelf: 'center', height }}
    >
      {column.key}
    </Pseudo>
  );
};

const COLUMNS = [
  {
    key: 'aaa1',
    width: 150,
    prefix: true,
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa2',
    width: 200,
    // prefix: true,
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa3',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa4',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa5',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa6',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa7',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa8',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa9',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa10',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa11',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa12',
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa13',
    // suffix: true,
    width: 80,
    renderHeader: Head,
    renderCell: Input,
  },
  {
    key: 'aaa14',
    suffix: true,
    width: 80,
    renderHeader: Head,
    renderCell: Input,
  },
];

/** 用于演示的 hello world */
function App() {
  function handleOnChangeData(nextData) {
    console.log(',,app', nextData);
  }

  function handleOnChangeColumns(nextData) {
    console.log(',,app', nextData);
  }

  return (
    <div>
      <header>
        <DenTable
          headerInFooter
          // className="scroll"
          onChangeData={handleOnChangeData}
          onChangeColumns={handleOnChangeColumns}
          data={DATA}
          columns={COLUMNS}
          rowClassName="app-table-row"
          headerClassName="app-table-header"
          getCellHeight={() => 60}
          getHeaderHeight={() => 40}
          style={{ width: '100%', height: '100vh' }}
          rowStyle={{ borderBottom: '1px solid #f0f0f0' }}
          prefixStyle={{ borderRight: '1px solid #f3f3f3', backgroundColor: '#fff' }}
          suffixStyle={{ borderLeft: '1px solid #f3f3f3', backgroundColor: '#fff' }}
        />
      </header>
    </div>
  );
}

export default App;
