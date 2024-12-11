import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import './DialogPop.css'


const DialogPop = ({ isOpen, close, children }) => {

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {children}
            </Dialog>
        </React.Fragment>
    );
}

export default DialogPop;