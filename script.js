// قائمة بالمنتجات الجديدة مع الأسماء والأسعار
const productsData = [
  { name: "كيلو كفتة", price: 600 },
  { name: "طاجن ورق عنب بالكوارع", price: 320 },
  { name: "فتة باللحمة", price: 550 },
  { name: "رز معمر بالفراخ", price: 350 },
  { name: "رز معمر باللحمة", price: 400 },
  { name: "رز معمر سادة", price: 150 },
  { name: "بيكاتا لحمة", price: 850 },
  { name: "صدور فراخ بصوص الليمون", price: 500 },
  { name: "بيكاتا فراخ", price: 490 },
  { name: "كباب حلة", price: 335 },
  { name: "كوسة بالبشاميل", price: 330 },
  { name: "سجق", price: 460 },
  { name: "كابسه باللحمه", price: 450 },
  { name: "كابسه فراخ", price: 380 },
  { name: "تورلي", price: 350 },
  { name: "طاجن كورع", price: 360 },
  { name: "كيلو اسكالوب", price: 600 },
  { name: "سامبوسه لحمه 20قطعه", price: 380 },
  { name: "سامبوسه جبنه 20 قطعه", price: 240 },
  { name: "بطاطس محشيه لحمه مفرومه", price: 200 },
  { name: "كيلو رز باسمتي", price: 150 },
  { name: "مكرونه باشامل", price: 280 },
  { name: "نارجسكو", price: 255 },
  { name: "حمام محشي ارز", price: 320 },
  { name: "حمام محشي فريك", price: 350 },
  { name: "كيلو ورق عنب", price: 135 },
  { name: "كيلو محشي كرنب", price: 125 },
  { name: "كيلو محشي مشكل", price: 130 },
  { name: "باذنجان بالخل والثوم", price: 50 },
  { name: "سلطة طحينة", price: 50 },
  { name: "سلطة خضراء", price: 50 },
  { name: "شوربة خضار", price: 65 },
  { name: "شوربة لسان عصفور", price: 70 },
  { name: "طاجن بطاطس باللحمة", price: 305 },
  { name: "ملوخية بالطشة", price: 95 },
  { name: "طاجن عكاوي", price: 430 },
  { name: "لحمة بالبصل", price: 335 },
  { name: "كيلو كفتة أرز", price: 315 },
  { name: "بامية باللحمة (250 جرام لحم)", price: 335 },
  { name: "خضار باللحمة (250 جرام لحم)", price: 345 },
  { name: "طاجن مكرونة بشاميل", price: 155 },
  { name: "مكرونة وايت صوص (دجاج - مشروم)", price: 190 },
  { name: "فريك باللحمة (250 جرام لحم)", price: 200 },
  { name: "كيلو شيش طاووق", price: 370 },
  { name: "كيلو بانيه", price: 315 },
  { name: "فراخ متبله ب البصل والتوابل", price: 315 },
  { name: "فراخ متبله عسل و زبادي", price: 295 },
  { name: "فراخ متبله زعتر", price: 300 },
  { name: "فراخ متبله كاري وكركم", price: 295 },
  { name: "بطة بلدي متبله", price: 635 },
  { name: "جلاش باللحمة المفرومة", price: 250 },
  { name: "جلاش مكس جبن", price: 200 },
  { name: "جلاش لحمة مفرومة وجبن", price: 285 },
  { name: "رقاق باللحمة", price: 300 },
  { name: "مسقعة باللحمة المفرومة والبشاميل", price: 315 },
  { name: "أرز بالشعرية", price: 65 },
  { name: "أرز بحة وجبة", price: 70 },
  { name: "كيلو أرز بالشعرية", price: 125 }
];

// عرض المنتجات
const productsContainer = document.querySelector('.products');
productsData.forEach(product => {
  const productDiv = document.createElement('div');
  productDiv.className = 'product';
  productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price} جنيه</p>
        <button onclick="addToCart('${product.name}', ${product.price})">إضافة إلى السلة</button>
    `;
  productsContainer.appendChild(productDiv);
});

// إدارة سلة التسوق
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} جنيه`;
    cartItems.appendChild(li);
  });
}

// حذف جميع المنتجات من السلة
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  updateCart();
});

// إرسال الطلب عبر WhatsApp
document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }
  
  // جمع تفاصيل الطلب
  let message = "طلب جديد:\n";
  cart.forEach(item => {
    message += `- ${item.name}: ${item.price} جنيه\n`;
  });
  
  // إضافة الموقع
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `https://www.google.com/maps?q=${latitude},${longitude}`;
      message += `\nالموقع: ${location}`;
      
      // إنشاء رابط WhatsApp
      const phoneNumber = "201204486263";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }, error => {
      alert("لم يتمكن من الحصول على الموقع.");
    });
  } else {
    alert("الموقع غير مدعوم.");
  }
});

// زر التوجه إلى السلة
document.getElementById('go-to-cart').addEventListener('click', () => {
  document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
});