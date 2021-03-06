const emojis = [
  'hotdog',
  'taco',
  'burrito',
  'chestnut',
  'seedling',
  'evergreen_tree',
  'deciduous_tree',
  'palm_tree',
  'cactus',
  'hot_pepper',
  'tulip',
  'cherry_blossom',
  'rose',
  'hibiscus',
  'sunflower',
  'blossom',
  'corn',
  'ear_of_rice',
  'herb',
  'four_leaf_clover',
  'maple_leaf',
  'fallen_leaf',
  'leaves',
  'mushroom',
  'tomato',
  'eggplant',
  'grapes',
  'melon',
  'watermelon',
  'tangerine',
  'lemon',
  'banana',
  'pineapple',
  'apple',
  'green_apple',
  'pear',
  'peach',
  'cherries',
  'strawberry',
  'hamburger',
  'pizza',
  'meat_on_bone',
  'poultry_leg',
  'rice_cracker',
  'rice_ball',
  'rice',
  'curry',
  'ramen',
  'spaghetti',
  'bread',
  'fries',
  'sweet_potato',
  'dango',
  'oden',
  'sushi',
  'fried_shrimp',
  'fish_cake',
  'icecream',
  'shaved_ice',
  'ice_cream',
  'doughnut',
  'cookie',
  'chocolate_bar',
  'candy',
  'lollipop',
  'custard',
  'honey_pot',
  'cake',
  'bento',
  'stew',
  'egg',
  'ox',
  'water_buffalo',
  'cow2',
  'tiger2',
  'leopard',
  'rabbit2',
  'cat2',
  'dragon',
  'crocodile',
  'whale2',
  'snail',
  'snake',
  'racehorse',
  'ram',
  'goat',
  'sheep',
  'monkey',
  'rooster',
  'chicken',
  'dog2',
  'pig2',
  'boar',
  'elephant',
  'octopus',
  'shell',
  'bug',
  'ant',
  'bee',
  'honeybee',
  'beetle',
  'fish',
  'tropical_fish',
  'blowfish',
  'turtle',
  'hatching_chick',
  'baby_chick',
  'hatched_chick',
  'bird',
  'penguin',
  'koala',
  'poodle',
  'dromedary_camel',
  'camel',
  'dolphin',
  'flipper',
  'mouse',
  'cow',
  'tiger',
  'rabbit',
  'cat',
  'dragon_face',
  'whale',
  'horse',
  'monkey_face',
  'dog',
  'pig',
  'frog',
  'hamster',
  'wolf',
  'bear',
  'panda_face',
  'lips',
  'crown',
  'bikini',
  'handbag',
  'high_heel',
  'ghost',
  'alien',
  'ring',
  'gem',
  'money_with_wings',
  'fire',
  'crab',
  'lion_face',
  'scorpion',
  'turkey',
  'unicorn_face',
  'cheese_wedge',
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getEmoji = () => {
  const index = getRandomInt(0, emojis.length - 1);
  return emojis[index];
};
