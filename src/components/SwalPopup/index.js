import Swal from 'sweetalert2';

export const swalMessagePopup = async (title, text, icon, confirmButtonText, confirmButtonColor, isAllowOutsideClick) => {
    return await Swal.fire({
        title: title ?? "title",
        text: text ?? "content",
        icon: icon ?? "success",
        showConfirmButton: true,
        confirmButtonColor: confirmButtonColor ?? "#18CE0F",
        confirmButtonText: confirmButtonText ?? "Confirmar",
        allowOutsideClick: isAllowOutsideClick ?? true,
    });
}

export const swalConfirmPopup = async (title, text, icon, confirmButtonText, confirmButtonColor, cancelButtonText, isAllowOutsideClick, html, isShowLoadingOnConfirm, preConfirmEvent) => {
    return await Swal.fire({
        title: title ?? "title",
        text: text ?? "content",
        icon: icon ?? "success",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: cancelButtonText ?? "Cancelar",
        confirmButtonText: confirmButtonText ?? "Confirmar",
        confirmButtonColor: confirmButtonColor ?? "#18CE0F",
        allowOutsideClick: isAllowOutsideClick ?? true,
        html: html ?? "",
        showLoaderOnConfirm: isShowLoadingOnConfirm ?? false,
        preConfirm: preConfirmEvent ?? null
    });
}