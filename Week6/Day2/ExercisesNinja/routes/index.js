import express from 'express';

const router = express.Router();

const emojis = [ '😀', '😂', '😍', '🤔', '😎', '😭', '😡', '👍', '🎉', '🚀' ];


router.get('/emojis', (req, res) => {
console.log(emojis);     
res.json(emojis);
    
});

router.get('/home', (req, res) => {
    res.sendFile('home.html', { root: 'pages' })
});


// Remove the /greetinfo route and handle everything in /greet
router.get('/greet', (req, res) => {
    const name = req.query.name;
    const emoji = req.query.emojis;
    
    if (name && emoji) {
        // If parameters exist, serve the greet.html page
        res.sendFile('greet.html', { root: 'pages' });
    } else {
        // If no parameters, you might want to redirect back to home
        res.redirect('/home');
    }
});


export default router;