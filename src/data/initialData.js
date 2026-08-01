export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🌿' },
  { id: 'oils', name: 'Herbal Oils & Hair Care', icon: '🧴' },
  { id: 'teas', name: 'Ayurvedic Teas & Infusions', icon: '🍵' },
  { id: 'powders', name: 'Organic Herbal Powders', icon: '🍃' },
  { id: 'capsules', name: 'Natural Wellness Capsules', icon: '💊' },
  { id: 'skincare', name: 'Herbal Skin & Beauty', icon: '✨' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-101',
    name: 'Neelibringadi Hair Growth & Scalp Oil',
    category_id: 'oils',
    sku: 'OIL-NEELI-250',
    unit: '250 ml',
    price: 2450.00,
    discount_price: 1960.00, // 20% off
    stock_qty: 42,
    status: 'active',
    rating: 4.9,
    reviews_count: 128,
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96047a?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional Ayurvedic formulation enriched with Indigo (Neeli), Bhringraj, and pure Virgin Coconut oil to reduce hair fall, prevent premature graying, and soothe scalp stress.',
    ingredients: 'Indigofera tinctoria (Neeli), Eclipta alba (Bhringraj), Cardiospermum halicacabum, Phyllanthus emblica (Amla), Goat Milk, Buffalo Milk, Virgin Coconut Oil.',
    usage_info: 'Gently massage 10-15 ml into scalp 30 minutes before bathing. Use 3 times a week for maximum hair density and shine.',
    health_benefits: [
      'Reduces hair fall up to 85%',
      'Stimulates dormant hair follicles',
      'Cools the head and alleviates stress & eye strain',
      '100% natural, free from mineral oils & parabens'
    ]
  },
  {
    id: 'prod-102',
    name: 'Ceylon Herbal Samahan Spice Infusion Tea (Pack of 30)',
    category_id: 'teas',
    sku: 'TEA-SAM-030',
    unit: '30 Sachet Pack',
    price: 1850.00,
    discount_price: null,
    stock_qty: 85,
    status: 'active',
    rating: 4.8,
    reviews_count: 210,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'A soothing instantly soluble herbal tea formula containing 14 authentic ayurvedic herbs & spices. Boosts immunity, clears nasal congestions, and warms the body.',
    ingredients: 'Adhatoda, Alpinia galanga, Carum copticum, Coriandrum sativum, Coscinium fenestratum, Cuminum cyminum, Evolvulus alsinoides, Glycyrrhiza glabra, Hedyotis corymbosa, Piper longum, Piper nigrum, Solanum xanthocarpum, Zingiber officinale.',
    usage_info: 'Dissolve 1 sachet in a cup of hot water or milk. Consume 2-3 times daily at first sign of cold or fatigue.',
    health_benefits: [
      'Instant relief for cold, cough, and sore throat',
      'Daily immunity and vitality booster',
      'Warming digestive aid',
      'No artificial preservatives'
    ]
  },
  {
    id: 'prod-103',
    name: 'Pure Ashwagandha Root Powder (Stress & Energy Boost)',
    category_id: 'powders',
    sku: 'PWD-ASH-200',
    unit: '200 g',
    price: 3200.00,
    discount_price: 2720.00, // 15% off
    stock_qty: 18,
    status: 'active',
    rating: 4.9,
    reviews_count: 94,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    description: 'Premium organic Withania Somnifera (Ashwagandha) root powder known as the King of Ayurvedic herbs. Promotes deep restful sleep, reduces cortisol, and supports natural vigor.',
    ingredients: '100% Organic Ashwagandha (Withania Somnifera) Root Powder.',
    usage_info: 'Mix 1 teaspoon (approx. 3-5g) into warm golden milk, smoothie, or warm water before bedtime.',
    health_benefits: [
      'Helps body adapt to physical & mental stress',
      'Supports healthy testosterone & hormonal balance',
      'Enhances stamina, strength, and memory',
      'USDA Certified Organic'
    ]
  },
  {
    id: 'prod-104',
    name: 'Gotukola & Moringa Immunity Capsules (60 Vegan Caps)',
    category_id: 'capsules',
    sku: 'CAP-GTM-060',
    unit: '60 Capsules',
    price: 2900.00,
    discount_price: null,
    stock_qty: 4, // Low stock demo!
    status: 'active',
    rating: 4.7,
    reviews_count: 56,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Synergistic blend of Centella Asiatica (Gotukola) and Moringa Oleifera extracts. Enhances brain alertness, memory retention, and delivers essential bio-available vitamins.',
    ingredients: 'Standardized Gotukola Extract (250mg), Pure Organic Moringa Powder (250mg), Vegetable Cellulose Capsule Shell.',
    usage_info: 'Take 2 capsules daily with breakfast and warm water.',
    health_benefits: [
      'Sharpen mental clarity & cognitive focus',
      'Rich in Vitamin C, Iron, and Antioxidants',
      'Promotes blood circulation & skin elasticity',
      '100% Vegan & Non-GMO'
    ]
  },
  {
    id: 'prod-105',
    name: 'Wild Turmeric & Chandan Brightening Face Elixir',
    category_id: 'skincare',
    sku: 'SKN-TRM-050',
    unit: '50 ml',
    price: 3850.00,
    discount_price: 3080.00, // 20% off
    stock_qty: 31,
    status: 'active',
    rating: 5.0,
    reviews_count: 142,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    description: 'Pure Kasturi Manjal (Wild Turmeric) & Sandalwood (Chandan) infused facial oil. Fades dark spots, provides an radiant ayurvedic glow, and smooths skin texture.',
    ingredients: 'Kasturi Manjal Extract, Pure Red Sandalwood Oil, Saffron Infused Jojoba Oil, Sweet Almond Oil, Vitamin E.',
    usage_info: 'Apply 3-4 drops onto clean face and neck every evening. Massage gently in upward circular motions.',
    health_benefits: [
      'Gives natural inner radiance & evens skin tone',
      'Natural anti-bacterial protection against acne',
      'Non-greasy, fast-absorbing botanical formula'
    ]
  },
  {
    id: 'prod-106',
    name: 'Triphala Digestion & Detox Tea Blend',
    category_id: 'teas',
    sku: 'TEA-TRIP-150',
    unit: '150 g Loose Leaf',
    price: 1950.00,
    discount_price: null,
    stock_qty: 60,
    status: 'active',
    rating: 4.6,
    reviews_count: 48,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    description: 'Classical combination of three superfruits: Amalaki, Bibhitaki, and Haritaki. Cleanses the digestive tract, gently relieves bloating, and supports gut wellness.',
    ingredients: 'Amalaki (Phyllanthus emblica), Bibhitaki (Terminalia bellirica), Haritaki (Terminalia chebula).',
    usage_info: 'Steep 1 teaspoon in boiling water for 5-7 minutes. Strain and drink warm before sleep.',
    health_benefits: [
      'Promotes gentle daily detoxification',
      'Supports healthy gut microbiome',
      'Alleviates acidity and abdominal heaviness'
    ]
  }
];

