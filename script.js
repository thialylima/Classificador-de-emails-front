async function enviarEmail() {
  const emailTexto = document.getElementById('emailInput').value;
  const respostaDiv = document.getElementById('respostaOutput');

  if (!emailTexto.trim()) {
    respostaDiv.innerHTML = "<em>Por favor, cole o texto do e-mail para processar.</em>";
    return;
  }

  respostaDiv.innerHTML = "<em>⏳ Processando...</em>";

  try {
    const response = await fetch("https://classificador-de-emails-back.onrender.com/processar-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailTexto })
    });

    const data = await response.json();

    respostaDiv.innerHTML = `
      🗂️ <strong>Categoria:</strong> ${data.categoria}<br><br>
      💬 <strong>Resposta Sugerida:</strong><br>${data.resposta.replace(/\n/g, '<br>')}
    `;
  } catch (err) {
    respostaDiv.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}
