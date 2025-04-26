import React from 'react';
import { createRoot } from 'react-dom/client';
import TextEditor from './TextEditor';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TextEditor />);