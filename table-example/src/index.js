import React from 'react';
import ReactDOM from 'react-dom';

import AppRepo from 'src/AppRepo';

class Root extends React.Component {
  render() {
    return <AppRepo />;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
