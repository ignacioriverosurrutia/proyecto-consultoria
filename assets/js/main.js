// Función para obtener los servicios
async function fetchServices() {
  try {
    const response = await fetch('https://ciisa.coningenio.cl/v1/services/', {
      headers: {
        'Authorization': 'Bearer CIISA'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los servicios');
    }
    
    const data = await response.json();
    displayServices(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para mostrar los servicios en el DOM
function displayServices(services) {
  const container = document.getElementById('featured-services-container');
  container.innerHTML = ''; // Limpiar contenido previo

  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('service-card');
    serviceCard.innerHTML = `
      <div class="service-card__icon"><i class="${service.icon}"></i></div>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__description">${service.description}</p>
    `;
    container.appendChild(serviceCard);
  });
}

// Llamar a la función para obtener los servicios al cargar la página
document.addEventListener('DOMContentLoaded', fetchServices);

// Toggle para el tema día/noche
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Aplicar el tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Validación del formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;
  
  // Validaciones
  if (name.trim() === '') {
    showError('name', 'El nombre es obligatorio');
    return;
  }
  
  if (service === '') {
    showError('service', 'Debes seleccionar un servicio');
    return;
  }
  
  if (message.trim() === '') {
    showError('message', 'El mensaje es obligatorio');
    return;
  }
  
  // Si todo es válido, mostrar en consola
  console.log('Formulario enviado:');
  console.log('Nombre:', name);
  console.log('Servicio:', service);
  console.log('Mensaje:', message);
  
  // Resetear formulario
  contactForm.reset();
  showSuccess('Formulario enviado correctamente');
});

function showError(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function showSuccess(message) {
  const successMessage = document.getElementById('form-success');
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}

