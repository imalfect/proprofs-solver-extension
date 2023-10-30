import Hero from './components/Hero.tsx';
import RunProgram from './components/RunProgram.tsx';
import {Toaster} from 'react-hot-toast';

function AppInjected() {
  return (
    <div className="mx-auto window font-sans">
      <Hero/>
      <RunProgram/>
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

export default AppInjected;
