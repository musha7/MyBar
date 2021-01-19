const ingredients = [
    {
        name: 'Ice',
        image: '/images/ice.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Mint',
        image: '/images/mint.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Lemon',
        image: '/images/lemon.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Sprite',
        image: '/images/sprite.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Soda',
        image: '/images/soda.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Sugar',
        image: '/images/sugar.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Cola',
        image: '/images/cola.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Cranberry Juice',
        image: '/images/cranberryjuice.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Cream',
        image: '/images/cream.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Salt',
        image: '/images/salt.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Tonic',
        image: '/images/tonic.jpg',
        category: 'no alcohol'
    },
    {
        name: 'Bacardi',
        image: '/images/bacardi.jpg',
        category: 'alcohol',
        sub_category: 'Rum'
    },
    {
        name: 'Captain Morgan Spiced Gold',
        image: '/images/captain-morgan-spiced-gold-rum.jpg',
        category: 'alcohol',
        sub_category: 'Rum'
    },
    {
        name: 'Jose Cuervo Silver',
        image: '/images/joseCuervoSilver.jpg',
        category: 'alcohol',
        sub_category: 'Tequila'
    },
    {
        name: 'Jose Cuervo Gold',
        image: '/images/Jose-Cuervo-Reposado.jpg',
        category: 'alcohol',
        sub_category: 'Tequila'
    },
    {
        name: 'The Kuyper',
        image: '/images/theKuyper.jpg',
        category: 'alcohol',
        sub_category: 'Liqueur'
    },
    {
        name: 'Baileys',
        image: '/images/baileys.jpg',
        category: 'alcohol',
        sub_category: 'Liqueur'
    },
    {
        name: 'E&J Brandy',
        image: '/images/brandy.jpg',
        category: 'alcohol',
        sub_category: 'Brandy'
    },
    {
        name: 'Hennessy VSOP',
        image: '/images/hennessy_VSOP.jpg',
        category: 'alcohol',
        sub_category: 'Cognac'
    },
    {
        name: 'Bombay Sapphire',
        image: '/images/bombaySapphire.jpg',
        category: 'alcohol',
        sub_category: 'Gin'
    },
    {
        name: 'Jamson',
        image: '/images/jamson.jpg',
        category: 'alcohol',
        sub_category: 'Whiskey'

    },
    {
        name: 'Wild Turkey',
        image: '/images/wild_turkey.jpg',
        category: 'alcohol',
        sub_category: 'Whiskey'
    },
    {
        name: 'Johnnie Walker Double Black',
        image: '/images/johnnie_walker_double_black.jpg',
        category: 'alcohol',
        sub_category: 'Whiskey'

    },
    {
        name: 'Kahlua',
        image: '/images/kahlua.jpg',
        category: 'alcohol',
        sub_category: 'Liqueur'
    },
    {
        name: 'Midori',
        image: '/images/midori.jpg',
        category: 'alcohol',
        sub_category: 'Liqueur'
    },
    {
        name: 'Ketel One',
        image: '/images/ketelOne.jpg',
        category: 'alcohol',
        sub_category: 'Vodka'
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
//                 const aSubCategory = a.sub_category.toLowerCase();
//                 const bSubCategory = b.sub_category.toLowerCase();
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