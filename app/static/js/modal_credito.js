// Obtén la referencia al modal y a los botones
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var confirmarBtn = document.getElementById("confirmar-eliminar");
var cancelarBtn = document.getElementById("cancelar-eliminar");
var nombreEliminar;
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
  deshabilitarCredito(idEliminar);
};

// Función para abrir el modal y almacenar el correo y el id a eliminar
function abrirModal(correo, id) {
  nombreEliminar = correo;
  idEliminar = id;
  document.getElementById("nombreEliminar").innerText = nombreEliminar;
  modal.style.display = "block";
}



function deshabilitarCredito(idEliminar) {
  if (idEliminar) {
    // Get the CSRF token
    var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/deshabilitar_credito/' + idEliminar, {
      method: 'PUT',
      headers: {
        'X-CSRFToken': csrf_token
      }
    })
    .then(response => {
      if (response.ok) {
        console.log("Credito deshabilitado correctamente");
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
  const errorModal = document.getElementById('errorModal');

    // Si el modal de error está presente en la página, se muestra automáticamente
    if (errorModal) {
        $(errorModal).modal('show');  // Si estás usando Bootstrap
    }
});
