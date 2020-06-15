import React from 'react';
import ResearcherPageExtension from '../extension/ResearcherPageExtension';

const ResearcherPage = props => {
    
    return (
        <React.Fragment>
            <ResearcherPageExtension onLogout={props.onLogout} userEmail={props.userEmail} isLogged={props.isLogged}></ResearcherPageExtension>
        </React.Fragment>
    );
};

export default ResearcherPage;