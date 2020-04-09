import React from 'react';
import './toolbar.styles.css';

import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import ZoomOutSharpIcon from '@material-ui/icons/ZoomOutSharp';
import ZoomInSharpIcon from '@material-ui/icons/ZoomInSharp';
const ToolBar = props => 
  <div className="toolbar">
    <div className="toolbar-download">
      <a href={props.pdfUrl} download="resume.pdf">
        <GetAppTwoToneIcon color="secondary" style={{ fontSize: 27, marginBottom: -8 }}/>
        PDF
      </a>
    </div>
    <div className="toolbar-pages">
      <button className="toolbar-backward" onClick={() => props.prePage()}>
        <i className="fa fa-long-arrow-left"></i>
      </button>
      <div className="toolbar-pages-number"> Page  {props.pageNumber}</div>
      <button className="toolbar-forward" onClick={() => props.nextPage()}>
        <i className="fa fa-long-arrow-right"></i>
      </button>
    </div>
    <div className="toolbar-zoom">
      <ZoomOutSharpIcon className="toolbar-zoom-out" onClick={() => props.zoomOut()}/>
      <ZoomInSharpIcon className="toolbar-zoom-in" onClick={() => props.zoomIn()}/>
    </div>
  </div>

export default ToolBar;