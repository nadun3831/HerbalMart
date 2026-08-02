export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🌿' },
  { id: 'oils', name: 'Herbal Oils', icon: '🧴' },
  { id: 'teas', name: 'Ayurvedic Teas', icon: '🍵' },
  { id: 'powders', name: 'Organic Powders', icon: '🍃' },
  { id: 'capsules', name: 'Wellness Capsules', icon: '💊' },
  { id: 'skincare', name: 'Skincare', icon: '✨' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-101',
    name: 'Neelibringadi Hair Growth & Scalp Oil',
    category: 'Herbal Oils',
    category_id: 'oils',
    sku: 'OIL-NEELI-250',
    unit: '250 ml',
    price: 2450.00,
    discountPrice: 1960.00,
    discount_price: 1960.00,
    stock: 42,
    stock_qty: 42,
    status: 'active',
    rating: 4.9,
    reviewsCount: 128,
    reviews_count: 128,
    featured: true,
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96047a?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Traditional Ayurvedic formulation enriched with Indigo and Bhringraj to reduce hair fall.',
    description: 'Traditional Ayurvedic formulation enriched with Indigo and Bhringraj to reduce hair fall.',
    ingredients: ['Indigofera tinctoria (Neeli)', 'Eclipta alba (Bhringraj)', 'Phyllanthus emblica (Amla)', 'Virgin Coconut Oil'],
    usageInstructions: 'Gently massage 10-15 ml into scalp 30 minutes before bathing. Use 3 times a week.',
    usage_info: 'Gently massage 10-15 ml into scalp 30 minutes before bathing. Use 3 times a week.',
    healthBenefits: [
      'Reduces hair fall up to 85%',
      'Stimulates dormant hair follicles',
      'Cools the head and alleviates stress',
      '100% natural, free from mineral oils'
    ],
    health_benefits: [
      'Reduces hair fall up to 85%',
      'Stimulates dormant hair follicles',
      'Cools the head and alleviates stress',
      '100% natural, free from mineral oils'
    ]
  },
  {
    id: 'prod-102',
    name: 'Ceylon Herbal Samahan Spice Infusion Tea',
    category: 'Ayurvedic Teas',
    category_id: 'teas',
    sku: 'TEA-SAM-030',
    unit: '30 Sachet Pack',
    price: 1850.00,
    discountPrice: null,
    discount_price: null,
    stock: 85,
    stock_qty: 85,
    status: 'active',
    rating: 4.8,
    reviewsCount: 210,
    reviews_count: 210,
    featured: false,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Soothing instant soluble herbal tea formula containing 14 authentic ayurvedic herbs.',
    description: 'Soothing instant soluble herbal tea formula containing 14 authentic ayurvedic herbs.',
    ingredients: ['Coriandrum sativum', 'Ginger', 'Black Pepper', 'Licorice', 'Alpinia galanga'],
    usageInstructions: 'Dissolve 1 sachet in a cup of hot water or milk. Consume 2-3 times daily.',
    usage_info: 'Dissolve 1 sachet in a cup of hot water or milk. Consume 2-3 times daily.',
    healthBenefits: [
      'Instant relief for cold and cough',
      'Daily immunity and vitality booster',
      'Warming digestive aid'
    ],
    health_benefits: [
      'Instant relief for cold and cough',
      'Daily immunity and vitality booster',
      'Warming digestive aid'
    ]
  },
  {
    id: 'prod-103',
    name: 'Pure Ashwagandha Root Powder',
    category: 'Organic Powders',
    category_id: 'powders',
    sku: 'PWD-ASH-200',
    unit: '200 g',
    price: 3200.00,
    discountPrice: 2720.00,
    discount_price: 2720.00,
    stock: 18,
    stock_qty: 18,
    status: 'active',
    rating: 4.9,
    reviewsCount: 94,
    reviews_count: 94,
    featured: true,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Premium organic Ashwagandha root powder to promote deep sleep and reduce cortisol.',
    description: 'Premium organic Ashwagandha root powder to promote deep sleep and reduce cortisol.',
    ingredients: ['100% Organic Ashwagandha Root Powder'],
    usageInstructions: 'Mix 1 teaspoon into warm milk or smoothie before bedtime.',
    usage_info: 'Mix 1 teaspoon into warm milk or smoothie before bedtime.',
    healthBenefits: [
      'Helps body adapt to stress',
      'Supports healthy stamina and energy',
      'USDA Certified Organic'
    ],
    health_benefits: [
      'Helps body adapt to stress',
      'Supports healthy stamina and energy',
      'USDA Certified Organic'
    ]
  },
  {
    id: 'prod-104',
    name: 'Gotukola & Moringa Immunity Capsules',
    category: 'Wellness Capsules',
    category_id: 'capsules',
    sku: 'CAP-GTM-060',
    unit: '60 Capsules',
    price: 2900.00,
    discountPrice: null,
    discount_price: null,
    stock: 4,
    stock_qty: 4,
    status: 'active',
    rating: 4.7,
    reviewsCount: 56,
    reviews_count: 56,
    featured: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Synergistic blend of Gotukola and Moringa. Enhances brain alertness and memory.',
    description: 'Synergistic blend of Gotukola and Moringa. Enhances brain alertness and memory.',
    ingredients: ['Gotukola Extract (250mg)', 'Moringa Powder (250mg)', 'Vegetable Capsule Shell'],
    usageInstructions: 'Take 2 capsules daily with breakfast and warm water.',
    usage_info: 'Take 2 capsules daily with breakfast and warm water.',
    healthBenefits: [
      'Sharpen mental clarity & memory',
      'Rich in Vitamin C and Iron',
      '100% Vegan & Non-GMO'
    ],
    health_benefits: [
      'Sharpen mental clarity & memory',
      'Rich in Vitamin C and Iron',
      '100% Vegan & Non-GMO'
    ]
  },
  {
    id: 'prod-105',
    name: 'Wild Turmeric & Chandan Brightening Face Elixir',
    category: 'Skincare',
    category_id: 'skincare',
    sku: 'SKN-TRM-050',
    unit: '50 ml',
    price: 3850.00,
    discountPrice: 3080.00,
    discount_price: 3080.00,
    stock: 31,
    stock_qty: 31,
    status: 'active',
    rating: 5.0,
    reviewsCount: 142,
    reviews_count: 142,
    featured: true,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Pure Wild Turmeric & Sandalwood facial oil. Fades dark spots for radiant glow.',
    description: 'Pure Wild Turmeric & Sandalwood facial oil. Fades dark spots for radiant glow.',
    ingredients: ['Kasturi Manjal Extract', 'Red Sandalwood Oil', 'Jojoba Oil', 'Vitamin E'],
    usageInstructions: 'Apply 3-4 drops onto clean face every evening.',
    usage_info: 'Apply 3-4 drops onto clean face every evening.',
    healthBenefits: [
      'Natural inner radiance & skin tone',
      'Anti-bacterial protection',
      'Non-greasy botanical formula'
    ],
    health_benefits: [
      'Natural inner radiance & skin tone',
      'Anti-bacterial protection',
      'Non-greasy botanical formula'
    ]
  }
];

