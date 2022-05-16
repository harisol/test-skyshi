const { ActivityGroup, TodoItem } = require('../database/models');
const { CustomError } = require('../etc/error-handler');
const { defaultLimit } = require('../etc/my-config');

/** @type {import("express").RequestHandler} */
exports.list = (req, res, next) => {
    const limit = req.query.limit || defaultLimit;
    const { email, page } = req.query;
    const offset = page ? (Number(page) - 1) * limit : 0

    const where = {};
    if (email) {
        where.email = email;
    }

    ActivityGroup.findAndCountAll({
        limit,
        offset,
        where
    }).then((result) => {
        res.status(200).json({
            status: 'Success',
            limit,
            skip: offset,
            total: result.count,
            data: result.rows
        });
    }).catch((error) => {
        next(error);
    });
};

/** @type {import("express").RequestHandler} */
exports.detail = (req, res, next) => {
    const { id } = req.params;

    ActivityGroup.findOne({
        where: { id },
        include: [
            {
                model: TodoItem,
                as: "todo_items",
            },
        ]
    }).then((data) => {
        if (!data) {
            return res.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
            });

            // return res.status(404).json({
            //     name: 'NotFound',
            //     message: `No record found for id '${id}'`,
            //     code: 404,
            //     className: "not-found",
            //     errors: {}
            // });
        }

        res.status(200).json({
            status: 'Success',
            data
        });
    }).catch((error) => {
        next(error);
    });
};

/** @type {import("express").RequestHandler} */
exports.create = (req, res, next) => {
    const { email, title } = req.body;

    ActivityGroup.create({
        email,
        title,
    }).then((data) => {
        res.status(201).json({
            status: 'Success',
            data
        });
    }).catch((error) => {
        next(error);
    });
};


/** @type {import("express").RequestHandler} */
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    ActivityGroup.findByPk(id).then(data => {
        if (!data) {
            // throw new CustomError(404, `No record found for id '${id}'`);

            return res.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
            });
        }
        
        data.title = title;
        data.save().then(ag => res.status(200).json({
            status: 'Success',
            data: ag
        }));
    }).catch((error) => {
        next(error);
    });
};

/** @type {import("express").RequestHandler} */
exports.remove = async (req, res, next) => {
    const { pathId } = req.params; // parameter in path
    const { id } = req.query; // parameter in query for deleting multiple items

    let delIds = [];
    if (id) {
        delIds = id.split(',');
    } else if (pathId) {
        const ag = await ActivityGroup.findByPk(pathId);
        if (!ag) {
            return res.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${pathId} Not Found`,
            });
        }
    }
    
    if (!delIds.length) {
        // nothing to delete, return immediately
        return res.status(200).json({
            status: 'Success',
            data: {}
        });
    }

    ActivityGroup.destroy({
        where: { id: delIds }
    }).then((data) => {
        res.status(200).json({
            status: 'Success',
            data: {}
        });
    }).catch((error) => {
        next(error);
    });
};
