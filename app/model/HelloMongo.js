"use strict";
/**
 * Create Date: 2018-08-01,18:30
 * Created by MengLei.
 * Description: .
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const db = require('./../db/mongo');

const HelloSchema = new Schema({
    _id: {type: Schema.ObjectId},
    name: {type: String, default: ''},
    detail: {type: String, default: ''},
    count: {type: Number, default: 0}
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});

HelloSchema.set("toObject", {getters: true});
let M = db.model('Hello', HelloSchema, 'hello');

exports.getById = async id => await M.findById(id);

exports.getById1 = function (id, callback) {
    M.findById(id, function (err, doc) {
        if (err) {
            return callback(err);
        }
        return callback(null, doc);
    })
};

exports.findByName = async name => await M.find({name});

exports.list = async () => await M.find({});

exports.insert = async param => {
    let m = new M({_id: new ObjectId(), name: param.name, detail: param.detail});
    await m.save();
    return m;
};

exports.inc = async id => M.findByIdAndUpdate(id, {$inc: {count: 1}});



