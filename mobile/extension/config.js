import presentation1 from './presentation/presentation1';
import presentation2 from './presentation/presentation2';
import presentation3 from './presentation/presentation3';

const config = {
    credentials: {
        google: {
            webClientId: "608098992888-pk0vantp01d0avqh423djgodbpm1k86m.apps.googleusercontent.com",
            androidClientId: "608098992888-f7pie3rd6osvls6jt04naaqeivd2m68j.apps.googleusercontent.com",
            iosClientId : "608098992888-v6gts7tcib7i4p6rv041kbklk2qk78lf.apps.googleusercontent.com"
        },
        facebook: {
            appId: "534270243959641"
        }
    },
    serverURL: 'http://146.193.41.162/ugs/server',
    OWMAPIKey: '890df5db881a1a76b5f7ccc04b1a5e0c',
    languages: ['en', 'pt'],
    presentation: [presentation1, presentation2, presentation3]
};

export default config;