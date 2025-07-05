async function enviarEmail() {
  const emailTexto = document.getElementById("emailInput").value.trim();
  const fileInput = document.getElementById("fileInput");
  const respostaDiv = document.getElementById("respostaOutput");

  if (!emailTexto && fileInput.files.length === 0) {
    respostaDiv.innerHTML = "<em>Por favor, envie um texto, um arquivo ou ambos.</em>";
    return;
  }

  respostaDiv.innerHTML = "<em>⏳ Processando...</em>";

  try {
    const formData = new FormData();
    if (emailTexto) formData.append("email", emailTexto);
    if (fileInput.files.length > 0) formData.append("file", fileInput.files[0]);

    const response = await fetch("https://classificador-de-emails-back.onrender.com/processar", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      respostaDiv.innerHTML = `
        🗂️ <strong>Categoria:</strong> ${data.categoria}<br><br>
        💬 <strong>Resposta Sugerida:</strong><br>${data.resposta.replace(/\n/g, "<br>")}
      `;
    } else {
      respostaDiv.innerHTML = `❌ Erro: ${data.resposta || data.detail || "Algo deu errado"}`;
    }
  } catch (err) {
    respostaDiv.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}
