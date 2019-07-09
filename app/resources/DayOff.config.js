const {generateTimestamp,getDate}=require('../../app/DataTransaction')
const em = require('./emoticons.config')

const dateCalc  = require("add-subtract-date")

let months = [
    'January','February','March','April','May','June','July','August','September','October',
    'November','December'
]

let calendar = [
    [],
    [
        {text:'S',callback_data:'null'},{text:'M',callback_data:'null'},
        {text:'T',callback_data:'null'},{text:'W',callback_data:'null'},
        {text:'T',callback_data:'null'},{text:'F',callback_data:'null'},
         {text:'S',callback_data:'null'}],
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],//2
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],
    [
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'},{text:'-',callback_data:'-'},
        {text:'-',callback_data:'-'}],
    [
        {text:`${em.left} Prev`,callback_data:'-'},
        {text:`${em.home} Menu`,callback_data:'-'},
        {text:`${em.right} Next`,callback_data:'-'}
    ]
]

const startLayout=(prefix,from)=>{
    
    // let now = new Date()
    // now = new Date(now.getFullYear(),now.getMonth()+1)
    return generateLayout(prefix,'now',0)
}

const generateLayout = (prefix,option,count)=>{
    reset()
    let w = 2
    date = new Date()
    date = new Date(date.getFullYear(),date.getMonth())
    if(option==='next'){
        count++
    }else if(option==='prev'){
        count--
    }

    if(count!=0){
        date = dateCalc.add(date,parseInt(count),'months')
    }
    
    let nextMonth = `next#${count}`
    let prevMonth = `prev#${count}`
  
    let month = date.getMonth()

    calendar[0][0] = {text:months[month]+' '+date.getFullYear(),callback_data:`${prefix}-on-`}
    while(date.getMonth() === month){
        calendar[w][date.getDay()].text = date.getDate().toString() 
        calendar[w][date.getDay()].callback_data = prefix+'-onMenu-'+date.getDate()+
        '#'+w+'#'+date.getDay()
        date = new Date(dateCalc.add(date,1,'day'))
        if(date.getDay()==0){
            w++
        }
    }
    calendar[8][0].callback_data = `${prefix}-onChange-${prevMonth}`
    calendar[8][2].callback_data = `${prefix}-onChange-${nextMonth}`
    console.log(calendar)
    return {
        reply_markup: {
            inline_keyboard: calendar
        }
    }
}

const reset=()=>{
    for(let i = 2;i<8;i++){
        for(let j = 0;j<7;j++){
            calendar[i][j] = {text:'-',callback_data:'-'}
        }
    }
}

module.exports={
    startLayout,
    generateLayout
}