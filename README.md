# Mena-post1-U4

# Post-contenido — Unidad 4: JavaScript Básico
## Descripción
Repositorio del laboratorio de la Unidad 4 de Programación Web —
Séptimo Semestre. Contiene dos partes: tablero de tareas del equipo
con manipulación del DOM y eventos (parte-1-tablero-tareas/) y
formulario de registro de colaborador con validación manual y
Constraint Validation API (parte-2-formulario-colaborador/).
## Parte 1 — Tablero de tareas del equipo
Tablero de tareas en JavaScript puro que implementa creación,
avance de estado y eliminación (con un único listener delegado que
distingue acciones por data-action), filtrado combinado por estado
y prioridad, un switch para la apariencia por prioridad, y
estadísticas calculadas con reduce() y for...of. Ver
parte-1-tablero-tareas/.
## Parte 2 — Formulario de registro de colaborador
Formulario de registro con validación completa del lado del
cliente: campo de usuario validado con pattern, campo condicional
"equipo a cargo" que solo aplica al rol Líder, campo numérico de
horas validado con rangeUnderflow/rangeOverflow, checkbox de
términos validado por .checked, control del evento submit y un
indicador de fortaleza de contraseña. Ver
parte-2-formulario-colaborador/.
## Decisiones de diseño
### Parte 1 — Generador de ID
Se eligió la Estrategia A (closure/módulo) para encapsular el contador de IDs y evitar la contaminación del ámbito global, asegurando que el estado del identificador sea privado y seguro frente a modificaciones externas accidentales.
### Parte 1 — Actualización del DOM al avanzar estado
Se eligió la Estrategia A (actualización dirigida) para modificar únicamente el nodo afectado en el DOM, optimizando el rendimiento y evitando redibujar todo el tablero innecesariamente.
### Parte 2 — Validación de contraseña
Se eligió la Estrategia A (regex compuesta) porque permite evaluar todas las reglas de complejidad en una sola validación compacta y directa, integrándose de manera eficiente con las propiedades de la API de validación nativa.
### Parte 2 — Campo condicional "equipo a cargo"
Se eligió la Estrategia A (alternar required nativo) porque permite sincronizar el comportamiento condicional con la Constraint Validation API del navegador, delegando en las propiedades nativas (`validity.valueMissing`) la detección de obligatoriedad según el rol activo.
## Cómo visualizar el proyecto
1. Clonar el repositorio: `git clone [URL-del-repo]`
2. Abrir la carpeta en Visual Studio Code
3. Clic derecho en index.html (de cada parte) → "Open with Live Server"
## Capturas de pantalla
![Tablero de tareas](parte-1-tablero-tareas/img/captura-01.png)
![Formulario - validación de errores](parte-2-formulario-colaborador/img/captura-01.png)
![Formulario - registro exitoso](parte-2-formulario-colaborador/img/captura-02.png)