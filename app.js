// Imports
const express = require('express') // loads the express module
const app = express() // creates a http server with it
const port = 3000


// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Parse form requests
app.use(express.urlencoded({
	extended: true
}))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
	res.render('index', {})
})

app.get('/about', (req, res) => {
    res.render('about', { text: 'I am Jael!I am doing a server side validation project'})
})

function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
		return true
	} else {
		showError(input, 'Email ist nicht korrekt');
		return false
	}
}

function checkNumber(input) {
    const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true
    } else {
        showError(input, 'Telefonnummer ist nicht korrekt. Tipp: Schreibe sie ohne Leerzeichen');
        return false
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mind. ${min} Zeichen beinhalten`
        );
        return false
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} darf max. ${max} Zeichen beinhalten`
        );
        return false
    } else {
        showSuccess(input);
        return true
    }
}


app.post('/signup', (req, res) => {
	const vorname = req.body.vorname
	// TODO: perform server side validation 


    let nachnameError = undefined, vornameError = undefined;

    if(req.body.vorname === undefined || req.body.vorname === '')
      vornameError = `Vorname is mandatory!!`;
	  
	if(req.body.nachname === undefined || req.body.nachname === '')
      nachnameError = `Nachname is mandatory!!`;

	if (nachnameError || vornameError)
	   res.render('index', { nachnameError: nachnameError, vornameError: vornameError})
	else 
	   res.render('thankyou', { text: `Dear ${vorname} We have registered your registration`})
})

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))