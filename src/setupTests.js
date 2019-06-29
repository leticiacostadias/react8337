import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
  storage: {
    token: 'meuToken'
  },

  getItem: (key) => {
    return localStorageMock.storage[key];
  },

  setItem: (key, value) => {
    localStorageMock.storage[key] = value;
  }
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });