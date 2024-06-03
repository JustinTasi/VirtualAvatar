function triggerInput() {
    var inputField = document.getElementById('textInput');
    inputField.focus();
}

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    const recognition = new speechRecognition();
    recognition.lang = 'zh-TW';
    recognition.interimResults = true;

    const microphoneButton = document.getElementById('voiceButton');
    const outputDiv = document.getElementById('voiceInput');
    let recognizing = false;
    let finalTranscript;

    const startRecognition = () => {
        try {
            recognition.start();
            microphoneButton.style.backgroundColor = 'red';
            recognizing = true;
        } catch (error) {
            console.error('語音識別啟動失敗:', error);
        }
    };

    const stopRecognition = () => {
        recognition.stop();
        microphoneButton.style.backgroundColor = 'rgba(0, 217, 255, 0.6)';
        recognizing = false;
    };
    const voiceButton = document.getElementById('voiceButton');
    const voiceOnput = document.getElementById('voiceOnput');
    const actions = document.getElementById('actions');
    const stopButton = document.getElementById('stopButton');
    const dealWith = document.getElementById('dealWith');

    voiceButton.addEventListener('click', () => {
        voiceButton.classList.add('scale-up');
        voiceButton.style.display = 'none';
        setTimeout(() => {
            voiceButton.style.display = 'none';
            actions.style.display = 'flex';
            actions.classList.remove('hide');
            actions.classList.add('show');
            actions.classList.remove('scale-down');
            actions.classList.add('scale-up');
        }, 300);
    });

    stopButton.addEventListener('click', () => {
        actions.classList.remove('scale-up');
        actions.classList.add('scale-down');
        setTimeout(() => {
            actions.classList.remove('show');
            actions.classList.add('hide');
            dealWith.style.display = 'block';
            actions.classList.add('show');
        }, 300);
        stopRecognition();
        setTimeout(() => {
            const token = localStorage.getItem('token');
            fetch('https://os-django.leedong.work/medicament/api/openAi', {
                method: "POST",
                body: JSON.stringify({ transcript: outputDiv.textContent, token: token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    voiceOnput.innerHTML = data.response;
                    voiceButton.style.display = 'block';
                    voiceButton.style.display = 'flex';
                    dealWith.style.display = 'none';
                    actions.style.display = 'none';
                })
                .catch(error => {
                    alert('發生錯誤，請重新嘗試');
                    voiceButton.style.display = 'flex';
                    dealWith.style.display = 'none';
                    actions.style.display = 'none';
                });
        })
    });

    voiceButton.addEventListener('animationend', () => {
        voiceButton.classList.remove('scale-up');
    });

    stopButton.addEventListener('animationend', () => {
        stopButton.classList.remove('scale-down');
    });

    actions.addEventListener('animationend', () => {
        actions.classList.remove('scale-up');
    });

    microphoneButton.addEventListener('mousedown', () => {
        if (!recognizing) {
            outputDiv.textContent = '請開始說話...';
            finalTranscript = '';
            startRecognition();
        }
    });

    recognition.onresult = function (event) {
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + '\n';
            } else {
                interimTranscript += transcript;
            }
        }
        outputDiv.textContent = finalTranscript + interimTranscript;
    };

    recognition.onspeechend = function () {
        if (recognizing) {
            startRecognition();
        }
    };

    recognition.onend = function () {
        if (recognizing) {
            startRecognition();
        }
    };

    recognition.onerror = function (event) {
        if(event.error !== 'aborted'){
            alert('語音識別錯誤: ' + event.error);
        }
    };
} else {
    console.error('瀏覽器不支持語音識別');
}
