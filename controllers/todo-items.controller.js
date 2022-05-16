const { ActivityGroup, TodoItem } = require('../database/models');
const { defaultLimit } = require('../etc/my-config');

/** @type {import("express").RequestHandler} */
exports.list = (req, res, next) => {
    const limit = req.query.limit || defaultLimit;
    const { activity_group_id, page } = req.query;
    const offset = page ? (Number(page) - 1) * limit : 0

    const where = {};
    if (activity_group_id) {
        where.activity_group_id = activity_group_id;
    }

    TodoItem.findAndCountAll({
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

    TodoItem.findByPk(id).then((data) => {
        if (!data) {
            return res.status(404).json({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
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
    const { activity_group_id, priority, title } = req.body;

    TodoItem.create({
        activity_group_id,
        priority,
        title,
    }).then(async (data) => {
        // model instance will not have attributes
        // that is not set when inserting data.
        // do this to get all attributes available
        await data.reload();

        res.status(201).json({
            status: 'Success',
            data: data.toJSON()
        });
    }).catch((error) => {
        next(error);
    });
};


/** @type {import("express").RequestHandler} */
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { is_active, priority, title } = req.body;

    TodoItem.findByPk(id).then(async data => {
        if (!data) {
            return res.status(404).json({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
            });
        }
        
        data.title = title;
        if (priority) data.priority = priority;
        if (is_active) data.is_active = is_active;

        await data.save()
        await data.reload();
        res.status(200).json({
            status: 'Success',
            data
        });
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
        const todo = await TodoItem.findByPk(pathId);
        if (!todo) {
            return res.status(404).json({
                status: 'Not Found',
                message: `Todo with ID ${pathId} Not Found`,
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

    TodoItem.destroy({
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
