import { useContext } from 'react';
import tabContext from '../tabContext';

const tabHook = () => useContext(tabContext);

export default tabHook;
