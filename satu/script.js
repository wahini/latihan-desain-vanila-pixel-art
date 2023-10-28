// script.js 

let jumlahKotak = 0;
let warnaKotak = [];

document.addEventListener("DOMContentLoaded", function () {
    const pixelContainer = document.getElementById('pixelContainer');
    pixelContainer.style.width = '100%';
    pixelContainer.style.maxWidth = '1000px';
    generateCanvas();
});

window.addEventListener('resize', generateCanvas);

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    jumlahKotak = document.getElementById('jumlahKotak').value;
    generateCanvas();
});

const paletWarna = {
    TWOBITDEMICHROME: ['#211e20', '#555568', '#a0a08b', '#e9efec'],
    SLSO8: ['#0d2b45', '#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3', '#ffecd6'],
    RESURRECT64: ['#2e222f', '#3e3546', '#625565', '#966c6c', '#ab947a', '#694f62', '#7f708a', '#9babb2', '#c7dcd0', '#ffffff', '#6e2727', '#b33831', '#ea4f36', '#f57d4a', '#ae2334', '#e83b3b', '#fb6b1d', '#f79617', '#f9c22b', '#7a3045', '#9e4539', '#cd683d', '#e6904e', '#fbb954', '#4c3e24', '#676633', '#a2a947', '#d5e04b', '#fbff86', '#165a4c', '#239063', '#1ebc73', '#91db69', '#cddf6c', '#313638', '#374e4a', '#547e64', '#92a984', '#b2ba90', '#0b5e65', '#0b8a8f', '#0eaf9b', '#30e1b9', '#8ff8e2', '#323353', '#484a77', '#4d65b4', '#4d9be6', '#8fd3ff', '#45293f', '#6b3e75', '#905ea9', '#a884f3', '#eaaded', '#753c54', '#a24b6f', '#cf657f', '#ed8099', '#831c5d', '#c32454', '#f04f78', '#f68181', '#fca790', '#fdcbb0']
};

function generateCanvas() {
    const pixelContainer = document.getElementById('pixelContainer');
    const paletTerpilih = document.getElementById('paletWarna').value;
    const warna = paletWarna[paletTerpilih];
    const ukuranKotak = pixelContainer.offsetWidth / jumlahKotak;

    pixelContainer.innerHTML = '';

    if (jumlahKotak > 0 && warnaKotak.length === 0) {
        for (let i = 0; i < jumlahKotak * jumlahKotak; i++) {
            warnaKotak.push(warna[Math.floor(Math.random() * warna.length)]);
        }
    }

    for (let i = 0; i < jumlahKotak; i++) {
        for (let j = 0; j < jumlahKotak; j++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.width = `${ukuranKotak}px`;
            box.style.height = `${ukuranKotak}px`;
            box.style.backgroundColor = warnaKotak[i * jumlahKotak + j];
            box.style.border = '1px solid rgba(255, 255, 255, 0.5)';
            const colorPopup = document.createElement('div');
            colorPopup.className = 'color-popup';
            colorPopup.textContent = warnaKotak[i * jumlahKotak + j];
            box.appendChild(colorPopup);
            pixelContainer.appendChild(box);
        }
    }
}

document.getElementById('downloadBtn').addEventListener('click', function () {
    const pixelContainer = document.getElementById('pixelContainer');
    const paletTerpilih = document.getElementById('paletWarna').value;
    const link = document.createElement('a');
    link.download = `${jumlahKotak}x${jumlahKotak}-${paletTerpilih}.png`;
    link.href = pixelContainer.toDataURL();
    link.click();
});
