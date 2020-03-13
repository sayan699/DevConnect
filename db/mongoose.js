const mongoose = require('mongoose')
var url = "mongodb://localhost:27020/taskdb"
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})