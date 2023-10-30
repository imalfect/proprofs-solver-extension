import Hero from './components/Hero.tsx';
import ConfigureKey from './components/ConfigureKey.tsx';
import KeyStatus from './components/KeyStatus.tsx';
import {Toaster} from 'react-hot-toast';
import UnlockKey from './components/UnlockKey.tsx';
function App() {
  return (
    <div className="mx-auto window font-sans">
      <Hero/>
      <KeyStatus/>
      <UnlockKey/>
      <ConfigureKey/>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: '20px',
            borderRadius: '50px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;
