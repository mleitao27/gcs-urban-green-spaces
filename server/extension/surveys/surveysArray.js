const IN_UGS_en = require('./en/base_IN_UGS_en.json');
const SKIP_SURVEY_en = require('./en/base_SKIP_SURVEY_en.json');
const SENSORS_en = require('./en/base_SENSORS_en.json');
const YN_GOOGLE_en = require('./en/base_YN_GOOGLE_en.json');
const GOOGLE_FIT_en = require('./en/base_GOOGLE_FIT_en.json');
const NOT_UGS_en = require('./en/base_NOT_UGS_en.json');
const UGS_LIST_en = require('./en/base_UGS_LIST_en.json');
const ADD_UGS_en = require('./en/base_ADD_UGS_en.json');
const ABOUT_UGS_en = require('./en/base_ABOUT_UGS_en.json');
const NEW_UGS_en = require('./en/base_NEW_UGS_en.json');
const ANIMALS_en = require('./en/base_ANIMALS_en.json');
const VEGETATION_en = require('./en/base_VEGETATION_en.json');
const MANMADE_en = require('./en/base_MANMADE_en.json');
const ANIMALS_OTHER_en = require('./en/base_ANIMALS_OTHER_en.json');
const VEGETATION_OTHER_en = require('./en/base_VEGETATION_OTHER_en.json');
const MANMADE_OTHER_en = require('./en/base_MANMADE_OTHER_en.json');
const FEELING_en = require('./en/base_FEELING_en.json');
const THANK_YOU_en = require('./en/base_THANK_YOU_en.json');
const MOTIVATION_en = require('./en/base_MOTIVATION_en.json');
const MOTIVATION_OTHER_en = require('./en/base_MOTIVATION_OTHER_en.json');

const IN_UGS_pt = require('./pt/base_IN_UGS_pt.json');
const SKIP_SURVEY_pt = require('./pt/base_SKIP_SURVEY_pt.json');
const SENSORS_pt = require('./pt/base_SENSORS_pt.json');
const YN_GOOGLE_pt = require('./pt/base_YN_GOOGLE_pt.json');
const GOOGLE_FIT_pt = require('./pt/base_GOOGLE_FIT_pt.json');
const NOT_UGS_pt = require('./pt/base_NOT_UGS_pt.json');
const UGS_LIST_pt = require('./pt/base_UGS_LIST_pt.json');
const ADD_UGS_pt = require('./pt/base_ADD_UGS_pt.json');
const ABOUT_UGS_pt = require('./pt/base_ABOUT_UGS_pt.json');
const NEW_UGS_pt = require('./pt/base_NEW_UGS_pt.json');
const ANIMALS_pt = require('./pt/base_ANIMALS_pt.json');
const VEGETATION_pt = require('./pt/base_VEGETATION_pt.json');
const MANMADE_pt = require('./pt/base_MANMADE_pt.json');
const ANIMALS_OTHER_pt = require('./pt/base_ANIMALS_OTHER_pt.json');
const VEGETATION_OTHER_pt = require('./pt/base_VEGETATION_OTHER_pt.json');
const MANMADE_OTHER_pt = require('./pt/base_MANMADE_OTHER_pt.json');
const FEELING_pt = require('./pt/base_FEELING_pt.json');
const THANK_YOU_pt = require('./pt/base_THANK_YOU_pt.json');
const MOTIVATION_pt = require('./pt/base_MOTIVATION_pt.json');
const MOTIVATION_OTHER_pt = require('./pt/base_MOTIVATION_OTHER_pt.json');

const DETAILS_en = require('./en/details_en.json');

const DETAILS_pt = require('./pt/details_pt.json');

const MAPPING_en = require('./en/mapping_en.json');

const MAPPING_pt = require('./pt/mapping_pt.json');

const surveysArray = {
    baseSurvey: {
        'en': [
            // 0
            IN_UGS_en,
            // 1
            NOT_UGS_en,
            // 2
            UGS_LIST_en,
            // 3
            ADD_UGS_en,
            // 4
            ABOUT_UGS_en,
            // 5
            NEW_UGS_en,
            // 6
            ANIMALS_en,
            // 7
            VEGETATION_en,
            // 8
            MANMADE_en,
            // 9
            ANIMALS_OTHER_en,
            // 10
            VEGETATION_OTHER_en,
            // 11
            MANMADE_OTHER_en,
            // 12
            MOTIVATION_en,
            // 13
            MOTIVATION_OTHER_en,
            // 14
            FEELING_en,
            // 15
            THANK_YOU_en,
            // 16
            GOOGLE_FIT_en,
            // 17
            YN_GOOGLE_en,
            // 18
            SKIP_SURVEY_en,
            // 19
            SENSORS_en
        ],
        'pt': [
            // 0
            IN_UGS_pt,
            // 1
            NOT_UGS_pt,
            // 2
            UGS_LIST_pt,
            // 3
            ADD_UGS_pt,
            // 4
            ABOUT_UGS_pt,
            // 5
            NEW_UGS_pt,
            // 6
            ANIMALS_pt,
            // 7
            VEGETATION_pt,
            // 8
            MANMADE_pt,
            // 9
            ANIMALS_OTHER_pt,
            // 10
            VEGETATION_OTHER_pt,
            // 11
            MANMADE_OTHER_pt,
            // 12
            MOTIVATION_pt,
            // 13
            MOTIVATION_OTHER_pt,
            // 14
            FEELING_pt,
            // 15
            THANK_YOU_pt,
            // 16
            GOOGLE_FIT_pt,
            // 17
            YN_GOOGLE_pt,
            // 18
            SKIP_SURVEY_pt,
            // 19
            SENSORS_pt
        ]
    },
    detailsSurvey: {
        'en': DETAILS_en,
        'pt': DETAILS_pt
    },
    mappingSurvey: {
        'en': MAPPING_en,
        'pt': MAPPING_pt
    }
};

exports.surveysArray = surveysArray;