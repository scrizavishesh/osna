import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DownloadPDF = ({ open, onClose, pdfData }) => {
    const baseUrl = 'https://dc.damio.in/';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${baseUrl}${pdfData}`;  // Replace with your PDF path
        link.download = 'file.pdf';
        link.click();
    };

    return (
        <div>
            {/* Modal */}
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>
                    PDF Viewer
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers={true} style={{ height: '500px' }}>
                    <iframe
                        src={`${baseUrl}${pdfData}`}  // Replace with the path to the PDF
                        title="PDF"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PictureAsPdfIcon />}
                        onClick={handleDownload}
                    >
                        Download PDF
                    </Button>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DownloadPDF;