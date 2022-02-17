import Joi = require('joi');

// POST /api/sendMail
export const sendMailRequestSchema = Joi.object({
    body: {
        to: Joi.array()
            .items(Joi.string().email({ tlds: false }))
            .min(1)
            .required(),
        from: Joi.string().required(),
        title: Joi.string().required(),
        txt: Joi.string(),
        html: Joi.string(),
        headers: Joi.object().pattern(/.*/, Joi.string()).default({}),
    },
    query: {},
    params: {},
    files: Joi.array(),
}).or('body.txt', 'body.html');
