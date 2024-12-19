export default class Alert{
    constructor(title, text, type){
        this.title = title;
        this.text = text;
        this.type = type;
        this.showAlert();
    }

    showAlert(){
        Swal.fire({
            title: this.title,
            text: this.text,
            icon: this.type,
          }).then((result) => {
            if (result.isConfirmed) {
                if (this.type === "error") {
                    window.location.reload();
                }
            }
        });
    }
}