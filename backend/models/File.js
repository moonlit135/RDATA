const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    file: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    uploadedDate: { type: Date, default: Date.now },
});

const File = mongoose.models.File || mongoose.model('File', fileSchema);

module.exports = File;
