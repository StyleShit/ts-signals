import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Signals</h1>
    <div class="card">
      <div id="counter">
        <button id="increment" type="button">Increment</button>
        <button id="reset" type="button">Reset</button>

        <br /><br />

        <div id="count"></div>
        <div id="count-doubled"></div>

        <br />

        <input type="text" autocomplete="off" id="name" />
        <br /><br />
        <span id="name-output"></span>
      </div>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLDivElement>('#counter')!);
