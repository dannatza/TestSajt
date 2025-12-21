// Product Database
const products = [
    {
        id: 1,
        name: 'MacBook Pro 14"',
        category: 'laptops',
        brand: 'Apple',
        type: 'Мобилни радни станице',
        price: 1999,
        originalPrice: 2299,
        image: 'Pictures/macbook.jpg',
        rating: 4.8,
        reviews: 342,
        stock: 10,
        description: 'Моћан лаптоп са M3 Pro чипом, 16GB RAM-а и 512GB SSD-а. Савршен за професионалце и креаторе.',
        specs: {
            processor: 'Apple M3 Pro',
            ram: '16GB',
            storage: '512GB SSD',
            display: '14.2" Liquid Retina',
            battery: '17 часова'
        },
        inStock: true
    },
    {
        id: 2,
        name: 'iPhone 15 Pro',
        category: 'phones',
        brand: 'Apple',
        type: 'Флаглманни смартфон',
        price: 999,
        originalPrice: 1199,
        image: 'Pictures/Iphone15pro.jpg',
        rating: 4.7,
        reviews: 856,
        stock: 10,
        description: 'Најновији iPhone са A17 Pro чипом, напредним систем за фотографисање и титанијумским дизајном.',
        specs: {
            processor: 'Apple A17 Pro',
            storage: '256GB',
            camera: '48MP Главна',
            display: '6.1" Super Retina',
            battery: 'Батерија целог дана'
        },
        options: {
            color: ['Црна', 'Сребрна', 'Злата', 'Дубока црна']
        },
        inStock: true
    },
    {
        id: 3,
        name: 'iPad Air',
        category: 'tablets',
        brand: 'Apple',
        type: 'Средње величине таблети',
        price: 599,
        originalPrice: 699,
        image: 'Pictures/IpadAir.jpg',
        rating: 4.6,
        reviews: 421,
        stock: 10,
        description: 'Универзалан таблет са M1 чипом, задивљујућим дисплејем и подршком за Apple Pencil.',
        specs: {
            processor: 'Apple M1',
            ram: '8GB',
            storage: '256GB',
            display: '11" Liquid Retina',
            connectivity: 'Wi-Fi 6E'
        },
        inStock: true
    },
    {
        id: 4,
        name: 'Sony WH-1000XM5',
        category: 'accessories',
        brand: 'Sony',
        type: 'Слушалице',
        price: 379,
        originalPrice: 429,
        image: 'Pictures/SonyWH-1000XM5.jpg',
        rating: 4.9,
        reviews: 1203,
        stock: 10,
        description: 'Премиум слушалице са отказивањем шума са изузетним квалитетом звука и батеријом од 30 часова.',
        specs: {
            noiseCanceling: 'Напредни ANC',
            battery: '30 часова',
            connectivity: 'Bluetooth 5.3',
            driver: '40mm',
            weight: '250g'
        },
        options: {
            color: ['Црна', 'Плава', 'Сива']
        },
        inStock: true
    },
    {
        id: 5,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        brand: 'Samsung',
        type: 'Флаглманни смартфон',
        price: 799,
        originalPrice: 899,
        image: 'Pictures/SamsungGalaxyS24.jpg',
        rating: 4.7,
        reviews: 678,
        stock: 10,
        description: 'Флагман Android телефон са AI функцијама, 50MP камером и 120Hz дисплејем.',
        specs: {
            processor: 'Snapdragon 8 Gen 3',
            storage: '256GB',
            camera: '50MP Главна',
            display: '6.2" AMOLED',
            battery: '4000mAh'
        },
        options: {
            color: ['Црна', 'Плава', 'Жута', 'Бела'],
            storage: ['256GB', '512GB']
        },
        inStock: true
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'laptops',
        brand: 'Dell',
        type: 'Мобилни радни станице',
        price: 1599,
        originalPrice: 1899,
        image: 'Pictures/DellXPS15.jpg',
        rating: 4.6,
        reviews: 534,
        stock: 10,
        description: 'Лаптоп са високим перформансама и Windows-ом, RTX 4060, савршен за креаторе и разработивачи.',
        specs: {
            processor: 'Intel Core i7-13700H',
            gpu: 'RTX 4060',
            ram: '16GB',
            storage: '512GB SSD',
            display: '15.6" 4K OLED'
        },
        inStock: true
    },
    {
        id: 7,
        name: 'Google Pixel Watch 2',
        category: 'accessories',
        brand: 'Google',
        type: 'Паметни часовници',
        price: 299,
        originalPrice: 399,
        image: 'Pictures/GooglePixelWatch2.jpg',
        rating: 4.5,
        reviews: 892,
        stock: 10,
        description: 'Паметни сат са Google Wear OS-ом, праћењем здравља и безбедном Google интеграцијом.',
        specs: {
            processor: 'Snapdragon Wear',
            display: '1.2" AMOLED',
            battery: '24+ часова',
            features: 'GPS, ECG, Blood Oxygen',
            waterproof: '5ATM'
        },
        options: {
            color: ['Црна', 'Сребрна'],
            size: ['S', 'M', 'L']
        },
        inStock: true
    },
    {
        id: 8,
        name: 'iPad Pro 12.9"',
        category: 'tablets',
        brand: 'Apple',
        type: 'Велики таблети',
        price: 1299,
        originalPrice: 1499,
        image: 'Pictures/IpadPro12.9.jpg',
        rating: 4.8,
        reviews: 756,
        stock: 10,
        description: 'Таблет M2 чипом, ProMotion дисплејем и подршком за Apple Pencil Pro.',
        specs: {
            processor: 'Apple M2',
            ram: '8GB',
            storage: '512GB',
            display: '12.9" Liquid Retina XDR',
            camera: '12MP + LiDAR'
        },
        inStock: true
    }
];

// Export products
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
