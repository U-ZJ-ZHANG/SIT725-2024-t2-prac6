async function registerUser(userData) {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.text();
}

async function loginUser(userData) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.text();
}

function updateMessageView(message) {
    if (typeof document !== 'undefined') {
        document.getElementById('message').innerText = message;
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        const createAccountForm = document.getElementById('createAccountForm');
        const loginForm = document.getElementById('loginForm');

        if (createAccountForm) {
            createAccountForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                const userData = {
                    username: document.getElementById('username').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                };
                const message = await registerUser(userData);
                updateMessageView(message);
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                const userData = {
                    username: document.getElementById('loginUsername').value,
                    password: document.getElementById('loginPassword').value
                };
                const message = await loginUser(userData);
                updateMessageView(message);
            });
        }

        const canvas = document.getElementById('drawingCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let drawing = false;

            function clearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            canvas.addEventListener('mousedown', () => {
                drawing = true;
            });

            canvas.addEventListener('mouseup', () => {
                drawing = false;
                ctx.beginPath();
            });

            canvas.addEventListener('mousemove', (event) => {
                if (!drawing) return;

                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000000';

                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            });

            document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

            clearCanvas();
        }
    });
}

export { registerUser, loginUser, updateMessageView };