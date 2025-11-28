// Product Database
const products = [
    {
        id: 1,
        name: 'MacBook Pro 14"',
        category: 'laptops',
        price: 1999,
        originalPrice: 2299,
        image: '🖥️',
        rating: 4.8,
        reviews: 342,
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
        price: 999,
        originalPrice: 1199,
        image: '📱',
        rating: 4.7,
        reviews: 856,
        description: 'Најновији iPhone са A17 Pro чипом, напредним систем за фотографисање и титанијумским дизајном.',
        specs: {
            processor: 'Apple A17 Pro',
            storage: '256GB',
            camera: '48MP Главна',
            display: '6.1" Super Retina',
            battery: 'Батерија целог дана'
        },
        inStock: true
    },
    {
        id: 3,
        name: 'iPad Air',
        category: 'tablets',
        price: 599,
        originalPrice: 699,
        image: '📲',
        rating: 4.6,
        reviews: 421,
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
        price: 379,
        originalPrice: 429,
        image: '🎧',
        rating: 4.9,
        reviews: 1203,
        description: 'Премиум слушалице са отказивањем шума са изузетним квалитетом звука и батеријом од 30 часова.',
        specs: {
            noiseCanceling: 'Напредни ANC',
            battery: '30 часова',
            connectivity: 'Bluetooth 5.3',
            driver: '40mm',
            weight: '250g'
        },
        inStock: true
    },
    {
        id: 5,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: 799,
        originalPrice: 899,
        image: '📱',
        rating: 4.7,
        reviews: 678,
        description: 'Флагман Android телефон са AI функцијама, 50MP камером и 120Hz дисплејем.',
        specs: {
            processor: 'Snapdragon 8 Gen 3',
            storage: '256GB',
            camera: '50MP Главна',
            display: '6.2" AMOLED',
            battery: '4000mAh'
        },
        inStock: true
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'laptops',
        price: 1599,
        originalPrice: 1899,
        image: '🖥️',
        rating: 4.6,
        reviews: 534,
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
        price: 299,
        originalPrice: 399,
        image: '⌚',
        rating: 4.5,
        reviews: 892,
        description: 'Паметни сат са Google Wear OS-ом, праћењем здравља и безбедном Google интеграцијом.',
        specs: {
            processor: 'Snapdragon Wear',
            display: '1.2" AMOLED',
            battery: '24+ часова',
            features: 'GPS, ECG, Blood Oxygen',
            waterproof: '5ATM'
        },
        inStock: true
    },
    {
        id: 8,
        name: 'iPad Pro 12.9"',
        category: 'tablets',
        price: 1299,
        originalPrice: 1499,
        image: '📲',
        rating: 4.8,
        reviews: 756,
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
