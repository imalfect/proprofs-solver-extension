import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import {Theme} from '@radix-ui/themes';
import AppInjected from './AppInjected.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Theme
      appearance="dark"
      accentColor="purple"
      grayColor="slate"
      panelBackground="solid"
      radius="large">
      <AppInjected/>
    </Theme>,
);
