import { MdClose } from "react-icons/md"
import { useClickOutSideToClose } from "../hooks/use-close-click-outside"

const Modal = ({open, onClose, children}) => {

    const refArea = useClickOutSideToClose(() => {
        onClose()
    })

    return (
        <div className={`fixed inset-0 z-30 flex justify-center w-full h-full
         transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
        >
            <div className={`bg-white rounded-xl shadow p-6
            transition-all relative h-fit mt-28
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}  ref={refArea}>
                <button className="absolute right-3 top-3" onClick={onClose}>
                    <MdClose className="w-[1rem] h-[1rem] text-[#637381]"/>
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal