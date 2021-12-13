import grapesjs from 'grapesjs';
import Basics from 'grapesjs-blocks-basic';

import BaseReactComponent from './base-react-component';
import ReactComponents from './react-components';
import MuiComponents from './mui-components';

const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  storageManager: false,
  noticeOnUnload: false,
  plugins: [Basics, BaseReactComponent, ReactComponents, MuiComponents]
});

editor.setComponents(`
<div>
  <span>
    Foo
  </span>
  <Listing>
    <div>
      Bar
    </div>
    <MuiButton variant='contained' color='primary'>
      Click Me
    </MuiButton>
    <Slider />
  </Listing>
  <Snackbar>
    <MuiButton variant='contained' color='secondary'>
      Click Me
    </MuiButton>
  </Snackbar>
  <Slider />
</div>
`);
