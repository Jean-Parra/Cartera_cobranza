// Variable global para saber si se desbloqueó el audio
let audioUnlocked = false;

// Escucha el primer clic del usuario para desbloquear el audio de forma silenciosa
document.addEventListener('click', function unlockAudio() {
  const dummyAudio = new Audio('/static/sounds/Campanita.mp3');
  dummyAudio.volume = 0; // Reproduce el audio de forma silenciosa
  dummyAudio.play().then(() => {
    audioUnlocked = true;
    // Pausar y resetear para no reproducir nada
    dummyAudio.pause();
    dummyAudio.currentTime = 0;
    console.log("Audio desbloqueado silenciosamente");
  }).catch(err => {
    console.error("Error al desbloquear audio:", err);
  });
}, { once: true });

// Conexión al servidor Socket.IO
const socket = io();

// Se asume que el administrador tiene ID 1 (puedes parametrizarlo según la sesión)
const currentUserId = "1";
socket.emit('join', currentUserId);

// Función para mostrar toasts en la esquina inferior derecha
function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  
  // Forzar reflow para activar la transición
  window.getComputedStyle(toast).opacity;
  toast.classList.add('show');
  
  setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
          container.removeChild(toast);
      }, 500);
  }, duration);
}

// Escuchar evento de notificación
socket.on('notification', (data) => {
  // Actualiza el contador de notificaciones en la barra
  const countElem = document.getElementById('notif-count');
  let count = parseInt(countElem.textContent);
  countElem.textContent = count + 1;

  // Mostrar el toast
  showToast(data.message);

  // Intentar reproducir el sonido si el usuario ya interactuó
  if (audioUnlocked) {
    const audio = new Audio('/static/sounds/Campanita.mp3');
    audio.play().catch(err => console.error("Error reproduciendo sonido:", err));
  } else {
    console.log("El audio no está desbloqueado; requiere interacción del usuario.");
  }
});

// Al cargar la página, obtén el número de notificaciones pendientes
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/notificaciones_pendientes')
    .then(response => response.json())
    .then(data => {
      const countElem = document.getElementById('notif-count');
      countElem.textContent = data.pending_count;
    })
    .catch(err => console.error("Error al obtener notificaciones:", err));
});
