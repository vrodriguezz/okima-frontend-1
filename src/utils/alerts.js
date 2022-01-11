import Swal from "sweetalert2";

class alerts {
  //ICONS: success - error - warning - info - question
  static handleAlert = (title, text, buttonText, icon, action) => {
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: buttonText,
      icon: icon,
      customClass: {
        title: "title-swal",
        content: "text-swal",
        confirmButton: "btn-confirm-swal",
      },
    }).then((result) => {
      if (result.value) {
        action();
      }
    });
  };
}

export default alerts;
