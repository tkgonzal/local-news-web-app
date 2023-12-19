import { useSnackbar } from "../contexts/SnackbarContext"
import { useEffect, useState } from "react";
import './Snackbar.css'

import ErrorIcon from '../../public/assets/snackbar/error-font-awesome.svg';
import WarningIcon from '../../public/assets/snackbar/warning-font-awesome.svg';
import InfoIcon from '../../public/assets/snackbar/info-font-awesome.svg';
import SuccessIcon from '../../public/assets/snackbar/success-font-awesome.svg';
import CloseIcon from '../../public/assets/snackbar/close-font-awesome.svg'

export default function Snackbar() {
    const { snackbar, setSnackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        if (snackbar) {
            setOpen(true)
            const timeout = setTimeout(() => {
                setOpen(false)
            }, 6000)

            return () => clearTimeout(timeout)
        }
    }, [snackbar])

    function onClose() {
        setOpen(false)
        setTimeout(() => {
            setSnackbar(null)
        }, 500)
    }

    if (snackbar == null) return null;
    
    function getIconSource(severity: string | undefined) {
        switch (severity) {
            case 'error':
                return ErrorIcon;
            case 'warning':
                return WarningIcon;
            case 'info':
                return InfoIcon;
            case 'success':
                return SuccessIcon;
            default:
                return InfoIcon;
        }
    }
    

    return (
        <div className={`snackbar ${snackbar?.severity || ''} ${open ? 'open' : ''}`}>
            <img src={getIconSource(snackbar?.severity)} alt={`${snackbar?.severity} icon`} className="icon" />
            <span className="message">{snackbar?.message}</span>
            <img
                src={CloseIcon}
                alt="Close icon"
                className="close-icon close-button"
                onClick={onClose}
            />

        </div>
    );
}