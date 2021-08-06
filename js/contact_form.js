const scriptURL = 'https://script.google.com/macros/s/AKfycbwTJ78WB2gx04JSk9BHzwKnbRw6cSIEW9-mlG2788V2gE6V1MKOeF-IuwiDxmtG73Y1Fg/exec'
const form = document.forms['resume-joky-contact-form']
// variabel namanya btnkirim , jquey tolong cariin ada ga yang kelas namanya .btn-kirim
const btnKirim = document.querySelector('.btn-kirim');
// variabel namanya btnloading , jquey tolong cariin ada ga yang kelas namanya .btn-loading
const btnLoading = document.querySelector('.btn-loading');
// 
const myAlert = document.querySelector('.my-alert');
const myAlertt = document.querySelector('.my-alertt');


form.addEventListener('submit', e => {
    e.preventDefault()
    // ketika tombol submit diklik
    // tampilkan tombol loading ,hilangkan tombol kirimpesan
    // javascript carikan saya btnloading liat didalam classlist nya ada ga kelas namanya d-none , kalau ada hilangkan
    btnLoading.classList.toggle('d-none');
    // javascript carikan saya btnkirim liat didalam classlist nya ada ga kelas namanya d-none , kalau ga ada tambahkan
    btnKirim.classList.toggle('d-none');

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            // tampilkan tombol loading ,hilangkan tombol kirimpesan
            // javascript carikan saya btnloading liat didalam classlist nya ada ga kelas namanya d-none , kalau ada hilangkan
            btnLoading.classList.toggle('d-none');
            // javascript carikan saya btnkirim liat didalam classlist nya ada ga kelas namanya d-none , kalau ga ada tambahkan
            btnKirim.classList.toggle('d-none');
            // tampilkan alert
            // sebelumnya di class my-alert ada d-none
            // kalau berhasil hilangkan kelas d-none
            myAlert.classList.toggle('d-none');
            // 
            myAlertt.classList.toggle('d-none');
            // reset formnya / hilangkan isi pesan yang di ampilan web
            form.reset();

            console.log('Success!', response)

        })
        .catch(error => console.error('Error!', error.message))
})