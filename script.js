async function enviarEmail() {
  const emailTexto = document.getElementById("emailInput").value.trim();
  const fileInput = document.getElementById("fileInput");
  const respostaDiv = document.getElementById("respostaOutput");

  if (!emailTexto && fileInput.files.length === 0) {
    respostaDiv.innerHTML =
      "<em>Por favor, envie um texto, um arquivo ou ambos.</em>";
    return;
  }

  respostaDiv.innerHTML = "<em>⏳ Processando...</em>";

  try {
    const formData = new FormData();
    if (emailTexto) formData.append("email", emailTexto);
    if (fileInput.files.length > 0) formData.append("file", fileInput.files[0]);

    const response = await fetch(
      "https://classificador-de-emails-back.onrender.com/processar",
      {
        method: "POST",
        body: formData,
      }
    );

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error("Resposta do servidor não é JSON válido.");
    }

    if (response.ok) {
      respostaDiv.innerHTML = `
        🗂️ <strong>Categoria:</strong> ${data.categoria}<br><br>
        💬 <strong>Resposta Sugerida:</strong><br>${data.resposta.replace(
          /\n/g,
          "<br>"
        )}
      `;
    } else {
      respostaDiv.innerHTML = `❌ Erro: ${
        data.resposta || data.detail || "Algo deu errado"
      }`;
    }
  } catch (err) {
    console.error("Erro ao enviar:", err);
    respostaDiv.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}

document.getElementById("fileInput").addEventListener("change", function () {
  const fileName =
    this.files.length > 0 ? this.files[0].name : "Nenhum arquivo escolhido";
  document.getElementById("fileName").textContent = fileName;
});

function abrirModal() {
  document.getElementById("infoModal").style.display = "flex";
  document.body.classList.add("modal-open");
}

function fecharModal(event) {
  const modal = document.getElementById("infoModal");
  if (
    !event ||
    event.target === modal ||
    event.target.classList.contains("close")
  ) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}
