//Iniziallizzazione moduli
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const snoowrap = require('snoowrap');
//Creiamo il bot
const bot = new Telegraf("770418062:AAHSN_83-hwcwv8O5s_vgXTYEsDFqKsaRYo")

//Variabili globali
var buttons;
const keyboard = [
    ['🔥 Partite'], // Row1 with 2 buttons
    ['⚙️ Live Tv', '📞 Eventi programmati']
  ];


var redditPostRaw = [];
var redditPost = [];
var AllstreamerRaw = [];
var Allstreamer = [];

//Configuariamo le api di reddit
const r = new snoowrap({
    userAgent: 'WeTorUs',
    clientId: 'H34lVQsigWrO4A',
    clientSecret: '4yFlJ78P5XM3Wg7NrMcGx9Xn324',
    refreshToken: '94025705152-B-P770-BLL1p2Ob9kLwmfVpJZoc'
  });


//Funzioni GET
function getRedditGames(){
    r._get({uri: 'r/nbastreams/'}).map(post => {
        if(post.link_flair_text == "Game Thread")
        redditPostRaw.push([post.title,post.id]);
    });
    
    console.log("Partite caricate");
}

function getFutureEvents(ctx){
    r._get({uri: 'r/nbastreams/'}).map(posts => {
        if(posts.link_flair_text == "Announcement"){
            console.log(posts.id);
            
            r.getSubmission(posts.id).fetch().then((sub) => {
                console.log(sub);
                
            })
        }
    });
    
}

//Funzioni utili
function creaOggetto(){
    redditPost = redditPostRaw.reduce(function(result, item, index, array) {
        var titolo = item[0];
        var url = item[1];        
        result[titolo] = url;
        return result;  
      }, {})  
}

function checknull(){
    return redditPostRaw.length > 0 ? false : true;
}

//Primo avvio bot
bot.command('start', ({ reply }) => {    
    return reply('Benvenuto, seleziona una voce nel menu', Markup
      .keyboard(keyboard)
      .oneTime()
      .resize()
      .extra()
    )
  })


//Se preme il pulsante partite
bot.hears('🔥 Partite', function(ctx) { 
    getRedditGames();   
    creaOggetto();    
    if(checknull()){
        ctx.reply('Mi dispiace nessuna partita in programma', Extra.HTML().markup((m) =>
        m.inlineKeyboard([m.callbackButton("Nessuna partita programmata","id:null")], {columns: 1})))
    } else {
        buttons = Object.keys(redditPost).map(key => Markup.callbackButton(key, `id:${redditPost[key]}`));
        ctx.reply('Partite in corso:', Extra.HTML().markup((m) =>
        m.inlineKeyboard(buttons, {columns: 1})))
    }
})

//Se preme il pulsante Eventi programmati
bot.hears('📞 Eventi programmati', function(ctx) {    
    getFutureEvents(ctx);
})


//Elaboriamo le query
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    var action = callbackQuery.update.callback_query.data;
    //Passato id della subreddit di un thread partita
    if(action.startsWith("id:")){
        var urlPost = action.split("id:")[1];
        console.log(callbackQuery.update.callback_query.from.username+" ha richiesta una partità con id="+urlPost);
        if(urlPost == "null"){
            callbackQuery.answerCbQuery("Riprova più tardi");
        } else {
        r.getSubmission(urlPost).fetch().then(submission => {
            //da qui ora trova il link a youpit
            // callbackQuery.reply(`<b>${submission.title}</b>`, Extra.HTML().markup((m) =>
            // m.inlineKeyboard([Markup.urlButton("Apri url",submission.url)], {columns: 1})))
            var urlStreams;
            var titleGame;
            var Allstreamer;
            
            submission.fetch().comments.map(comment => {
                if(comment.author.name == "youpit01"){
                    urlStreams = comment.body.match(/\bhttp?:\/\/\S+/gi);
                    urlStreams = urlStreams[0].split(")")[0];
                    titleGame = comment.author.name;
                } else if(comment.author.name == "buffstreams" && urlStreams == undefined){
                    urlStreams = comment.body.match(/\bhttp?:\/\/\S+/gi);
                    urlStreams = urlStreams[0].split(")")[0];
                    titleGame = comment.author.name;                
                }
            }).then(()=>{
                console.log(urlStreams);
                callbackQuery.reply(`<b>${titleGame}</b>`, Extra.HTML().markup((m) =>
                m.inlineKeyboard([Markup.urlButton("Guarda la live",urlStreams),Markup.callbackButton("Apri tutti gli stream",`streamer:${urlPost}`)], {columns: 1})))
            })  
          });
          callbackQuery.answerCbQuery("Caricamento live");
        }
    }
    if(action.startsWith("streamer:")){
        var urlPost = action.split("streamer:")[1];
        console.log(callbackQuery.update.callback_query.from.username+" ha richiesta tutti gli stream della partita con id="+urlPost);

        r.getSubmission(urlPost).fetch().then(submission => {

            
            var urlStreams;
            var pattern = /\bhttp?:\/\/\S+/gi;
            
            submission.fetch().comments.map(comment => {
                
                
                if(comment.author.name != 'vipstreams' || comment.author.name != 'banofgood' || comment.author.name != 'AdelaideAndre' || comment.author.name != 'AutoModerator'){
                    urlStreams = pattern.exec(comment.body);
                    // urlStreams = urlStreams[0].split(")")[0];
                // AllstreamerRaw.push([comment.author.name,urlStreams]);
                }
                if(urlStreams[0])
                console.log(comment.author.name,urlStreams[0]);
                
                
            }).then(()=>{
                console.log(AllstreamerRaw);
                
            })
   
          });

        callbackQuery.answerCbQuery("Caricamento streamer");
    }
    
})
 


bot.launch().then(()=>{console.log("Bot avviato");getRedditGames();})
