// Anasayfa
// Örnek ürünler
const products = [
    { name: 'Süt', category: 'Süt - Kahvaltılık', amount: '1', unit: 'Litre', expiry: '2024-12-12' },
    { name: 'Yoğurt', category: 'Süt - Kahvaltılık', amount: '500', unit: 'Gram', expiry: '2024-12-15' },
    { name: 'Domates', category: 'Meyve - Sebze', amount: '2', unit: 'Kilogram', expiry: '2024-12-20' },
    { name: 'Elma', category: 'Meyve - Sebze', amount: '1', unit: 'Kilogram', expiry: '2024-12-25' },
    { name: 'Çikolatalı Gofret', category: 'Atıştırmalık', amount: '3', unit: 'Adet', expiry: '2024-12-25' },
];

// Ürünleri tabloya ekleme
function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Mevcut ürünleri temizle

    // Filtrelenmiş ürünleri ekrana yazdır
    productsToDisplay.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.amount}</td>
            <td>${product.unit}</td>
            <td>${product.expiry}</td>
            <td>${product.status || ''}</td>
        `;
        tr.onclick = function () {
            // Satır tıklandığında formu doldur
            editProduct(product);
        };
        productList.appendChild(tr);
    });

    updateStatus(); // Durumları güncelle
}

// Durum sütununu güncelleyen fonksiyon
function updateStatus() {
    const productRows = document.querySelectorAll("#product-list tr");
    const today = new Date();

    productRows.forEach(row => {
        const expiryDateText = row.children[4].textContent; // "Son Kullanma Tarihi"
        const expiryDate = new Date(expiryDateText);
        const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

        const statusCell = row.children[5]; // "Durum" sütunu
        if (daysLeft > 0) {
            statusCell.textContent = `${daysLeft} Gün Kaldı`;
            statusCell.classList.remove("w3-text-red", "w3-text-orange");
            statusCell.classList.add(daysLeft <= 3 ? "w3-text-red" : "w3-text-orange");
        } else if (daysLeft === 0) {
            statusCell.textContent = "Bugün Tüketilmeli!";
            statusCell.classList.add("w3-text-red");
        } else {
            statusCell.textContent = "Tarihi geçmiş!";
            statusCell.classList.add("w3-text-red");
        }
    });
}

// Formu seçilen ürünle doldur
function editProduct(product) {
    document.getElementById("food-name").value = product.name;
    document.getElementById("food-categoryfilter").value = product.category;
    document.getElementById("food-amount").value = product.amount;
    document.getElementById("food-unitfilter").value = product.unit;
    document.getElementById("food-expiry").value = product.expiry;

    // Durumu formda göstermeyelim, çünkü durumu sadece satırlarda güncelleyeceğiz
    // window.currentProduct = product; // Ürünü sakla
    window.currentProduct = product; // Ürünü sakla
}

// Ürünü güncelle
function updateFood() {
    const updatedProduct = {
        name: document.getElementById("food-name").value,
        category: document.getElementById("food-categoryfilter").value,
        amount: document.getElementById("food-amount").value,
        unit: document.getElementById("food-unitfilter").value,
        expiry: document.getElementById("food-expiry").value,
        status: window.currentProduct.status // Durumu koru
    };

    // Ürünü güncelle
    const index = products.indexOf(window.currentProduct);
    products[index] = updatedProduct;

    // Tabloyu güncelle
    displayProducts(products);

    // Formu temizle
    resetForm();

    // Kullanıcıya bildirim
    alert("Ürün başarıyla güncellendi.");
}

// Ürünü sil
function deleteFood() {
    const index = products.indexOf(window.currentProduct);
    if (index > -1) {
        // Ürünü listeden sil
        products.splice(index, 1);
        displayProducts(products); // Tabloyu güncelle

        // Formu temizle
        resetForm();

        alert("Ürün başarıyla silindi.");
    }
}

// Formu sıfırla (temizle)
function resetForm() {
    document.getElementById("food-name").value = '';
    document.getElementById("food-categoryfilter").value = '';
    document.getElementById("food-amount").value = '';
    document.getElementById("food-unitfilter").value = '';
    document.getElementById("food-expiry").value = '';
}

// Sayfa yüklendiğinde ürünleri göster
window.onload = function () {
    displayProducts(products);
}



// Gıda Ekleme Sayfası

function addFood() {
    const name = document.getElementById("food-name").value.trim();
    const categoryfilter = document.getElementById("food-categoryfilter").value;
    const amount = document.getElementById("food-amount").value.trim();
    const unitfilter = document.getElementById("food-unitfilter").value;
    const expiry = document.getElementById("food-expiry").value;

    // Form doğrulama: Tüm alanların doldurulması gerekiyor
    if (!name || !categoryfilter || !amount || !unitfilter || !expiry) {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
    }

    // Gıda başarıyla eklendi mesajı
    alert("Gıda başarıyla eklendi!");
    document.getElementById("food-form").reset(); // Formu sıfırla
}

// Tarif Önerileri Sayfası
// Tarifler veri yapısı
const recipes = [
    {
        name: "Sütlü Ekmek",
        ingredients: ["Süt", "Un"],
        instructions: "Sütü ve unu karıştırarak hamur yapın, ardından pişirin.",
        cookingTime: "30 dakika",
        image: "sutlu-ekmek.jpg",
        details: "Sütlü ekmek tarifi detayları..."
    },
    {
        name: "Yoğurtlu Kek",
        ingredients: ["Yoğurt", "Un", "Yumurta"],
        instructions: "Un, yoğurt ve yumurtayı karıştırarak kek hamurunu hazırlayın ve pişirin.",
        cookingTime: "45 dakika",
        image: "yogurtlu-kek.jpg",
        details: "Yoğurtlu kek tarifi detayları..."
    },
    {
        name: "Bal ve Şekerli Kek",
        ingredients: ["Bal", "Şeker", "Un"],
        instructions: "Bal, şeker ve unu karıştırarak kek hamurunu hazırlayın ve pişirin.",
        cookingTime: "40 dakika",
        image: "bal-sekerli-kek.jpg",
        details: "Bal ve şekerli kek tarifi detayları..."
    }
];

// Tarifleri bulma fonksiyonu
function findRecipes() {
    const selectedIngredients = Array.from(document.querySelectorAll(".ingredient:checked"))
        .map(option => option.value);

    const matchedRecipes = recipes.filter(recipe =>
        selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );

    displayRecipes(matchedRecipes);
}

// Tarifleri listeleme fonksiyonu
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById("recipes");
    recipeContainer.innerHTML = ""; // Önceki tarifleri temizle

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("w3-card-4", "w3-margin");

            recipeDiv.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="w3-image" style="width:100%">
                <div class="w3-container">
                    <h3>${recipe.name}</h3>
                    <p><strong>Malzemeler:</strong> ${recipe.ingredients.join(", ")}</p>
                    <p><strong>Pişirme Süresi:</strong> ${recipe.cookingTime}</p>
                    <p><strong>Açıklama:</strong> ${recipe.instructions}</p>
                </div>
            `;
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = "<p>Seçilen malzemelere uygun tarif bulunamadı.</p>";
    }
}

