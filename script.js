// Agregar nueva fila de nota
document.getElementById('agregar-nota').addEventListener('click', () => {
  const contenedor = document.getElementById('notas-container');
  const fila = document.createElement('div');

  fila.innerHTML = `
    <label>
      Nota:
      <input type="number" class="nota" step="0.1" />
    </label>
    <label>
      Porcentaje %:
      <input type="number" class="porcentaje" step="0.1" />
    </label>
    <button class="eliminar-nota">Borrar</button>
    <br>
  `;

  contenedor.appendChild(fila);

  // Botón eliminar nota
  fila.querySelector('.eliminar-nota').addEventListener('click', () => {
    fila.remove();
  });
});

// Calcular nota necesaria
document.getElementById('calcular').addEventListener('click', () => {
  const notas = document.querySelectorAll('.nota');
  const porcentajes = document.querySelectorAll('.porcentaje');
  const notaDeseada = parseFloat(document.getElementById('nota-deseada').value);
  const notaMaxima = parseFloat(document.getElementById('nota-maxima').value);
  const resultadoTexto = document.getElementById('resultado-texto');

  if (isNaN(notaDeseada) || notaDeseada < 0) {
    resultadoTexto.textContent = 'Por favor, ingresa una nota final deseada válida.';
    return;
  }

  let sumaParcial = 0;
  let porcentajeUsado = 0;
  let datosValidos = true;

  for (let i = 0; i < notas.length; i++) {
    const nota = parseFloat(notas[i].value);
    const porcentaje = parseFloat(porcentajes[i].value);

    if (isNaN(nota) || isNaN(porcentaje)) {
      resultadoTexto.textContent = `La nota o el porcentaje en la fila ${i + 1} está incompleto.`;
      datosValidos = false;
      break;
    }

    if (nota < 0 || porcentaje < 0) {
      resultadoTexto.textContent = `No se permiten valores negativos (fila ${i + 1}).`;
      datosValidos = false;
      break;
    }

    sumaParcial += nota * (porcentaje / 100);
    porcentajeUsado += porcentaje;
  }

  if (!datosValidos) return;

  if (porcentajeUsado > 100) {
    resultadoTexto.textContent = 'El total de porcentajes supera el 100%. Verifica tus entradas.';
    return;
  }

  const porcentajeRestante = 100 - porcentajeUsado;

  if (porcentajeRestante <= 0) {
    // Mostrar nota definitiva
    const notaDefinitiva = sumaParcial;
    const redondeadaDefinitiva = Math.round(notaDefinitiva * 100) / 100;

    resultadoTexto.textContent =
      `Ya usaste el 100% del porcentaje. Tu nota definitiva es ${redondeadaDefinitiva}.`;
    return;
  }

  const notaNecesaria = (notaDeseada - sumaParcial) / (porcentajeRestante / 100);
  const redondeada = Math.round(notaNecesaria * 100) / 100;

  if (notaNecesaria > notaMaxima) {
    resultadoTexto.textContent = `Necesitas un ${redondeada}, lo cual supera la nota máxima posible (${notaMaxima}).`;
  } else if (notaNecesaria < 0) {
    resultadoTexto.textContent = '¡Ya alcanzaste tu meta! No necesitas sacar nada más.';
  } else {
    resultadoTexto.textContent = `Necesitas al menos un ${redondeada} en el porcentaje restante.`;
  }
});

// Mostrar/ocultar configuración
document.getElementById('toggle-config').addEventListener('click', () => {
  const config = document.getElementById('configuracion');
  if (config.style.display === 'none') {
    config.style.display = 'block';
  } else {
    config.style.display = 'none';
  }
});