export const INITIAL_DISCOUNTS = [
  {
    id: 'disc-201',
    name: 'Monsoon Wellness Hair Care Special',
    type: 'percentage', // 'percentage' | 'fixed'
    value: 20, // 20%
    coupon_code: 'HERBAL20',
    target: 'product', // 'product' | 'category'
    target_id: 'prod-101',
    start_date: '2026-08-01',
    end_date: '2026-08-31',
    status: 'active', // 'active' | 'expired' | 'disabled'
    description: '20% off Neelibringadi Scalp & Hair Growth Oil for all customers.'
  },
  {
    id: 'disc-202',
    name: 'Organic Ashwagandha Super Saver',
    type: 'percentage',
    value: 15,
    coupon_code: 'ASHWA15',
    target: 'product',
    target_id: 'prod-103',
    start_date: '2026-08-01',
    end_date: '2026-08-25',
    status: 'active',
    description: 'Flat 15% discount on Pure Ashwagandha Root Powder.'
  },
  {
    id: 'disc-203',
    name: 'Skin & Beauty Radiant Glow Promo',
    type: 'percentage',
    value: 20,
    coupon_code: 'GLOW20',
    target: 'category',
    target_id: 'skincare',
    start_date: '2026-08-01',
    end_date: '2026-08-30',
    status: 'active',
    description: 'Get 20% discount on all Herbal Skin & Beauty products!'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9081',
    customer: {
      name: 'Nimal Perera',
      email: 'nimal.perera@example.com',
      phone: '+94 77 123 4567',
      address: 'No 45, Flower Road, Colombo 07'
    },
    items: [
      { product_id: 'prod-101', name: 'Neelibringadi Hair Growth & Scalp Oil', qty: 2, price: 1960.00 },
      { product_id: 'prod-102', name: 'Ceylon Herbal Samahan Spice Infusion Tea', qty: 1, price: 1850.00 }
    ],
    total_amount: 5770.00,
    discount_amount: 980.00,
    payment_method: 'Cash on Delivery (COD)',
    status: 'Delivered', // 'Pending' | 'Processing' | 'Shipped' | 'Delivered'
    date: '2026-07-28 10:15 AM'
  },
  {
    id: 'ORD-9082',
    customer: {
      name: 'Sunethra Wickramasinghe',
      email: 'sunethra.w@example.com',
      phone: '+94 71 987 6543',
      address: '12/B Temple Road, Kandy'
    },
    items: [
      { product_id: 'prod-105', name: 'Wild Turmeric & Chandan Brightening Face Elixir', qty: 1, price: 3080.00 }
    ],
    total_amount: 3080.00,
    discount_amount: 770.00,
    payment_method: 'PayHere / Online Card',
    status: 'Shipped',
    date: '2026-07-30 02:40 PM'
  },
  {
    id: 'ORD-9083',
    customer: {
      name: 'Kasun Fernando',
      email: 'kasun.f@example.com',
      phone: '+94 76 555 1212',
      address: '88 Main Street, Galle'
    },
    items: [
      { product_id: 'prod-103', name: 'Pure Ashwagandha Root Powder', qty: 1, price: 2720.00 }
    ],
    total_amount: 2720.00,
    discount_amount: 480.00,
    payment_method: 'Cash on Delivery (COD)',
    status: 'Processing',
    date: '2026-08-01 09:30 AM'
  }
];

export const SALES_ANALYTICS_DATA = {
  monthly_revenue: [
    { month: 'Mar', revenue: 142000, orders: 48 },
    { month: 'Apr', revenue: 185000, orders: 62 },
    { month: 'May', revenue: 210000, orders: 75 },
    { month: 'Jun', revenue: 295000, orders: 98 },
    { month: 'Jul', revenue: 380000, orders: 135 },
    { month: 'Aug (Projected)', revenue: 450000, orders: 160 }
  ],
  category_sales: [
    { name: 'Herbal Oils', value: 42, color: '#1b4332' },
    { name: 'Ayurvedic Teas', value: 28, color: '#52b788' },
    { name: 'Skin & Beauty', value: 18, color: '#d4a373' },
    { name: 'Powders & Caps', value: 12, color: '#e76f51' }
  ]
};