// Tarif ekleme fonksiyonu
function addRecipe() {
    const name = document.getElementById("recipe-name").value.trim();
    const ingredients = document.getElementById("recipe-ingredients").value.trim();
    const time = document.getElementById("recipe-time").value.trim();
    const instructions = document.getElementById("recipe-instructions").value.trim();
    const imageInput = document.getElementById("recipe-image") || "default.jpg"; // Resim yoksa varsayılan

    // Alanların doğrulama kontrolü
    if (!name || !ingredients || !time || !instructions) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Resim dosyasını okuyarak geçici bir URL oluştur
    const file = imageInput.files[0];
    const imageURL = URL.createObjectURL(file);

    // Malzemeleri virgül ile ayır ve her birini temizle
    const ingredientsArray = ingredients.split(",").map(i => i.trim());

    // Yeni tarif yapısı
    const newRecipe = {
        name: name,
        ingredients: ingredientsArray,
        instructions: instructions,
        cookingTime: time,
        image: imageURL,
        details: `${name} tarifi detayları...`
    };

    // Yeni tarifi diziye ekle
    recipes.push(newRecipe);
    alert(`${name} tarifi başarıyla eklendi!`);

    // Formu sıfırla
    document.getElementById("add-recipe-form").reset();

    // Listeyi güncelle
    findRecipes();
}

