const ingredients = [
    {
        name: 'Ice',
        image: '/images/ice.jpg',
        alcoholic: false,
        simpleCocktails: ['Mojito', 'Margarita', 'Cuba Libre', 'Gin Tonic', 'Midori Sour', 'Whiskey Sour', 'Orgazma', 'White Russian']
    },
    {
        name: 'Mint',
        image: '/images/mint.jpg',
        alcoholic: false,
        simpleCocktails: ['Mojito']
    },
    {
        name: 'Lemon',
        image: '/images/lemon.jpg',
        alcoholic: false,
        simpleCocktails: ['Mojito', 'Margarita', 'Cuba Libre', 'Gin Tonic', 'Midori Sour', 'Whiskey Sour']
    },
    {
        name: 'Sprite',
        image: '/images/sprite.jpg',
        alcoholic: false,
        simpleCocktails: []
    },
    {
        name: 'Soda',
        image: '/images/soda.jpg',
        alcoholic: false,
        simpleCocktails: ['Mojito']
    },
    {
        name: 'Sugar',
        image: '/images/sugar.jpg',
        alcoholic: false,
        simpleCocktails: ['Mojito', 'Midori Sour', 'Whiskey Sour']
    },
    {
        name: 'Cola',
        image: '/images/cola.jpg',
        alcoholic: false,
        simpleCocktails: ['Cuba Libre']
    },
    {
        name: 'Cranberry Juice',
        image: '/images/cranberryjuice.jpg',
        alcoholic: false,
        simpleCocktails: []
    },
    {
        name: 'Cream',
        image: '/images/cream.jpg',
        alcoholic: false,
        simpleCocktails: ['Orgazma', 'White Russian']
    },
    {
        name: 'Salt',
        image: '/images/salt.jpg',
        alcoholic: false,
        simpleCocktails: []
    },
    {
        name: 'Tonic',
        image: '/images/tonic.jpg',
        alcoholic: false,
        simpleCocktails: ['Gin Tonic']

    },
    {
        name: 'Bacardi',
        image: '/images/bacardi.jpg',
        alcoholic: true,
        subCategory: { name: 'White Rum' },
        category: { name: 'Rum' },
        simpleCocktails: ['Mojito', 'Cuba Libre']
    },
    {
        name: 'Captain Morgan Spiced Gold',
        image: '/images/captain-morgan-spiced-gold-rum.jpg',
        alcoholic: true,
        subCategory: { name: 'Spiced Rum' },
        category: { name: 'Rum' },
        simpleCocktails: ['Mojito', 'Cuba Libre']
    },
    {
        name: 'Jose Cuervo Silver',
        image: '/images/joseCuervoSilver.jpg',
        alcoholic: true,
        subCategory: { name: 'Blanco Tequila' },
        category: { name: 'Tequila' },
        simpleCocktails: ['Margarita']
    },
    {
        name: 'Jose Cuervo Gold',
        image: '/images/Jose-Cuervo-Reposado.jpg',
        alcoholic: true,
        subCategory: { name: 'Reposado Tequila' },
        category: { name: 'Tequila' },
        simpleCocktails: ['Margarita']
    },
    {
        name: 'The Kuyper',
        image: '/images/theKuyper.jpg',
        alcoholic: true,
        subCategory: { name: 'Triple sec' },
        simpleCocktails: ['Margarita']
    },
    {
        name: 'Baileys',
        image: '/images/baileys.jpg',
        alcoholic: true,
        subCategory: { name: 'Liqueur' },
        simpleCocktails: ['Orgazma']
    },
    {
        name: 'E&J Brandy',
        image: '/images/brandy.jpg',
        alcoholic: true,
        subCategory: { name: 'Brandy' },
        simpleCocktails: []
    },
    {
        name: 'Hennessy VSOP',
        image: '/images/hennessy_VSOP.jpg',
        alcoholic: true,
        subCategory: { name: 'Cognac' },
        simpleCocktails: []
    },
    {
        name: 'Bombay Sapphire',
        image: '/images/bombaySapphire.jpg',
        alcoholic: true,
        subCategory: { name: 'Gin' },
        simpleCocktails: ['Gin Tonic']
    },
    {
        name: 'Jamson',
        image: '/images/jamson.jpg',
        alcoholic: true,
        subCategory: { name: 'Irish Whiskey' },
        category: { name: 'Whiskey' },
        simpleCocktails: ['Whiskey Sour']

    },
    {
        name: 'Wild Turkey',
        image: '/images/wild_turkey.jpg',
        alcoholic: true,
        subCategory: { name: 'Bourbon Whiskey' },
        category: { name: 'Whiskey' },
        simpleCocktails: ['Whiskey Sour']
    },
    {
        name: 'Johnnie Walker Double Black',
        image: '/images/johnnie_walker_double_black.jpg',
        alcoholic: true,
        subCategory: { name: 'Scotch Whiskey' },
        category: { name: 'Whiskey' },
        simpleCocktails: ['Whiskey Sour']

    },
    {
        name: 'Kahlua',
        image: '/images/kahlua.jpg',
        alcoholic: true,
        subCategory: { name: 'Liqueur' },
        simpleCocktails: ['Orgazma', 'White Russian']
    },
    {
        name: 'Midori',
        image: '/images/midori.jpg',
        alcoholic: true,
        subCategory: { name: 'Liqueur' },
        simpleCocktails: ['Midori Sour']
    },
    {
        name: 'Ketel One',
        image: '/images/ketelOne.jpg',
        alcoholic: true,
        subCategory: { name: 'Vodka' },
        simpleCocktails: ['Midori Sour', 'White Russian']
    },
]

// ingredients.sort((a, b) => {

//     const aCategory = a.category.toLowerCase();
//     const bCategory = b.category.toLowerCase();
//     if (aCategory < bCategory) {
//         return -1;
//     }
//     else {
//         if (aCategory > bCategory) {
//             return 1;
//         }
//         else { // same category
//             if (aCategory == 'alcohol') {
//                 const aSubCategory = a.subCategory.toLowerCase();
//                 const bSubCategory = b.subCategory.toLowerCase();
//                 if (aSubCategory < bSubCategory) {

//                     return 1;
//                 }
//                 else {
//                     if (aSubCategory > bSubCategory) {
//                         return -1;
//                     }
//                     else { // same alcohol sub category

//                         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//                             return 1;
//                         }
//                         else {
//                             if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//                                 return -1
//                             } else {
//                                 return 0
//                             }
//                         }
//                     }
//                 }
//             } else { // both not alcoholic
//                 if (a.name > b.name) {
//                     return 1;
//                 }
//                 else {
//                     if (a.name < b.name) {
//                         return -1
//                     } else {
//                         return 0
//                     }
//                 }
//             }
//         }
//     }
// });

export default ingredients