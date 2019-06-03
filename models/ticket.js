const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    tickets: {
        type: Array,
        requried: true
    }
});

const Ticket =  mongoose.model('tickets',TicketSchema);

module.exports = Ticket
