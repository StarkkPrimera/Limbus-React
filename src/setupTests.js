import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// React Router 7 usa TextEncoder; Jest de CRA trabaja con jsdom.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
