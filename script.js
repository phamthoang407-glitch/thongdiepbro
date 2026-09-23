const messages = [
    "Cảm ơn bạn vì đã xuất hiện và làm cho những ngày bình thường trở nên đặc biệt hơn 💗",
    "Mỗi khi nghĩ đến bạn, mình lại có thêm một lý do để mỉm cười 😊",
    "Mong rằng chúng ta sẽ cùng nhau tạo thêm thật nhiều kỷ niệm đẹp ✨",
    "Dù hôm nay có mệt mỏi thế nào, hãy nhớ rằng luôn có mình quan tâm đến bạn 🌷",
    "Bạn là một trong những điều tuyệt vời nhất đã đến với cuộc sống của mình 💕",
    "Chỉ cần được ở cạnh bạn, một ngày bình thường cũng trở thành ngày đáng nhớ 🌸",
    "Gửi đến bạn một cái ôm thật ấm áp và thật nhiều yêu thương 🤗",
    "Hy vọng nụ cười sẽ luôn xuất hiện trên môi bạn mỗi ngày 🌹",
    "Mình trân trọng từng khoảnh khắc được đồng hành cùng bạn 💖",
    "Bạn không cần phải hoàn hảo, vì với mình bạn đã luôn rất đặc biệt rồi 💌",
    "Cảm ơn bạn đã luôn lắng nghe, chia sẻ và ở bên mình trong những lúc cần thiết 🥰",
    "Hãy luôn vui vẻ nhé, vì nụ cười của bạn chính là điều mình thích nhất 🌟"
];

const welcomeScreen = document.getElementById('welcomeScreen');
const letterScreen = document.getElementById('letterScreen');
const heartScreen = document.getElementById('heartScreen');
const startButton = document.getElementById('startButton');
const envelope = document.getElementById('envelope');
const heartList = document.getElementById('heartList');
const messageModal = document.getElementById('messageModal');
const randomMessage = document.getElementById('randomMessage');
const closeModal = document.getElementById('closeModal');
const receiveButton = document.getElementById('receiveButton');
const restartButton = document.getElementById('restartButton');

let previousMessageIndex = -1;

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(item => item.classList.remove('active'));
    screen.classList.add('active');
}

startButton.addEventListener('click', () => {
    showScreen(letterScreen);
});

envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    document.getElementById('letterHint').textContent = 'Những trái tim đang xuất hiện...';

    setTimeout(() => {
        createHearts();
        showScreen(heartScreen);
    }, 1500);
});

function createHearts() {
    heartList.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('button');
        heart.className = 'heart-button';
        heart.textContent = '♥';
        heart.setAttribute('aria-label', `Mở thông điệp số ${i + 1}`);
        heart.style.animationDelay = `${i * 0.09}s`;
        heart.addEventListener('click', showRandomMessage);
        heartList.appendChild(heart);
    }
}

function showRandomMessage() {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === previousMessageIndex && messages.length > 1);

    previousMessageIndex = newIndex;
    randomMessage.textContent = messages[newIndex];
    messageModal.classList.add('show');
    messageModal.setAttribute('aria-hidden', 'false');
}

function hideMessage() {
    messageModal.classList.remove('show');
    messageModal.setAttribute('aria-hidden', 'true');
}

closeModal.addEventListener('click', hideMessage);
receiveButton.addEventListener('click', hideMessage);

messageModal.addEventListener('click', event => {
    if (event.target === messageModal) hideMessage();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') hideMessage();
});

restartButton.addEventListener('click', () => {
    envelope.classList.remove('open');
    document.getElementById('letterHint').textContent = 'Chạm vào phong thư để mở';
    previousMessageIndex = -1;
    showScreen(welcomeScreen);
});

function createBackgroundHearts() {
    const background = document.getElementById('backgroundHearts');

    for (let i = 0; i < 24; i++) {
        const heart = document.createElement('span');
        heart.className = 'background-heart';
        heart.textContent = '♥';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${12 + Math.random() * 25}px`;
        heart.style.animationDuration = `${6 + Math.random() * 8}s`;
        heart.style.animationDelay = `${Math.random() * 8}s`;
        background.appendChild(heart);
    }
}

createBackgroundHearts();
