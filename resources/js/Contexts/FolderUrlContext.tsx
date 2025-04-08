import { createContext } from 'react';

//Context to manage the actual URL of files manager in dashboard
const FolderUrlContext = createContext(null as any);

export default FolderUrlContext;