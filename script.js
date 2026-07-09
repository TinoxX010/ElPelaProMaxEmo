/* ============================================
   SCRIPT PRINCIPAL - Landing "Leyenda"
   Todo en JS puro, sin librerías.
============================================ */

/* --------- Animar barras de estadísticas ---------
   Cuando la sección de stats aparece en pantalla,
   llena cada barra según el valor data-valor="XX". */
function animarStats(){
    const barras = document.querySelectorAll('.fill');
    barras.forEach(b => {
        const valor = b.getAttribute('data-valor');
        b.style.width = valor + '%';
    });
}

/* Observador simple para disparar animación al hacer scroll */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting){
            animarStats();
            observer.disconnect(); // solo una vez
        }
    });
},{threshold:.3});

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelector('.stats');
    if(stats) observer.observe(stats);
});

/* --------- Cuestionario de compatibilidad ---------
   Cambia de pregunta al hacer clic en una opción. */
let preguntaActual = 0;
function siguientePregunta(){
    const preguntas = document.querySelectorAll('.pregunta');
    preguntas[preguntaActual].classList.remove('activa');
    preguntaActual++;
    if(preguntaActual < preguntas.length){
        preguntas[preguntaActual].classList.add('activa');
        // Si es la pregunta final (resultado), lanzar confeti
        if(preguntas[preguntaActual].classList.contains('resultado')){
            lanzarConfeti();
        }
    }
}

/* --------- Modal de contacto --------- */
function abrirModal(){
    document.getElementById('modal').classList.add('activo');
}
function cerrarModal(){
    document.getElementById('modal').classList.remove('activo');
}
// Cerrar modal al hacer clic fuera de la caja
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if(e.target === modal) cerrarModal();
});

/* --------- Modo oscuro / claro --------- */
const btnTema = document.getElementById('toggleTema');
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('claro');
    btnTema.textContent = document.body.classList.contains('claro') ? '☀️' : '🌙';
});

/* --------- Confeti simple en JS puro ---------
   Crea divs coloridos que caen y se eliminan solos. */
function lanzarConfeti(){
    const colores = ['#8a2be2','#ff3d3d','#00e5ff','#ffffff'];
    for(let i=0;i<60;i++){
        const c = document.createElement('div');
        c.className = 'confeti';
        c.style.left = Math.random()*100 + 'vw';
        c.style.background = colores[Math.floor(Math.random()*colores.length)];
        c.style.animationDuration = (2 + Math.random()*2) + 's';
        c.style.transform = 'rotate(' + Math.random()*360 + 'deg)';
        document.body.appendChild(c);
        // limpiar después de la animación
        setTimeout(() => c.remove(), 4000);
    }
}

/* --------- Scroll suave para enlaces del header --------- */
document.querySelectorAll('.header nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth'});
        }
    });
});