// Raporlar Sayfası

// Örnek Veri Seti
const data = [
    { product: "Süt", consumed: 12, wasted: 3, expiry: "2024-12-15" },
    { product: "Yoğurt", consumed: 8, wasted: 2, expiry: "2024-12-12" },
    { product: "Un", consumed: 20, wasted: 1, expiry: "2025-01-10" },
    { product: "Yumurta", consumed: 25, wasted: 6, expiry: "2024-12-08" },
    { product: "Bal", consumed: 5, wasted: 0, expiry: "2025-06-30" }
];

//Tüketim Grafiği
const consumptionChart = new Chart(document.getElementById('consumptionChart'), {
    type: 'bar',
    data: {
        labels: data.map(item => item.product),
        datasets: [{
            label: 'Tüketim',
            data: data.map(item => item.consumed),
            backgroundColor: '#5271ff'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// İsraf Grafiği
const wasteChart = new Chart(document.getElementById('wasteChart'), {
    type: 'bar',
    data: {
        labels: data.map(item => item.product),
        datasets: [{
            label: 'İsraf',
            data: data.map(item => item.wasted), // 'wasted' verilere uygun olmalı
            backgroundColor: '#b94ad6'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// İsraf Edilen Ürünler Grafiği
// Tüketim ve İsraf Oranını Hesapla
const totalConsumed = data.reduce((acc, item) => acc + item.consumed, 0);
const totalWasted = data.reduce((acc, item) => acc + item.wasted, 0);

// İsraf Oranı Hesapla
const wastePercentage = (totalWasted / totalConsumed) * 100;

const consumptionWasteRateChart = new Chart(document.getElementById('consumptionWasteRateChart'), {
    type: 'pie',
    data: {
        labels: ['İsraf', 'Tüketim'],
        datasets: [{
            label: 'Tüketim ve İsraf Oranı',
            data: [totalWasted, totalConsumed - totalWasted],  // Toplam israf ve tüketim
            backgroundColor: ['#b94ad6', '#5271ff'],
            borderColor: ['#fff'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const percentage = (tooltipItem.raw / totalConsumed) * 100;
                        return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage.toFixed(2)}%)`;
                    }
                }
            }
        }
    }
});

// Ayrıntılı Tablo
const tableBody = document.getElementById("detailedTable");
data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.product}</td>
        <td>${item.consumed}</td>
        <td>${item.wasted}</td>
    `;
    tableBody.appendChild(row);
});

/* Menü butonu */
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

function searchProducts() {
    var input = document.getElementById('search-input').value.toLowerCase(); // Kullanıcı girdisini al
    var cards = document.querySelectorAll('.card-yemekTarifleri'); // Tarif kartlarını al

    cards.forEach(function (card) {
        var title = card.querySelector('h3').textContent.toLowerCase(); // Her bir tarifin başlığını al
        if (title.includes(input)) {
            card.style.display = ''; // Başlık arama metnini içeriyorsa kartı göster
        } else {
            card.style.display = 'none'; // Başlık arama metnini içermiyorsa kartı gizle
        }
    });
}

function clearSearch() {
    var input = document.getElementById('search-input');
    input.value = ''; // Arama kutusunu temizle
    searchProducts(); // Arama sonucu olarak tüm kartları göster
}