// Obtén la referencia al modal y a los botones
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var confirmarBtn = document.getElementById("confirmar-eliminar");
var cancelarBtn = document.getElementById("cancelar-eliminar");
var correoEliminar;
var idEliminar;

// Cuando el usuario haga clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Cuando el usuario haga clic en (x) o en "Cancelar", cierra el modal
span.onclick = function() {
  modal.style.display = "none";
};
cancelarBtn.onclick = function() {
  modal.style.display = "none";
};

// Cuando el usuario haga clic en "Confirmar", ejecuta la acción de deshabilitar el usuario
confirmarBtn.onclick = function() {
  deshabilitarUsuario(idEliminar);
};

// Función para abrir el modal y almacenar el correo y el id a eliminar
function abrirModal(correo, id) {
  correoEliminar = correo;
  idEliminar = id;
  document.getElementById("correoEliminar").innerText = correoEliminar;
  modal.style.display = "block";
}



function deshabilitarUsuario(idEliminar) {
  if (idEliminar) {
    // Get the CSRF token
    var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/deshabilitar_persona/' + idEliminar, {
      method: 'PUT',
      headers: {
        'X-CSRFToken': csrf_token
      }
    })
    .then(response => {
      if (response.ok) {
        console.log("Usuario deshabilitado correctamente");
        var filaEliminar = document.querySelector(`[data-id="${idEliminar}"]`).closest("tr");
        filaEliminar.remove();
        modal.style.display = "none";
      } else {
        response.json().then(data => {
          console.error("Error al deshabilitar al usuario:", data.error);
        });
      }
    })
    .catch(error => {
      console.error("Error al deshabilitar al usuario:", error);
    });
  } else {
    console.error("El id del usuario no está definido");
  }
}

var eliminarBtns = document.querySelectorAll('.eliminarBtn');
eliminarBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var correo = this.dataset.correo;
    var id = this.dataset.id;
    abrirModal(correo, id);
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const filtro = document.getElementById('filtro');
  filtro.addEventListener('keyup', function (e) {
      const valor = filtro.value.toLowerCase().trim();
      if (e.key === 'Enter') {
          window.location.search = '?filtro=' + valor;
      }
  });
});
