document.addEventListener("DOMContentLoaded", () => {
    let editingRow = null; //Variabel yang digunakan untuk melacak baris (<tr>) yang sedang diedit. Awalnya null (tidak ada baris yang diedit).

    const foodForm = document.getElementById('foodForm'); //Mengambil elemen form dengan id foodForm dari HTML.
    const menuList = document.getElementById('menuList'); //Mengambil elemen <tbody> di mana daftar menu akan ditampilkan.

    foodForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Kode untuk validasi, tambah, dan edit makanan

        const foodName = document.getElementById('foodName').value; //Mengambil nilai dari input nama makanan.
        const foodPrice = document.getElementById('foodPrice').value; //Mengambil nilai dari input harga makanan.

        // Validasi
        if (foodName.length < 6) {
            alert('Nama makanan harus lebih dari 5 karakter.');
            return;
        }

        if (isNaN(foodPrice) || foodPrice.trim() === "") {
            alert('Harga harus berupa angka.');
            return;
        }

        if (editingRow) {
            // Update baris yang sedang diedit
            editingRow.querySelector('td:nth-child(2)').textContent = foodName; //Jika ada baris yang sedang diedit (editingRow tidak null), maka baris tersebut di-update dengan nilai baru dari input nama dan harga makanan.
            editingRow.querySelector('td:nth-child(3)').textContent = Number(foodPrice).toLocaleString('id-ID'); //Format harga menggunakan Number(foodPrice).toLocaleString('id-ID') untuk format mata uang Indonesia.
            editingRow = null; // Reset setelah pengeditan
        } else {
            // Tambah item baru
            const rowCount = menuList.querySelectorAll('tr').length + 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td>${foodName}</td>
                <td>${Number(foodPrice).toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn btn-warning edit-btn">
                        <i class="bx bx-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-btn">
                        <i class="bx bx-trash"></i> Delete
                    </button>
                </td>
            `;
            menuList.appendChild(newRow);
        }

        // Reset form
        document.getElementById('foodName').value = '';
        document.getElementById('foodPrice').value = '';
    });

    // Delegasikan event listener untuk edit dan delete ke parent (menuList)
    menuList.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn') || event.target.closest('.edit-btn')) {
            const row = event.target.closest('tr');
            editingRow = row;

            document.getElementById('foodName').value = row.querySelector('td:nth-child(2)').textContent;
            document.getElementById('foodPrice').value = row.querySelector('td:nth-child(3)').textContent.replace(/\./g, '');
        }

        if (event.target.classList.contains('delete-btn') || event.target.closest('.delete-btn')) {
            const row = event.target.closest('tr');
            if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                row.remove();
            }
        }
    });
});