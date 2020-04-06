import React from 'react';
import './draghandle.styles.css';

import { sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => <span className="drag-handle"> : : </span>);

export default DragHandle;