export const INITIAL_DISCOUNTS = [
  {
    id: 'disc-201',
    code: 'HERBAL20',
    coupon_code: 'HERBAL20',
    title: 'Monsoon Hair Care Special',
    name: 'Monsoon Hair Care Special',
    percentage: 20,
    value: 20,
    validTill: '2026-12-31',
    active: true,
    status: 'active',
    description: '20% OFF on Neelibringadi Scalp & Hair Growth Oil.'
  },
  {
    id: 'disc-202',
    code: 'ASHWA15',
    coupon_code: 'ASHWA15',
    title: 'Ashwagandha Saver',
    name: 'Ashwagandha Saver',
    percentage: 15,
    value: 15,
    validTill: '2026-11-30',
    active: true,
    status: 'active',
    description: '15% OFF on Organic Ashwagandha Root Powder.'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9081',
    customerName: 'Nimal Perera',
    date: '2026-07-28',
    total: 5770,
    total_amount: 5770,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery (COD)',
    items: [
      { id: 'prod-101', name: 'Neelibringadi Hair Growth & Scalp Oil', quantity: 2, price: 1960 },
      { id: 'prod-102', name: 'Ceylon Herbal Samahan Spice Infusion Tea', quantity: 1, price: 1850 }
    ]
  },
  {
    id: 'ORD-9082',
    customerName: 'Sunethra Wickramasinghe',
    date: '2026-07-30',
    total: 3080,
    total_amount: 3080,
    status: 'Shipped',
    paymentMethod: 'PayHere / Online Card',
    items: [
      { id: 'prod-105', name: 'Wild Turmeric & Chandan Brightening Face Elixir', quantity: 1, price: 3080 }
    ]
  }
];

export const SALES_ANALYTICS_DATA = {
  revenueData: [
    { month: 'Mar', revenue: 142000, orders: 48 },
    { month: 'Apr', revenue: 185000, orders: 62 },
    { month: 'May', revenue: 210000, orders: 75 },
    { month: 'Jun', revenue: 295000, orders: 98 },
    { month: 'Jul', revenue: 380000, orders: 135 },
    { month: 'Aug', revenue: 450000, orders: 160 }
  ],
  categoryBreakdown: [
    { name: 'Herbal Oils', value: 42 },
    { name: 'Ayurvedic Teas', value: 28 },
    { name: 'Skin & Beauty', value: 18 },
    { name: 'Powders & Caps', value: 12 }
  ]
};

export const USER_PROFILE_DATA = {
  name: 'Chaminda Silva',
  email: 'chaminda.silva@example.com',
  phone: '+94 77 987 6543',
  address: 'No 78, Flower Road, Colombo 07, Sri Lanka'
};
