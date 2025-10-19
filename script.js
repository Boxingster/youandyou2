// Конфетти эффект
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
    }
    
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 2;
        this.angle += 0.1;
        
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

for (let i = 0; i < 150; i++) {
    confettiPieces.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPieces.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Музыка
const musicBtn = document.getElementById('music-btn');
const birthdayMusic = document.getElementById('birthday-music');
let isPlaying = false;

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        birthdayMusic.pause();
        this.textContent = '🎵 Включить музыку';
        isPlaying = false;
    } else {
        birthdayMusic.play().catch(e => {
            console.log('Автовоспроизведение заблокировано:', e);
            alert('Нажми "Включить музыку" еще раз для воспроизведения!');
        });
        this.textContent = '🔇 Выключить музыку';
        isPlaying = true;
    }
});

// Попытка автоматического включения музыки
window.addEventListener('click', function() {
    if (!isPlaying) {
        birthdayMusic.play().then(() => {
            musicBtn.textContent = '🔇 Выключить музыку';
            isPlaying = true;
        }).catch(e => {
            console.log('Автовоспроизведение заблокировано');
        });
    }
}, { once: true });

// Модальное окно для фотографий
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    caption.innerHTML = img.alt;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Закрытие модального окна при клике вне изображения
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Переворот карточки
function flipCard() {
    const secretCard = document.querySelector('.secret-card');
    secretCard.classList.toggle('flipped');
}

// Волшебная кнопка
const magicBtn = document.getElementById('magic-btn');
const effectArea = document.getElementById('effect-area');

magicBtn.addEventListener('click', function() {
    this.textContent = 'Ура! Желания исполняются! ✨';
    this.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
    
    const emojis = ['💰', '💵', '🍕', '🎂', '🍔', '🍟', '🍦', '🍫'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.fontSize = Math.random() * 30 + 20 + 'px';
            emoji.style.animation = `floatEmoji ${Math.random() * 2 + 2}s ease-in-out forwards`;
            
            effectArea.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 100);
    }
});

// Плавная прокрутка
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const sections = document.querySelectorAll('.section');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
    });
    
    if (e.deltaY > 0 && currentSection.nextElementSibling) {
        currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    } else if (e.deltaY < 0 && currentSection.previousElementSibling) {
        currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
});

// Адаптация размера canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Виртуальный торт
function cutCake() {
    const cake = document.querySelector('.cake');
    const cakeCut = document.getElementById('cake-cut');
    
    // Скрываем целый торт и показываем разрезанный
    cake.style.display = 'none';
    cakeCut.style.display = 'block';
    
    // Запускаем анимацию разрезания
    setTimeout(() => {
        cakeCut.classList.add('cut-animation');
    }, 100);
    
    // Запускаем конфетти
    createCakeConfetti();
    
    // Воспроизводим звук разрезания (если есть)
    playCutSound();
    
    // Меняем курсор обратно на обычный
    document.querySelector('.cake-container').style.cursor = 'default';
}

function createCakeConfetti() {
    const container = document.querySelector('.cake-container');
    const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🥳'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'cake-confetti';
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.left = Math.random() * 300 + 'px';
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            
            container.appendChild(confetti);
            
            // Удаляем конфетти после анимации
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function playCutSound() {
    // Можно добавить звук разрезания, если хочешь
    // const audio = new Audio('cut-sound.mp3');
    // audio.play().catch(e => console.log('Звук не воспроизведён:', e));
}