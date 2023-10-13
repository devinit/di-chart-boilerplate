import React from 'react';
import { createRoot } from 'react-dom/client';
import NoData from '../components/NoData';

export const addNoData = (rootNode) => {
  rootNode.classList.add('no-data--wrapper');
  const root = createRoot(rootNode);
  root.unmount();
  root.render(<NoData />);

}

export const removeNoData = (rootNode) => {
  const root = createRoot(rootNode);
  rootNode.classList.remove('no-data--wrapper');
  root.unmount()
}

export * from './constants';
export * from './chart';
