import React from 'react';

import Form from '../../components/form/form';

import TopNavBar from '../../components/topnavbar/topnavbar.component';
import ToolBar from '../../components/toolbar/toolbar.component';
import pdf from '../../assests/resume.pdf';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import './resume.css';
import SideNav from '../../components/sidenavbar/sidenavbar.component';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      url:pdf,
      scale: 1,
      generateButtonStatus: 'generate'
    }
  }

  changeURl = url => {
    this.setState({url: url})
  }

  changeGenerateButtonStatus = status => {
    this.setState({ generateButtonStatus : status });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  prePage = () => {
    let prePage = this.state.pageNumber;
    if (prePage > 1) prePage = prePage - 1;
    this.setState({
      pageNumber: prePage
    })
  }
  
  nextPage = () => {
    let nextPage = this.state.pageNumber;
    if (nextPage < this.state.numPages) nextPage = nextPage + 1;
    this.setState({
      pageNumber: nextPage
    })
  }
  
  zoomOut = () => {
    let zoom = Math.max(this.state.scale - 0.1, 0.5);
    this.setState({scale:zoom});
  }

  zoomIn = () => {
    let zoom = Math.min(this.state.scale + 0.1, 1);
    this.setState({scale:zoom});
  }

  render() {
    const { pageNumber} = this.state;

    return (
      <div className="resume-container">
        <div className="resume-navigation">
          {/* <Paper elevation={12} square className="landingpage-nav"> 
            <div className="landingpage-box-logo">
              <div className="landingpage-logo">
                <Link to="/" >RSOFT</Link>
              </div>
            </div>
            <div className="landingpage2-about-box">
              <div className="landingpage2-about">
                <Link to="/about"> About </Link>
              </div>
            </div>
          </Paper> */}
          <TopNavBar />
        </div>
        <div className="resume-content-container">
          <div className="resume-side-navigation">
            <SideNav generateButtonStatus={this.state.generateButtonStatus}/>
          </div>
          <div className="resume-form">
            {/* <div className="resume-text"> This is sample test </div> */}
            <Form 
              changeURl={this.changeURl} 
              changeGenerateButtonStatus={this.changeGenerateButtonStatus}
            />
          </div>
          <div className="resume-preview">
            
            <ToolBar pdfUrl={this.state.url} 
              pageNumber={pageNumber} 
              prePage={this.prePage}
              nextPage={this.nextPage}
              zoomOut={this.zoomOut}
              zoomIn={this.zoomIn}
              />
            <div className="pdf">
              
              <Document
                file={this.state.url}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page className="resume-page" 
                  scale={this.state.scale} 
                  pageNumber={pageNumber} 
                  renderAnnotations={false}
                  renderTextLayer={false}/>
              </Document>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;