//  Use nodemon for running scripts instead of node because then you won't have to stop the code everytime you make changes
// to the code.

const express = require('express')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')));

const {mergePdfs} = require('./merger')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

