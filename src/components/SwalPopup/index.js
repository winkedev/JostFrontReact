import Swal from 'sweetalert2';

export const SwalPopup = ({ title, text, icon, confirmButtonText, cancelButtonText, isShowConfirmButton, isShowCancelButton, isAllowOutsideClick, onSucessEvent, onCancelEvent }) => {
    Swal.fire({
        title: { title } ?? "title",
        text: { text } ?? "content",
        icon: { icon } ?? "success",
        showCancelButton: { isShowCancelButton } ?? true,
        showConfirmButton: { isShowConfirmButton } ?? true,
        cancelButtonText: { cancelButtonText } ?? "Cancelar",
        confirmButtonText: { confirmButtonText } ?? "Confirmar",
        allowOutsideClick: { isAllowOutsideClick } ?? true
    }).then((r) => {
        if (r.isConfirmed) {
            onSucessEvent();
            Swal.fire('Saved!', '', 'sucess');
        }
        else {
            onCancelEvent();
        }
    });
}