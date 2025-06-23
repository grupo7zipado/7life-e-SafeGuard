import "./styles.css"
const Modal = ({ dialog, conteudo})=>{
    return(
        <dialog 
            className="dialogModal"
            id={dialog}
        >
            {/* Form a ser aberto */}
            {conteudo}
        </dialog>
    )
}
export default Modal;