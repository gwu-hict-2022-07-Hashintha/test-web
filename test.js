// --- TASK 3: Data & Logic ---
const books = [
    { title: "The Village", price: 1200, inStock: true },
    { title: "Paddy Fields", price: 950, inStock: false },
    { title: "Ocean Breeze", price: 800, inStock: true },
    { title: "Mountain High", price: 1500, inStock: true },
    { title: "Island Tales", price: 900, inStock: false },
    { title: "City Lights", price: 1100, inStock: true }
];

// (i) රු. 1000 ට අඩු පොත් ගණන සෙවීම
const affordableBooksCount = books.filter(book => book.price < 1000).length;
console.log(`Number of books under Rs. 1000: ${affordableBooksCount}`);

// (ii) සාමාන්‍ය මිල ගණනය කිරීම
const totalValue = books.reduce((sum, book) => sum + book.price, 0);
const averagePrice = totalValue / books.length;
console.log(`Average price of all books: Rs. ${averagePrice.toFixed(2)}`);


// --- TASK 4: Render to DOM (createElement භාවිතයෙන්) ---
const bookContainer = document.getElementById('book-container');

books.forEach(book => {
    // Elements අලුතින් සෑදීම
    const card = document.createElement('div');
    card.className = 'book-card';
    
    const title = document.createElement('h3');
    title.textContent = book.title;
    
    const details = document.createElement('p');
    const stockStatus = book.inStock ? 'In stock' : 'Out of stock';
    details.textContent = `Rs. ${book.price} · ${stockStatus}`;
    
    const saveButton = document.createElement('button');
    saveButton.textContent = '♥ Save';
    
    // සෑදූ Elements, ප්‍රධාන card එකට ඇතුළත් කිරීම
    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(saveButton);
    
    // සම්පූර්ණ card එක වෙබ් පිටුවට ඇතුළත් කිරීම
    bookContainer.appendChild(card);
});


// --- TASK 5: Interactivity (Delegated Event Listener) ---
let savedCount = 0;
const savedCountDisplay = document.getElementById('saved-count');

bookContainer.addEventListener('click', function(event) {
    // ක්ලික් කළේ '.book-card' එකක් මතදැයි සෙවීම
    const clickedCard = event.target.closest('.book-card');
    
    if (!clickedCard) return; // කාඩ්පතක් නොවේ නම් ඉවත් වීම
    
    // 'saved' class එක දැමීම හෝ ඉවත් කිරීම
    clickedCard.classList.toggle('saved');
    
    // කවුන්ටරය අලුත් කිරීම
    if (clickedCard.classList.contains('saved')) {
        savedCount++;
    } else {
        savedCount--;
    }
    
    savedCountDisplay.textContent = savedCount;
});


// --- TASK 6: Form & Validation ---
const form = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('email-error');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // පිටුව Refresh වීම නැවැත්වීම
    
    const emailValue = emailInput.value.trim();
    // ඊමේල් ලිපිනය පරීක්ෂා කිරීම සඳහා වූ Regex රටාව
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (!emailRegex.test(emailValue)) {
        // වැරදි නම්: Error එක පෙන්වන්න
        errorMsg.style.display = 'inline';
    } else {
        // නිවැරදි නම්: Error එක මකා දමා පණිවිඩයක් පෙන්වන්න
        errorMsg.style.display = 'none';
        alert('Successfully registered!');
        form.reset(); // Form එක හිස් කිරීම
    }
});