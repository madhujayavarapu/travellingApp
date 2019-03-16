const mongoose = require('mongoose');

// const busroute = mongoose.Schema({
//     key: {
//         type: String,
//         required: true
//     },
//     value: {
//         type: String,
//         required: true
//     }
// });
// const mainbusroute = mongoose.model('mainbusroute',busroute);

// Routes Model
const routes = mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    buses: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    prices: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
const Routes = mongoose.model('routes', routes);

// Bus details Model
const busDetailsSchema = mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
        required: true
    },
    bus_number: {
        type: String,
        required: true
    },
    num_of_seats: {
        type: Number,
        required: true
    },
    stops: {
        type: [String],
        required: true
    },
    // dropping_points: {
    //     type: [String],
    //     required: true
    // }
})
const BusDetails = mongoose.model('bus_details', busDetailsSchema);

// Price Model
const priceSchema = mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    boarding_point: {
        type: String,
        required: true
    },
    dropping_point: {
        type: String,
        required: true
    },
    price: {
        type: {
            senior_citizen_price: Number,
            half_ticket_price: Number,
            full_ticket_price: Number
        },
        required: true
    }
})
const PriceDetails = mongoose.model('price_details', priceSchema);

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
    // mainbusroute: mainbusroute,
    // busroutedetail : busroutedetail,
    // buspricedetail : buspricedetail,
    Routes: Routes,
    BusDetails: BusDetails,
    PriceDetails: PriceDetails
}
