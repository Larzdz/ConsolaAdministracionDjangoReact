## 🚀 Consola de Administración con Django y React

<p align="center">
  <img src="https://res.cloudinary.com/dry8bdxce/image/upload/v1748923726/login_wm02hu.png" width="45%" alt="Captura 1" />
</p>
<p align="center">
  <em>Captura de pantalla Login</em>
</p>
<p align="center">
  <img src="https://res.cloudinary.com/dry8bdxce/image/upload/v1748923726/DashAdmin_belnud.png" width="45%" alt="Captura 2" />
</p>
<p align="center">
  <em>Captura de pantalla Panel de administrador</em>
</p>
<p align="center">
    <img src="https://res.cloudinary.com/dry8bdxce/image/upload/v1748923726/DashUser_ogjbbu.png" width="45%" alt="Captura 3" />
</p>
<p align="center">
  <em>Captura de pantalla Panel de Usuario</em>
</p>

---
## 📝 Descripción
Este proyecto consiste en una aplicación web que combina Django en el backend y React en el frontend para ofrecer una consola de administración interactiva. El sistema permite gestionar usuarios, registrar clics, medir tiempos de sesión y visualizar estadísticas desde un panel de control. Los usuarios pueden iniciar sesión como administradores o como usuarios regulares. La aplicación también incluye una landing page exclusiva para usuarios normales, con elementos interactivos y funcionalidad de cierre de sesión. Desde el panel de administración, es posible visualizar qué usuario ha iniciado sesión, la duración de su sesión y su actividad mediante clics.

---

## 🗂️ Tecnologías Utilizadas
- **Frontend:** React, Axios
- **Backend:** Django, Django REST Framework
- **Base de datos:** SQLite (por defecto, pero puedes usar PostgreSQL o MySQL)

---

## 📥 Instalación

1️⃣ Clonar el Repositorio

- git clone https://github.com/larz13/ConsolaAdministracionDjangoReact.git
- cd  PruebaPanzofi

2️⃣ Configuración del Backend (Django)

- cd backend
- python -m venv venv
- source venv/bin/activate  # En Windows usa: venv\Scripts\activate 
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py createsuperuser  # Para crear el usuario admin
- python manage.py runserver

3️⃣ Configuración del Frontend (React)

- cd frontend
- npm install
- npm run dev

🚀 Uso de la Aplicación
Iniciar sesión:

Ingresa como usuario regular o administrador usando las credenciales creadas.

### Panel de Administración:
Verás quién inició sesión, cuánto tiempo estuvo conectado y los clics en los botones.
tambien cuneta con un boton de cerrar sesion

### Landing Page para Usuarios Regulares:
Incluye un logo, descripción, dos botones para interactuar y un botón de "Cerrar Sesión".

🔐 Credenciales por Defecto (para pruebas)
- usuario admin: Larz ---> pass: admin123!
- usuario normal: paola  ---> pass: pao141612
- usuario generico: user + numero(1 al 34) ---> pass generica: Password123!

📊 Funcionalidades Clave
- Inicio de sesión seguro con JWT.
- Registro de clics en botones.
- Seguimiento del tiempo de sesión acumulativo.
- Panel de administración con estadísticas de usuarios.

⚙️ Endpoints API
- POST /api/token/ - Autenticación de usuario  
- GET /api/users/me/ - Obtener usuario autenticado
- POST /api/users/login/ - Registrar inicio de sesión
- POST /api/users/logout/ - Registrar cierre de sesión
- POST /api/button-clicks/ - Registrar clics en botones
- GET /api/session-logs/ - Ver logs de sesiones
