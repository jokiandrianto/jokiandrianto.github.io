
const gambar_produk = document.querySelector('.gambar_produk');
const gambar_besar = document.querySelector('.gambar_besar');
const gambar_kecil = document.querySelectorAll('.gambar_kecil');

gambar_produk.addEventListener('click', function (e) {
    // cek apakah yang diklik adalah gambar_kecil
    if (e.target.className == 'gambar_kecil') {
        gambar_besar.src = e.target.src;
        gambar_besar.classList.add('fade');
        setTimeout(function () {
            gambar_besar.classList.remove('fade');
        }, 500);

        gambar_kecil.forEach(function (gambar_kecil2) {
            if (gambar_kecil2.classList.contains('active_gambar')) {
                gambar_kecil2.classList.remove('active_gambar');
            }

        });

        e.target.classList.add('active_gambar');
    };
});