const Modal = ({open, onClose, children}) => {
  
    return (
        <div onClick={onClose} 
            className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${open ? "visible bg-black/20" : "hidden"}`
        }>
.
        </div>
    )
}

export default Modal