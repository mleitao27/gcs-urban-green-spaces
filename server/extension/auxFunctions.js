const calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const Q1 = lat1 * Math.PI/180; // φ, λ in radians
    const Q2 = lat2 * Math.PI/180;
    const deltaQ = (lat2-lat1) * Math.PI/180;
    const deltaL = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaQ/2) * Math.sin(deltaQ/2) +  Math.cos(Q1) * Math.cos(Q2) * Math.sin(deltaL/2) * Math.sin(deltaL/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
};

exports.calcDistance = calcDistance;