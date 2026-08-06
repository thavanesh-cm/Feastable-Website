/**
 * product.js
 * Dynamic Product Detail Page — reads ?product=slug, renders from catalog data.
 */

(function () {
  'use strict';

  // ========================================
  // PRODUCT CATALOG (same data as flyout)
  // ========================================

  const PRODUCT_CATALOG = [
    // Chocolate
    {
      slug: 'milk-chocolate-bar',
      name: 'Milk Chocolate Bar',
      price: 24.99,
      image: 'images/milk-chocolate-bar.png',
      category: 'Chocolate',
      badge: '',
      description: 'Smooth, creamy milk chocolate made with ethically sourced cocoa. Every bite is a rich, velvety experience that melts on your tongue.',
      fullDescription: 'Our Milk Chocolate Bar is crafted from premium, ethically sourced cocoa beans. We work directly with farmers to ensure fair wages and sustainable practices. The result is an incredibly smooth, creamy chocolate with complex flavor notes that develop as it melts. Each bar is 2.1oz of pure chocolate bliss, wrapped in our signature Feastables packaging.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '230', fat: '14g', sugar: '21g', protein: '3g', fiber: '2g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    {
      slug: 'dark-chocolate-bar',
      name: 'Dark Chocolate Bar',
      price: 24.99,
      image: 'images/dark-chocolate-bar.png',
      category: 'Chocolate',
      badge: '',
      description: 'Bold, intense dark chocolate with 72% cacao. A sophisticated treat for the true chocolate lover.',
      fullDescription: 'Our Dark Chocolate Bar features 72% cacao for a bold, intense flavor profile. Made with ethically sourced cocoa beans and minimal ingredients, this bar delivers complex notes of dark fruit and roasted cacao. Perfect for those who appreciate the deep, rich flavors of premium dark chocolate.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '210', fat: '15g', sugar: '14g', protein: '4g', fiber: '4g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    {
      slug: 'cookies-cream-bar',
      name: 'Cookies & Cream Bar',
      price: 24.99,
      image: 'images/cookies-cream-bar.png',
      category: 'Chocolate',
      badge: 'Fan Favorite',
      description: 'White chocolate loaded with crunchy cookie pieces. The perfect combination of sweet and crunchy.',
      fullDescription: 'Cookies & Cream is one of our most popular flavors, combining smooth white chocolate with crunchy cookie pieces throughout. Each bite delivers that classic cookies and cream taste you love, made with our premium ethically sourced ingredients. It\'s the snack that disappears fastest from the shelf.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '240', fat: '14g', sugar: '24g', protein: '3g', fiber: '1g' },
      ingredients: 'Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Cookie Pieces (Rice Flour, Cocoa, Sugar), Sunflower Lecithin, Organic Vanilla Extract.'
    },
    {
      slug: 'almond-chocolate-bar',
      name: 'Almond Chocolate Bar',
      price: 24.99,
      image: 'images/almond-chocolate-bar.png',
      category: 'Chocolate',
      badge: '',
      description: 'Rich milk chocolate packed with roasted almonds for a satisfying crunch in every bite.',
      fullDescription: 'Roasted almonds meet premium milk chocolate in this satisfying bar. Each piece is packed with whole roasted almonds that add a delightful crunch to the smooth chocolate base. A protein-rich snack that tastes indulgent but keeps you going.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '250', fat: '16g', sugar: '18g', protein: '5g', fiber: '3g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Roasted Almonds, Organic Cocoa Butter, Organic Milk Powder, Sunflower Lecithin, Sea Salt.'
    },
    {
      slug: 'crunch-chocolate-bar',
      name: 'Original Crunch Bar',
      price: 24.99,
      image: 'images/crunch-chocolate-bar.png',
      category: 'Chocolate',
      badge: 'Original',
      description: 'The OG Feastables bar. Crispy quinoa crunch pieces in smooth milk chocolate.',
      fullDescription: 'The Original Crunch Bar is where it all started. This is the bar that launched Feastables into a chocolate revolution. Crispy quinoa crunch pieces are folded into smooth, ethically sourced milk chocolate for a texture combination that keeps you reaching for more. If you haven\'t tried it yet, start here.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '220', fat: '13g', sugar: '19g', protein: '3g', fiber: '2g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Quinoa Crisps, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    {
      slug: 'pretzel-mint-crunch',
      name: 'Pretzel Mint Crunch',
      price: 35.99,
      image: 'images/pretzel-mint.png',
      category: 'Chocolate',
      badge: 'New',
      description: 'A festive fusion of cool mint, salty pretzel pieces, and rich dark chocolate.',
      fullDescription: 'Pretzel Mint Crunch brings together three incredible flavors in one bar. Cool peppermint swirls through rich dark chocolate, studded with crunchy pretzel pieces for a salty-sweet contrast. This premium bar is perfect for the adventurous palate.',
      sizes: ['Standard Bar', 'XL Bar'],
      flavors: [],
      nutrition: { calories: '235', fat: '14g', sugar: '20g', protein: '3g', fiber: '2g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Pretzel Pieces (Wheat Flour, Salt, Malted Barley), Organic Cocoa Butter, Natural Peppermint Oil, Sunflower Lecithin.'
    },
    {
      slug: 'hot-cocoa-crunch',
      name: 'Hot Cocoa Crunch',
      price: 24.99,
      image: 'images/hot-cocoa.png',
      category: 'Chocolate',
      badge: '',
      description: 'All the warmth of hot cocoa in a crunchy chocolate bar. Marshmallow crisp meets rich cocoa.',
      fullDescription: 'Inspired by your favorite winter beverage, Hot Cocoa Crunch captures the essence of a steaming cup of hot chocolate. Marshmallow crisp pieces are blended into a rich cocoa chocolate base for a bar that tastes like a cozy winter night. Enjoy it any season.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '225', fat: '13g', sugar: '22g', protein: '3g', fiber: '1g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Marshmallow Crisps (Sugar, Gelatin, Corn Starch), Organic Milk Powder, Sunflower Lecithin.'
    },
    {
      slug: 'peanut-butter-bar',
      name: 'Peanut Butter Bar',
      price: 22.99,
      image: 'images/peanut-butter.png',
      category: 'Chocolate',
      badge: '',
      description: 'Creamy peanut butter swirled into rich milk chocolate. A classic combo done right.',
      fullDescription: 'Our Peanut Butter Bar takes the classic PB and chocolate pairing to the next level. Real, creamy peanut butter is swirled throughout smooth milk chocolate for a bar that\'s equal parts indulgent and satisfying. Made with our better peanut butter recipe — no palm oil, no hydrogenated oils.',
      sizes: ['Standard Bar', 'XL Bar', '12 Pack'],
      flavors: [],
      nutrition: { calories: '260', fat: '17g', sugar: '16g', protein: '6g', fiber: '2g' },
      ingredients: 'Organic Cacao, Peanut Butter (Peanuts, Salt), Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Sunflower Lecithin.'
    },
    {
      slug: 'quinoa-crunch',
      name: 'Chocolate Candy Assortment',
      price: 19.99,
      image: 'images/quinoa-crunch.png',
      category: 'Chocolate',
      badge: 'Value Pack',
      description: 'A mix of our most popular chocolate flavors in snack-sized portions. Perfect for sharing.',
      fullDescription: 'The Chocolate Candy Assortment gives you a taste of everything Feastables has to offer. Each bag contains snack-sized versions of our top-selling chocolate bars, including Original Crunch, Milk Chocolate, and Cookies & Cream. Perfect for parties, movie nights, or keeping in your desk drawer.',
      sizes: ['Standard Pack'],
      flavors: [],
      nutrition: { calories: '180', fat: '11g', sugar: '17g', protein: '2g', fiber: '1g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Quinoa Crisps, Cookie Pieces, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    // Cups
    {
      slug: 'pb-cups-classic',
      name: 'Peanut Butter Cups Classic',
      price: 19.99,
      image: 'images/pb-cups-classic.png',
      category: 'Cups',
      badge: 'Best Seller',
      description: 'Classic peanut butter cups with a thick, creamy filling and rich milk chocolate shell.',
      fullDescription: 'Our Classic Peanut Butter Cups are a game-changer. A thick layer of our better peanut butter recipe sits inside a smooth milk chocolate shell. No palm oil, no compromises. Just the best peanut butter cup you\'ve ever tasted. Each pack contains 2 full-size cups.',
      sizes: ['2 Pack', '6 Pack', '12 Pack'],
      flavors: [
        { name: 'Classic', color: '#D4924A' },
        { name: 'Dark', color: '#3D2B1F' },
        { name: 'White', color: '#FFF5E6' }
      ],
      nutrition: { calories: '200', fat: '13g', sugar: '15g', protein: '5g', fiber: '1g' },
      ingredients: 'Peanut Butter (Peanuts, Salt), Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Sunflower Lecithin.'
    },
    {
      slug: 'pb-cups-dark',
      name: 'Peanut Butter Cups Dark',
      price: 19.99,
      image: 'images/pb-cups-dark.png',
      category: 'Cups',
      badge: '',
      description: 'Peanut butter cups wrapped in rich 72% dark chocolate for a bolder, more intense experience.',
      fullDescription: 'For those who prefer their chocolate dark and intense, our Dark Peanut Butter Cups deliver. 72% cacao dark chocolate encases our signature peanut butter filling for a bold, luxurious treat with less sugar and more cocoa complexity.',
      sizes: ['2 Pack', '6 Pack', '12 Pack'],
      flavors: [],
      nutrition: { calories: '190', fat: '14g', sugar: '12g', protein: '5g', fiber: '2g' },
      ingredients: 'Peanut Butter (Peanuts, Salt), Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Sunflower Lecithin.'
    },
    {
      slug: 'pb-cups-white',
      name: 'Peanut Butter Cups White',
      price: 19.99,
      image: 'images/pb-cups-white.png',
      category: 'Cups',
      badge: '',
      description: 'Creamy white chocolate peanut butter cups — sweet, smooth, and irresistible.',
      fullDescription: 'White chocolate meets peanut butter in this sweet, creamy cup. Our White Peanut Butter Cups feature a smooth white chocolate shell filled with our better peanut butter recipe. A sweeter, more indulgent take on the classic.',
      sizes: ['2 Pack', '6 Pack', '12 Pack'],
      flavors: [],
      nutrition: { calories: '220', fat: '14g', sugar: '18g', protein: '4g', fiber: '1g' },
      ingredients: 'Organic Cane Sugar, Organic Cocoa Butter, Peanut Butter (Peanuts, Salt), Organic Milk Powder, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    // Gummies
    {
      slug: 'sour-gummies-berry',
      name: 'Sour Gummies Berry Blast',
      price: 14.99,
      image: 'images/sour-gummies-berry.png',
      category: 'Gummies',
      badge: '',
      description: 'Mouth-puckering sour gummies bursting with mixed berry flavor. Tangy on the outside, chewy inside.',
      fullDescription: 'Berry Blast Sour Gummies are an explosion of berry goodness. Each piece is coated in a tangy sour sugar that gives way to a deliciously chewy gummy bursting with natural berry flavors. Strawberry, blueberry, and raspberry combine for a fruity experience that\'ll have you reaching for more.',
      sizes: ['Single Bag', '4 Pack'],
      flavors: [
        { name: 'Berry', color: '#8B3A8B' },
        { name: 'Tropical', color: '#FFB347' }
      ],
      nutrition: { calories: '130', fat: '0g', sugar: '22g', protein: '2g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Berry Flavors, Fruit Juice Concentrates (for color), Coconut Oil.'
    },
    {
      slug: 'sour-gummies-tropical',
      name: 'Sour Gummies Tropical',
      price: 14.99,
      image: 'images/sour-gummies-tropical.png',
      category: 'Gummies',
      badge: '',
      description: 'Tropical sour gummies with mango, pineapple, and passionfruit flavors.',
      fullDescription: 'Transport yourself to a tropical island with these sour gummies. Mango, pineapple, and passionfruit flavors burst through a tangy sour coating for a candy experience that\'s both exotic and addictive.',
      sizes: ['Single Bag', '4 Pack'],
      flavors: [],
      nutrition: { calories: '130', fat: '0g', sugar: '22g', protein: '2g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Tropical Flavors, Fruit Juice Concentrates (for color), Coconut Oil.'
    },
    {
      slug: 'gummy-worms',
      name: 'Gummy Worms',
      price: 12.99,
      image: 'images/gummy-worms.png',
      category: 'Gummies',
      badge: '',
      description: 'Classic sour gummy worms with a two-tone fruity twist. A childhood favorite, leveled up.',
      fullDescription: 'Feastables Gummy Worms bring back the nostalgia of your favorite childhood candy — but better. Each worm features two fruity flavors twisted together with a sour sugar coating. Soft, chewy, and incredibly fun to eat.',
      sizes: ['Single Bag', '4 Pack'],
      flavors: [],
      nutrition: { calories: '140', fat: '0g', sugar: '24g', protein: '2g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Flavors, Fruit Juice Concentrates (for color), Coconut Oil.'
    },
    {
      slug: 'soar-boost-cosmic-berry',
      name: 'Soar Boost Cosmic Berry',
      price: 24.99,
      image: 'images/soar-boost.png',
      category: 'Gummies',
      badge: 'Mario Galaxy',
      description: 'Limited edition cosmic berry sour boost from the Super Mario Galaxy collection.',
      fullDescription: 'Part of our exclusive Super Mario Galaxy collaboration, Soar Boost Cosmic Berry delivers an out-of-this-world sour candy experience. These rocket-shaped gummies are coated in cosmic berry sour powder and deliver an intense fruity burst with every chew.',
      sizes: ['Single Bag'],
      flavors: [],
      nutrition: { calories: '140', fat: '0g', sugar: '23g', protein: '1g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Berry Flavors, Star-shaped Sprinkles, Fruit Juice Concentrates (for color).'
    },
    {
      slug: 'valentine-sour-strike',
      name: "Valentine's Assorted Sour Strike",
      price: 24.99,
      image: 'images/valentine-sour.png',
      category: 'Gummies',
      badge: 'Seasonal',
      description: "A Valentine's Day assortment of our best sour candies in heart-themed packaging.",
      fullDescription: "Show your love with sour! This Valentine's Day assortment packs our best sour gummy flavors into heart-themed packaging. Inside you'll find a mix of berry, tropical, and mystery flavors perfect for sharing with your special someone — or keeping all to yourself.",
      sizes: ['Gift Box'],
      flavors: [],
      nutrition: { calories: '135', fat: '0g', sugar: '22g', protein: '2g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Flavors, Fruit Juice Concentrates (for color), Coconut Oil.'
    },
    // Milk
    {
      slug: 'chocolate-milk',
      name: 'Chocolate Milk',
      price: 9.99,
      image: 'images/chocolate-milk.png',
      category: 'Milk',
      badge: 'New',
      description: 'Rich, creamy chocolate milk made with real cocoa and ethically sourced ingredients.',
      fullDescription: 'Feastables Chocolate Milk is everything you want in a chocolate drink — rich, creamy, and made with real cocoa. No artificial flavors, no junk. Just pure chocolate milk goodness that tastes as good as it makes you feel. Each carton is 8oz of pure joy.',
      sizes: ['Single', '4 Pack'],
      flavors: [
        { name: 'Chocolate', color: '#5C3A1E' },
        { name: 'Strawberry', color: '#FF6B8A' }
      ],
      nutrition: { calories: '160', fat: '4g', sugar: '18g', protein: '8g', fiber: '1g' },
      ingredients: 'Whole Milk, Organic Cocoa Powder, Organic Cane Sugar, Organic Vanilla Extract, Sea Salt.'
    },
    {
      slug: 'strawberry-milk',
      name: 'Strawberry Milk',
      price: 9.99,
      image: 'images/strawberry-milk.png',
      category: 'Milk',
      badge: 'New',
      description: 'Sweet strawberry milk made with real strawberry puree. A nostalgic treat, reimagined.',
      fullDescription: 'Our Strawberry Milk brings back that nostalgic strawberry milk flavor from childhood, but made the Feastables way — with real strawberry puree, no artificial colors, and ethically sourced dairy. Sweet, creamy, and perfectly pink.',
      sizes: ['Single', '4 Pack'],
      flavors: [],
      nutrition: { calories: '150', fat: '4g', sugar: '16g', protein: '8g', fiber: '0g' },
      ingredients: 'Whole Milk, Strawberry Puree, Organic Cane Sugar, Natural Strawberry Flavor, Beet Juice (for color).'
    },
    // Bundles
    {
      slug: 'ultimate-bundle',
      name: 'Ultimate Feastables Bundle',
      price: 59.99,
      image: 'images/ultimate-bundle.png',
      category: 'Bundles',
      badge: 'Best Value',
      description: 'Everything in one box. Chocolate bars, cups, gummies — the complete Feastables experience.',
      fullDescription: 'The Ultimate Feastables Bundle is the best way to experience everything we make. This curated box includes a selection of our best-selling chocolate bars, peanut butter cups, and sour gummies. It\'s the perfect gift or the ultimate personal treat. Over 30% savings compared to buying individually.',
      sizes: ['Full Bundle'],
      flavors: [],
      nutrition: { calories: 'Varies', fat: 'Varies', sugar: 'Varies', protein: 'Varies', fiber: 'Varies' },
      ingredients: 'See individual product packaging for full ingredient lists.'
    },
    {
      slug: 'chocolate-lover-bundle',
      name: 'Chocolate Lover Bundle',
      price: 44.99,
      image: 'images/chocolate-lover-bundle.png',
      category: 'Bundles',
      badge: '',
      description: 'A curated collection of all our chocolate bars for the dedicated chocolate enthusiast.',
      fullDescription: 'For the chocolate obsessed, this bundle brings together every flavor of our chocolate bar lineup. From Original Crunch to Cookies & Cream, Dark Chocolate to Peanut Butter — taste them all and find your favorite. Includes 6 full-size bars.',
      sizes: ['6 Bar Bundle'],
      flavors: [],
      nutrition: { calories: 'Varies', fat: 'Varies', sugar: 'Varies', protein: 'Varies', fiber: 'Varies' },
      ingredients: 'See individual product packaging for full ingredient lists.'
    },
    {
      slug: 'beast-games-bundle',
      name: 'Beast Games 2 Bundle',
      price: 15.00,
      image: 'images/beast-games-bundle.png',
      category: 'Bundles',
      badge: 'Limited',
      description: 'The official Beast Games 2 snack bundle. Fuel your game night with Feastables.',
      fullDescription: 'Get ready for Beast Games 2 with this exclusive snack bundle! Curated for the ultimate viewing party, this bundle packs chocolate bars and gummies perfect for snacking during the show. Limited edition packaging features exclusive Beast Games 2 artwork.',
      sizes: ['Game Night Bundle'],
      flavors: [],
      nutrition: { calories: 'Varies', fat: 'Varies', sugar: 'Varies', protein: 'Varies', fiber: 'Varies' },
      ingredients: 'See individual product packaging for full ingredient lists.'
    },
    // Limited Time
    {
      slug: 'limited-edition-mystery',
      name: 'Limited Edition Mystery Bar',
      price: 29.99,
      image: 'images/limited-edition-1.png',
      category: 'Limited Time',
      badge: 'Mystery',
      description: "Can you guess the flavor? Our mystery bar keeps you guessing with every bite.",
      fullDescription: "The Limited Edition Mystery Bar is our most talked-about product. What flavor is it? We're not telling. Buy it, taste it, and join the conversation online. Each batch features a unique mystery flavor that's never been done before. Collect them all — each one is different!",
      sizes: ['Standard Bar'],
      flavors: [],
      nutrition: { calories: '???', fat: '???', sugar: '???', protein: '???', fiber: '???' },
      ingredients: "It's a mystery! All we can say: ethically sourced, no artificial ingredients, and absolutely delicious."
    },
    // Merch
    {
      slug: 'merch-hoodie',
      name: 'Feastables Hoodie',
      price: 54.99,
      image: 'images/merch-hoodie.png',
      category: 'Merch',
      badge: '',
      description: 'Cozy premium hoodie with the Feastables logo. Rep the crew in style.',
      fullDescription: 'The official Feastables Hoodie is made from premium heavyweight cotton blend fabric for maximum comfort. Features the embroidered Feastables logo on the front and a small \"Join the Crew\" tag on the sleeve. Available in multiple sizes. Machine washable.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      flavors: [],
      nutrition: {},
      ingredients: '80% Cotton, 20% Polyester. Machine wash cold, tumble dry low.'
    },
    {
      slug: 'merch-tshirt',
      name: 'Feastables T-Shirt',
      price: 29.99,
      image: 'images/merch-tshirt.png',
      category: 'Merch',
      badge: '',
      description: 'Classic fit tee with Feastables branding. Soft, comfortable, and always in style.',
      fullDescription: 'Our classic Feastables T-Shirt is your new favorite everyday tee. Made from super-soft ringspun cotton with a relaxed fit. Features a bold Feastables graphic on the front. Pre-shrunk so what you see is what you get. Available in multiple sizes.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      flavors: [],
      nutrition: {},
      ingredients: '100% Ringspun Cotton. Machine wash cold, tumble dry low.'
    },
    {
      slug: 'merch-hat',
      name: 'Feastables Hat',
      price: 24.99,
      image: 'images/merch-hat.png',
      category: 'Merch',
      badge: '',
      description: 'Adjustable dad hat with embroidered Feastables logo. One size fits most.',
      fullDescription: 'Top off your Feastables look with our signature hat. This adjustable dad hat features a cleanly embroidered Feastables logo on the front and an adjustable brass clasp in the back. One size fits most. Made from durable washed cotton twill.',
      sizes: ['One Size'],
      flavors: [],
      nutrition: {},
      ingredients: '100% Washed Cotton Twill. Spot clean only.'
    },
    // Super Mario
    {
      slug: 'mario-galaxy-cocoa-crunch',
      name: 'Mario Galaxy Cocoa Crunch',
      price: 29.99,
      image: 'images/mario-galaxy.png',
      category: 'Super Mario',
      badge: 'Limited Edition',
      description: 'The star of the Super Mario Galaxy collection. Cosmic cocoa crunch in every bite.',
      fullDescription: 'Blast off with the Mario Galaxy Cocoa Crunch bar! This limited edition collaboration with The Super Mario Galaxy Movie features a cosmic blend of rich cocoa and crunchy star-shaped pieces. The packaging features exclusive artwork from the film. Collect all three Galaxy bars!',
      sizes: ['Standard Bar', 'Collector Box'],
      flavors: [],
      nutrition: { calories: '230', fat: '14g', sugar: '20g', protein: '3g', fiber: '2g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Star-shaped Crisps, Organic Milk Powder, Sunflower Lecithin, Organic Vanilla Extract.'
    },
    {
      slug: 'soar-boost-mario',
      name: 'Soar Boost Cosmic Berry',
      price: 24.99,
      image: 'images/soar-boost.png',
      category: 'Super Mario',
      badge: 'Mario Galaxy',
      description: 'Cosmic berry sour boost — power up with this limited edition Galaxy treat.',
      fullDescription: 'Soar Boost Cosmic Berry is part of the Super Mario Galaxy collection. These rocket-shaped sour gummies are bursting with cosmic berry flavor and coated in tangy sour sugar. It\'s the power-up snack you didn\'t know you needed.',
      sizes: ['Single Bag'],
      flavors: [],
      nutrition: { calories: '140', fat: '0g', sugar: '23g', protein: '1g', fiber: '0g' },
      ingredients: 'Sugar, Corn Syrup, Gelatin, Citric Acid, Natural Berry Flavors, Star-shaped Sprinkles, Fruit Juice Concentrates (for color).'
    },
    {
      slug: 'yoshi-x-chocolate',
      name: 'Yoshi X Chocolate Box',
      price: 34.99,
      image: 'images/yoshi-x.png',
      category: 'Super Mario',
      badge: 'Limited Edition',
      description: 'Yoshi-themed chocolate egg box — a limited edition Galaxy collection exclusive.',
      fullDescription: 'The Yoshi X Chocolate Box features adorable egg-shaped chocolates inspired by Yoshi from the Super Mario Galaxy Movie. Each box contains 12 individually wrapped chocolate eggs with a surprise flavor inside. Collectible packaging makes this a must-have for Mario fans and chocolate lovers alike.',
      sizes: ['Gift Box'],
      flavors: [],
      nutrition: { calories: '160', fat: '10g', sugar: '16g', protein: '2g', fiber: '1g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Various Fillings (Caramel, Peanut Butter, Raspberry), Sunflower Lecithin.'
    },
    // Easter
    {
      slug: 'easter-variety-bag',
      name: 'Easter Snack-Size Variety Bag',
      price: 10.00,
      image: 'images/easter-variety.png',
      category: 'Easter',
      badge: 'Seasonal',
      description: 'A festive Easter bag of snack-size Feastables. Perfect for Easter baskets and egg hunts.',
      fullDescription: 'Fill those Easter baskets with Feastables! This festive variety bag contains 20 snack-sized versions of our popular chocolate bars in spring-themed wrappers. Perfect for Easter egg hunts, basket stuffing, or sharing at spring gatherings.',
      sizes: ['20 Count Bag'],
      flavors: [],
      nutrition: { calories: '90', fat: '5g', sugar: '9g', protein: '1g', fiber: '0g' },
      ingredients: 'Organic Cacao, Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Quinoa Crisps, Cookie Pieces, Sunflower Lecithin, Organic Vanilla Extract.'
    }
  ];

  // ========================================
  // DOM ELEMENTS
  // ========================================

  const mainImage = document.getElementById('pdpMainImage');
  const thumbnails = document.getElementById('pdpThumbnails');
  const title = document.getElementById('pdpTitle');
  const price = document.getElementById('pdpPrice');
  const addPrice = document.getElementById('pdpAddPrice');
  const description = document.getElementById('pdpDescription');
  const fullDescription = document.getElementById('pdpFullDescription');
  const categoryLabel = document.getElementById('pdpCategoryLabel');
  const badge = document.getElementById('pdpBadge');
  const breadcrumbProduct = document.getElementById('breadcrumbProduct');
  const sizeSection = document.getElementById('pdpSizeSection');
  const sizeOptions = document.getElementById('pdpSizeOptions');
  const flavorSection = document.getElementById('pdpFlavorSection');
  const flavorOptions = document.getElementById('pdpFlavorOptions');
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const addToCartBtn = document.getElementById('pdpAddToCart');
  const nutritionGrid = document.getElementById('pdpNutritionGrid');
  const ingredientsEl = document.getElementById('pdpIngredients');

  let currentProduct = null;
  let quantity = 1;
  let selectedSize = '';

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('product');

    if (!slug) {
      showNotFound();
      return;
    }

    currentProduct = PRODUCT_CATALOG.find(p => p.slug === slug);

    if (!currentProduct) {
      showNotFound();
      return;
    }

    renderProduct();
    setupTabs();
    setupQuantity();
    setupAddToCart();
  }

  // ========================================
  // RENDER PRODUCT
  // ========================================

  function renderProduct() {
    const p = currentProduct;

    // Page title
    document.title = `${p.name} — Feastables`;

    // Breadcrumb
    breadcrumbProduct.textContent = p.name;

    // Main image
    mainImage.src = p.image;
    mainImage.alt = p.name;

    // Thumbnails (main + possibly other angles, we show the same for now)
    thumbnails.innerHTML = '';
    const thumbData = [p.image]; // Can expand to multiple images later
    thumbData.forEach((src, i) => {
      const thumb = document.createElement('button');
      thumb.className = 'pdp__thumb' + (i === 0 ? ' active' : '');
      thumb.innerHTML = `<img src="${src}" alt="${p.name} view ${i + 1}">`;
      thumb.addEventListener('click', () => {
        mainImage.src = src;
        thumbnails.querySelectorAll('.pdp__thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      thumbnails.appendChild(thumb);
    });

    // Category label
    categoryLabel.textContent = p.category;

    // Badge
    if (p.badge) {
      badge.textContent = p.badge;
      badge.classList.add('visible');
    }

    // Title & price
    title.textContent = p.name;
    price.textContent = '$' + p.price.toFixed(2);
    addPrice.textContent = '— $' + p.price.toFixed(2);

    // Description
    description.textContent = p.description;
    fullDescription.textContent = p.fullDescription;

    // Sizes
    if (p.sizes && p.sizes.length > 0) {
      sizeSection.style.display = 'block';
      sizeOptions.innerHTML = '';
      selectedSize = p.sizes[0];
      p.sizes.forEach((size, i) => {
        const btn = document.createElement('button');
        btn.className = 'pdp__size-btn' + (i === 0 ? ' active' : '');
        btn.textContent = size;
        btn.addEventListener('click', () => {
          selectedSize = size;
          sizeOptions.querySelectorAll('.pdp__size-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
        sizeOptions.appendChild(btn);
      });
    }

    // Flavors
    if (p.flavors && p.flavors.length > 0) {
      flavorSection.style.display = 'block';
      flavorOptions.innerHTML = '';
      p.flavors.forEach((flavor, i) => {
        const btn = document.createElement('button');
        btn.className = 'pdp__flavor-btn' + (i === 0 ? ' active' : '');
        btn.innerHTML = `
          <div class="pdp__flavor-swatch" style="background: ${flavor.color};"></div>
          <span class="pdp__flavor-label">${flavor.name}</span>`;
        btn.addEventListener('click', () => {
          flavorOptions.querySelectorAll('.pdp__flavor-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
        flavorOptions.appendChild(btn);
      });
    }

    // Nutrition
    if (p.nutrition && Object.keys(p.nutrition).length > 0) {
      nutritionGrid.innerHTML = '';
      const labels = { calories: 'Calories', fat: 'Total Fat', sugar: 'Sugars', protein: 'Protein', fiber: 'Fiber' };
      Object.entries(p.nutrition).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'pdp__nutrition-item';
        item.innerHTML = `
          <div class="pdp__nutrition-value">${value}</div>
          <div class="pdp__nutrition-label">${labels[key] || key}</div>`;
        nutritionGrid.appendChild(item);
      });
    }

    // Ingredients
    ingredientsEl.textContent = p.ingredients;
  }

  // ========================================
  // TABS
  // ========================================

  function setupTabs() {
    const tabs = document.querySelectorAll('.pdp__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        // Remove active from all
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.pdp__tab-panel').forEach(p => p.classList.remove('active'));
        // Activate clicked
        tab.classList.add('active');
        document.getElementById('panel-' + target).classList.add('active');
      });
    });
  }

  // ========================================
  // QUANTITY
  // ========================================

  function setupQuantity() {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        updateQuantityUI();
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (quantity < 99) {
        quantity++;
        updateQuantityUI();
      }
    });
  }

  function updateQuantityUI() {
    qtyValue.textContent = quantity;
    const total = (currentProduct.price * quantity).toFixed(2);
    addPrice.textContent = '— $' + total;
  }

  // ========================================
  // ADD TO CART
  // ========================================

  function setupAddToCart() {
    addToCartBtn.addEventListener('click', () => {
      if (!currentProduct) return;

      const product = {
        id: currentProduct.slug,
        name: currentProduct.name + (selectedSize ? ` (${selectedSize})` : ''),
        price: currentProduct.price,
        image: currentProduct.image
      };

      // Add quantity times
      for (let i = 0; i < quantity; i++) {
        if (typeof addToCart === 'function') {
          addToCart(product);
        }
      }

      // Visual feedback
      addToCartBtn.classList.add('added');
      addToCartBtn.querySelector('span').textContent = 'ADDED! ✓';

      setTimeout(() => {
        addToCartBtn.classList.remove('added');
        addToCartBtn.querySelector('span').textContent = 'Add to Bag';
      }, 2000);
    });
  }

  // ========================================
  // NOT FOUND
  // ========================================

  function showNotFound() {
    const main = document.getElementById('pdpMain');
    main.innerHTML = `
      <div style="text-align: center; padding: 120px 32px;">
        <div style="font-size: 72px; margin-bottom: 24px;">🍫</div>
        <h1 style="font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Product Not Found</h1>
        <p style="font-size: 18px; color: #666; margin-bottom: 32px;">We couldn't find what you're looking for. Check out our other products!</p>
        <a href="index.html#products" class="btn btn--blue">Shop All Products</a>
      </div>`;
  }

  // ========================================
  // FLYOUT MENU LOGIC
  // ========================================

  const FLYOUT_CATALOG = {
    categories: [
      { id: 'all', name: 'All Products', emoji: '🛍️' },
      { id: 'chocolate', name: 'Chocolate', emoji: '🍫' },
      { id: 'cups', name: 'Cups', emoji: '🥜' },
      { id: 'gummies', name: 'Gummies', emoji: '🍬' },
      { id: 'milk', name: 'Milk', emoji: '🥛' },
      { id: 'bundles', name: 'Bundles', emoji: '📦' },
      { id: 'limited', name: 'Limited Time', emoji: '⏳' },
      { id: 'merch', name: 'Merch', emoji: '👕' },
      { id: 'mario', name: 'Super Mario', emoji: '⭐' },
      { id: 'easter', name: 'Easter', emoji: '🐣' }
    ],
    products: [
      { slug: 'milk-chocolate-bar', name: 'Milk Chocolate Bar', price: 24.99, image: 'images/milk-chocolate-bar.png', category: 'chocolate' },
      { slug: 'dark-chocolate-bar', name: 'Dark Chocolate Bar', price: 24.99, image: 'images/dark-chocolate-bar.png', category: 'chocolate' },
      { slug: 'cookies-cream-bar', name: 'Cookies & Cream Bar', price: 24.99, image: 'images/cookies-cream-bar.png', category: 'chocolate' },
      { slug: 'almond-chocolate-bar', name: 'Almond Chocolate Bar', price: 24.99, image: 'images/almond-chocolate-bar.png', category: 'chocolate' },
      { slug: 'crunch-chocolate-bar', name: 'Original Crunch Bar', price: 24.99, image: 'images/crunch-chocolate-bar.png', category: 'chocolate' },
      { slug: 'pretzel-mint-crunch', name: 'Pretzel Mint Crunch', price: 35.99, image: 'images/pretzel-mint.png', category: 'chocolate' },
      { slug: 'hot-cocoa-crunch', name: 'Hot Cocoa Crunch', price: 24.99, image: 'images/hot-cocoa.png', category: 'chocolate' },
      { slug: 'peanut-butter-bar', name: 'Peanut Butter Bar', price: 22.99, image: 'images/peanut-butter.png', category: 'chocolate' },
      { slug: 'quinoa-crunch', name: 'Chocolate Candy Assortment', price: 19.99, image: 'images/quinoa-crunch.png', category: 'chocolate' },
      { slug: 'pb-cups-classic', name: 'Peanut Butter Cups Classic', price: 19.99, image: 'images/pb-cups-classic.png', category: 'cups' },
      { slug: 'pb-cups-dark', name: 'Peanut Butter Cups Dark', price: 19.99, image: 'images/pb-cups-dark.png', category: 'cups' },
      { slug: 'pb-cups-white', name: 'Peanut Butter Cups White', price: 19.99, image: 'images/pb-cups-white.png', category: 'cups' },
      { slug: 'sour-gummies-berry', name: 'Sour Gummies Berry Blast', price: 14.99, image: 'images/sour-gummies-berry.png', category: 'gummies' },
      { slug: 'sour-gummies-tropical', name: 'Sour Gummies Tropical', price: 14.99, image: 'images/sour-gummies-tropical.png', category: 'gummies' },
      { slug: 'gummy-worms', name: 'Gummy Worms', price: 12.99, image: 'images/gummy-worms.png', category: 'gummies' },
      { slug: 'soar-boost-cosmic-berry', name: 'Soar Boost Cosmic Berry', price: 24.99, image: 'images/soar-boost.png', category: 'gummies' },
      { slug: 'valentine-sour-strike', name: "Valentine's Assorted Sour Strike", price: 24.99, image: 'images/valentine-sour.png', category: 'gummies' },
      { slug: 'chocolate-milk', name: 'Chocolate Milk', price: 9.99, image: 'images/chocolate-milk.png', category: 'milk' },
      { slug: 'strawberry-milk', name: 'Strawberry Milk', price: 9.99, image: 'images/strawberry-milk.png', category: 'milk' },
      { slug: 'ultimate-bundle', name: 'Ultimate Feastables Bundle', price: 59.99, image: 'images/ultimate-bundle.png', category: 'bundles' },
      { slug: 'chocolate-lover-bundle', name: 'Chocolate Lover Bundle', price: 44.99, image: 'images/chocolate-lover-bundle.png', category: 'bundles' },
      { slug: 'beast-games-bundle', name: 'Beast Games 2 Bundle', price: 15.00, image: 'images/beast-games-bundle.png', category: 'bundles' },
      { slug: 'limited-edition-mystery', name: 'Limited Edition Mystery Bar', price: 29.99, image: 'images/limited-edition-1.png', category: 'limited' },
      { slug: 'merch-hoodie', name: 'Feastables Hoodie', price: 54.99, image: 'images/merch-hoodie.png', category: 'merch' },
      { slug: 'merch-tshirt', name: 'Feastables T-Shirt', price: 29.99, image: 'images/merch-tshirt.png', category: 'merch' },
      { slug: 'merch-hat', name: 'Feastables Hat', price: 24.99, image: 'images/merch-hat.png', category: 'merch' },
      { slug: 'mario-galaxy-cocoa-crunch', name: 'Mario Galaxy Cocoa Crunch', price: 29.99, image: 'images/mario-galaxy.png', category: 'mario' },
      { slug: 'soar-boost-mario', name: 'Soar Boost Cosmic Berry', price: 24.99, image: 'images/soar-boost.png', category: 'mario' },
      { slug: 'yoshi-x-chocolate', name: 'Yoshi X Chocolate Box', price: 34.99, image: 'images/yoshi-x.png', category: 'mario' },
      { slug: 'easter-variety-bag', name: 'Easter Snack-Size Variety Bag', price: 10.00, image: 'images/easter-variety.png', category: 'easter' }
    ]
  };

  const shopFlyout = document.getElementById('shopFlyout');
  const flyoutBackdrop = document.getElementById('flyoutBackdrop');
  const flyoutClose = document.getElementById('flyoutClose');
  const flyoutCategories = document.getElementById('flyoutCategories');
  const flyoutGrid = document.getElementById('flyoutGrid');
  const flyoutGridTitle = document.getElementById('flyoutGridTitle');
  const shopToggles = document.querySelectorAll('[data-flyout-toggle]');

  let currentFlyoutCategory = 'all';

  function openFlyout() {
    shopFlyout.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeFlyout() {
    shopFlyout.classList.remove('open');
    document.body.style.overflow = '';
  }

  function buildFlyoutCategories() {
    if (!flyoutCategories) return;
    flyoutCategories.innerHTML = '';
    FLYOUT_CATALOG.categories.forEach(cat => {
      const count = cat.id === 'all'
        ? FLYOUT_CATALOG.products.length
        : FLYOUT_CATALOG.products.filter(p => p.category === cat.id).length;
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#" data-category="${cat.id}" class="${cat.id === currentFlyoutCategory ? 'active' : ''}">
          <span class="flyout-cat-emoji">${cat.emoji}</span>
          ${cat.name}
          <span class="flyout-cat-count">${count}</span>
        </a>`;
      li.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        currentFlyoutCategory = cat.id;
        flyoutCategories.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        renderFlyoutGrid();
        flyoutGridTitle.textContent = cat.name;
      });
      flyoutCategories.appendChild(li);
    });
  }

  function renderFlyoutGrid() {
    if (!flyoutGrid) return;
    const filtered = currentFlyoutCategory === 'all'
      ? FLYOUT_CATALOG.products
      : FLYOUT_CATALOG.products.filter(p => p.category === currentFlyoutCategory);

    flyoutGrid.innerHTML = '';
    filtered.forEach(product => {
      const card = document.createElement('a');
      card.className = 'flyout-product-card';
      card.href = `product.html?product=${product.slug}`;
      card.innerHTML = `
        <div class="flyout-product-card__image">
          <img src="${product.image}" alt="${product.name}" class="flyout-product-card__photo" loading="lazy">
        </div>
        <div class="flyout-product-card__info">
          <div class="flyout-product-card__name">${product.name}</div>
          <div class="flyout-product-card__price">$${product.price.toFixed(2)}</div>
        </div>`;
      flyoutGrid.appendChild(card);
    });
  }

  // Event bindings
  shopToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      openFlyout();
    });
  });

  if (flyoutClose) flyoutClose.addEventListener('click', closeFlyout);
  if (flyoutBackdrop) flyoutBackdrop.addEventListener('click', closeFlyout);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && shopFlyout && shopFlyout.classList.contains('open')) {
      closeFlyout();
    }
  });

  // Initialize flyout
  buildFlyoutCategories();
  renderFlyoutGrid();

  // ========================================
  // HEADER SCROLL SHADOW
  // ========================================

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Init
  init();

})();

