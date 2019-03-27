import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/AppGrid';

class Root extends React.Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
