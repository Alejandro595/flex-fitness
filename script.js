// Datos simulados para entrenadores y progreso
const trainers = [
    { name: 'Entrenador de Boxeo', type: 'boxing', price: 30, availableTimes: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { name: 'Entrenador de Fitness', type: 'fitness', price: 25, availableTimes: ['9:00 AM', '11:00 AM', '3:00 PM'] },
];

let reservations = [];
let exercisesCompleted = 0;
let achievements = [];

// Función para cambiar entre pantallas
function goToScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Función para cargar los entrenadores disponibles
function loadTrainers() {
    const trainersList = document.getElementById('trainers-list');
    trainersList.innerHTML = ''; // Limpiar la lista anterior

    trainers.forEach(trainer => {
        const trainerItem = document.createElement('li');
        trainerItem.textContent = `${trainer.name} (${trainer.type}) - $${trainer.price}/hora. Horarios disponibles: ${trainer.availableTimes.join(', ')}`;
        trainersList.appendChild(trainerItem);
    });
}

// Función para confirmar la reserva de clase
function confirmReservation() {
    const trainerSelect = document.getElementById('trainer-select').value;
    const reservationTime = document.getElementById('reservation-time').value;

    if (!reservationTime) {
        alert('Por favor, selecciona una fecha y hora');
        return;
    }

    // Buscar el entrenador correspondiente
    const trainer = trainers.find(t => t.type === trainerSelect);
    if (trainer) {
        reservations.push({ trainer: trainer.name, time: reservationTime });
        alert(`Reserva confirmada con ${trainer.name} a las ${reservationTime}.`);
        goToScreen('home-screen');
    }
}

// Función para completar una tarea y aumentar el progreso
function completeTask() {
    exercisesCompleted++;
    document.getElementById('exercises-completed').textContent = exercisesCompleted;

    // Lógica para logros
    if (exercisesCompleted >= 10 && !achievements.includes('¡Logro alcanzado: 10 ejercicios completados!')) {
        achievements.push('¡Logro alcanzado: 10 ejercicios completados!');
    }

    if (exercisesCompleted >= 20 && !achievements.includes('¡Logro alcanzado: 20 ejercicios completados!')) {
        achievements.push('¡Logro alcanzado: 20 ejercicios completados!');
    }

    loadAchievements();
}

// Función para cargar los logros
function loadAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';

    achievements.forEach(achievement => {
        const achievementItem = document.createElement('li');
        achievementItem.textContent = achievement;
        achievementsList.appendChild(achievementItem);
    });
}

// Al cargar la página, mostrar la pantalla de inicio y cargar los entrenadores y progreso
window.onload = function() {
    goToScreen('home-screen');
    loadTrainers();  // Cargar los entrenadores en la pantalla correspondiente
    loadAchievements();  // Cargar los logros del usuario
};
