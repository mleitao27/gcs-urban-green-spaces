const IN_UGS = require('./data/base_IN_UGS.json');
const SKIPSURVEY = require('./data/base_SKIPSURVEY.json');
const SENSORS = require('./data/base_SENSORS.json');
const YNGOOGLE = require('./data/base_YNGOOGLE.json');
const GOOGLE = require('./data/base_GOOGLE.json');
const NOT_UGS = require('./data/base_NOT_UGS.json');
const UGS_LIST = require('./data/base_UGS_LIST.json');
const ADD_UGS = require('./data/base_ADD_UGS.json');
const ABOUT_UGS = require('./data/base_ABOUT_UGS.json');
const NEW_UGS = require('./data/base_NEW_UGS.json');
const ANIMALS = require('./data/base_ANIMALS.json');
const VEGETATION = require('./data/base_VEGETATION.json');
const MANMADE = require('./data/base_MANMADE.json');
const ANIMALS_OTHER = require('./data/base_ANIMALS_OTHER.json');
const VEGETATION_OTHER = require('./data/base_VEGETATION_OTHER.json');
const MANMADE_OTHER = require('./data/base_MANMADE_OTHER.json');
const FEELING = require('./data/base_FEELING.json');
const THANKYOU = require('./data/base_THANKYOU.json');
const MOTIVATION = require('./data/base_MOTIVATION.json');
const MOTIVATION_OTHER = require('./data/base_MOTIVATION_OTHER.json');

const baseArray = [
    // 0
    IN_UGS,
    // 1
    NOT_UGS,
    // 2
    UGS_LIST,
    // 3
    ADD_UGS,
    // 4
    ABOUT_UGS,
    // 5
    NEW_UGS,
    // 6
    ANIMALS,
    // 7
    VEGETATION,
    // 8
    MANMADE,
    // 9
    ANIMALS_OTHER,
    // 10
    VEGETATION_OTHER,
    // 11
    MANMADE_OTHER,
    // 12
    MOTIVATION,
    // 13
    MOTIVATION_OTHER,
    // 14
    FEELING,
    // 15
    THANKYOU,
    // 16
    GOOGLE,
    // 17
    YNGOOGLE,
    // 18
    SKIPSURVEY,
    // 19
    SENSORS
];

exports.baseArray = baseArray;