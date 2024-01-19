const app = require('./app')
require('dotenv').config()
const {connect} = require('mongoose')

connect(process.env.CONN_STR, {useNewUrlParser:true , useUnifiedTopology: false}).then((conn) => {
    //console.log(conn)
    console.log('DB Connection Successful')
}).catch(err => console.log(err))

const PORT = process.env.PORT || 3000
app.listen(PORT, 'localhost', () => {
    console.log(`Server running on port ${PORT}`)
})
