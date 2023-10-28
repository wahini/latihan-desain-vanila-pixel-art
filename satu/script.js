// script.js 

let imageData = null;
let jumlahKotak = 0;

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth;
    if (imageData) {
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }
});

window.addEventListener('resize', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (jumlahKotak > 0) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.putImageData(imageData, 0, 0);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;
    }
});

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    jumlahKotak = document.getElementById('jumlahKotak').value;
    generateCanvas(jumlahKotak);
});

const paletWarna = {
    TWOBITDEMICHROME: ['#211e20', '#555568', '#a0a08b', '#e9efec'],
    SLSO8: ['#0d2b45', '#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3', '#ffecd6'],
    RESURRECT64: ['#2e222f', '#3e3546', '#625565', '#966c6c', '#ab947a', '#694f62', '#7f708a', '#9babb2', '#c7dcd0', '#ffffff', '#6e2727', '#b33831', '#ea4f36', '#f57d4a', '#ae2334', '#e83b3b', '#fb6b1d', '#f79617', '#f9c22b', '#7a3045', '#9e4539', '#cd683d', '#e6904e', '#fbb954', '#4c3e24', '#676633', '#a2a947', '#d5e04b', '#fbff86', '#165a4c', '#239063', '#1ebc73', '#91db69', '#cddf6c', '#313638', '#374e4a', '#547e64', '#92a984', '#b2ba90', '#0b5e65', '#0b8a8f', '#0eaf9b', '#30e1b9', '#8ff8e2', '#323353', '#484a77', '#4d65b4', '#4d9be6', '#8fd3ff', '#45293f', '#6b3e75', '#905ea9', '#a884f3', '#eaaded', '#753c54', '#a24b6f', '#cf657f', '#ed8099', '#831c5d', '#c32454', '#f04f78', '#f68181', '#fca790', '#fdcbb0']
};

function generateCanvas(jumlah) {
    jumlahKotak = jumlah;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const ukuranKotak = canvas.width / jumlahKotak;
    const paletTerpilih = document.getElementById('paletWarna').value;
    const warna = paletWarna[paletTerpilih];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < jumlahKotak; i++) {
        for (let j = 0; j < jumlahKotak; j++) {
            const warnaTerpilih = warna[Math.floor(Math.random() * warna.length)];
            ctx.fillStyle = warnaTerpilih;
            ctx.fillRect(i * ukuranKotak, j * ukuranKotak, ukuranKotak, ukuranKotak);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.strokeRect(i * ukuranKotak, j * ukuranKotak, ukuranKotak, ukuranKotak);
        }
    }
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.getElementById('canvas');
    const paletTerpilih = document.getElementById('paletWarna').value;
    const link = document.createElement('a');
    link.download = `${jumlahKotak}x${jumlahKotak}-${paletTerpilih}.png`;
    link.href = canvas.toDataURL();
    link.click();
});
