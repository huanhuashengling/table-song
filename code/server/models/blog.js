import db from '../mongodb'
let blogSchema = db.Schema({
    type: String,
    sexType: String,
    studentName: String,
    studentID: String,
    title: String,
    desc: String,
    html: String,
    markdown: String,
    level: Number,
    github: String,
    source: Number,
    isVisible: Boolean,
    releaseTime: Date,
    createTime: { type: Date, default: Date.now}
})
export default db.model('blog', blogSchema)