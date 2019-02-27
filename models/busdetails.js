const mongoose = require('mongoose');

const busroute = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
const mainbusroute = mongoose.model('mainbusroute',busroute);

const busroutedetailschema = mongoose.Schema({
    bustype: {
        type: String,
        required: true
    },
    busnumber: {
        type: String,
        required: true
    },
    routes: {
        type: Array,
        required: true
    }
});
const busroutedetail = mongoose.model('busroutedetail',busroutedetailschema);


const buspriceschema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    busnumber: {
        type: String,
        required: true
    },
    full_ticket_price: {
        type: String,
        required: true
    },
    half_ticket_price: {
        type: String,
        required: true
    },
    senior_citizen_ticket_price: {
        type: String,
        required: true
    }
});
const buspricedetail = mongoose.model('buspricedetail',buspriceschema);
module.exports = {
    mainbusroute: mainbusroute,
    busroutedetail : busroutedetail,
    buspricedetail : buspricedetail
}
