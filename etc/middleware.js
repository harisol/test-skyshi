
/**
 * middleware for logging each API hit
 * @type {import("express").RequestHandler}
 */
exports.customLog = (req, _res, next) => {
    if (req.app.get('env') !== 'test') {
        console.log('accessing', req.method, req.originalUrl);
    }
    next();
};
