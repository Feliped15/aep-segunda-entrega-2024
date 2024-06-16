//login
function logar() {

    let login = document.getElementById("username").value;
    let senha = document.getElementById("password").value;

    if (login != "" || senha != "") {

        let msg = document.getElementById('respostaLogin');
        if (login === "adm" && senha === "12345") {
            msg.innerHTML = "Bem vindo, adm!";
            msg.className = "alert alert-success mt-3";
            msg.style.display = "";

            let token = "adm";

            localStorage.setItem("token", JSON.stringify(token));

            setTimeout(() => {
                window.location.href = "index.html";
            }, "1000");

        } else {

            msg.innerHTML = "Login ou senha incorretos";
            msg.className = "alert alert-danger mt-3";
            msg.style.display = "";
        }

    } else {
        document.getElementById('respostaLogin').innerHTML = "Preencha os campos";
    }

}