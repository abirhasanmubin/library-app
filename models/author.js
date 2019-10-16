var mongoose = require('mongoose')
var moment = require('moment')

var Schema = mongoose.Schema

var AuthorSchema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
}
);


AuthorSchema.virtual('name').get(function () {
    return this.family_name + ', ' + this.first_name;
})

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id
})

AuthorSchema.virtual('lifespan').get(function () {
    var str = '';
    if (this.date_of_birth) {
        str = moment(this.date_of_birth).format('MMMM Do, YYYY')
    }
    str += ' - ';
    if (this.date_of_death) {
        str += moment(this.date_of_death).format('MMMM Do, YYYY')
    }
    return str
})

AuthorSchema.virtual('dob_formatted').get(function () {
    return moment(this.date_of_birth).format('YYYY-MM-DD')
})
AuthorSchema.virtual('dod_formatted').get(function () {
    return moment(this.date_of_death).format('YYYY-MM-DD')
})


module.exports = mongoose.model('Author', AuthorSchema)