interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null
    return (
        <div className="absolute text-white font-montserrat text-center bg-black bg-opacity-60 z-10 w-[300px] mx-[-14px] my-[100px] shadow-xl rounded-3xl border-white border-[1px]">
            <div className="modal-content">
                <p className="px-4 py-4">
                    Are you sure you want to delete this item?
                </p>
                <div className="pb-6">
                    <button
                        className="px-4 hover:scale-110"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button className="px-4  hover:scale-110" onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
