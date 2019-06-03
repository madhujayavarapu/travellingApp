const express = require('express');
const Ticket = require('../models/ticket');
const utils = require('./utils.service');
const moment = require('moment');
const projConstants = require('../constants/proj.constant');

var service = {
  bookTicket: bookTicket,
  getTicketDetails: getTicketDetails,
  cancelTicket: cancelTicket,
  getAllTicketsOfUser: getAllTicketsOfUser
}

module.exports = service;

function bookTicket(req, res, next) {
  let userId = req.body.userId;
  let ticketInfo = req.body.ticketInfo;
  let timems = moment().format('x');
  let ticketDetails = {
    ticketInfo: ticketInfo,
    timeStamp: timems,
    ticketId: timems
  }

  Ticket.find({userId: userId}, (err, user) => {
    if(err){
      res.json({status: false, msg: 'Something went wrong', err: err});
    }else{
      if(!!user && user.length > 0){
        let query = {userId: userId};
        Ticket.findOneAndUpdate(query, {$push: {tickets: ticketDetails}}, (err, isSaved) => {
          if(err){
            res.json({status: false, msg: 'Something went wrong', err: err});
          }else{
            if(!!isSaved){
              res.json({status: true, msg: 'Ticket Confirmed'});
            }else{
              res.json({status: false, msg: 'Failed to book ticket'});
            }
          }
        })
      }else{
        let firstTicketOfUser = new Ticket({
          userId: userId,
          tickets: [ticketDetails]
        })
        firstTicketOfUser.save((err, isSaved) => {
          if(err){
            res.json({status: false, msg: 'Something went wrong', err: err});
          }else{
            if(!!isSaved){
              res.json({status: true, msg: 'Ticket Confirmed..Thanks for booking with Our App.'});
            }else{
              res.json({status: false, msg: 'Failed to book ticket'});
            }
          }
        })
      }
    }
  })
}

function getTicketDetails(req, res, next) {

}

function getAllTicketsOfUser(req, res, next) {
  let userId = req.body.userId;
  let query = {userId: userId};
  Ticket.find(query, (err, user) => {
    if(err){
      res.json({status: false, msg: "something went wrong"});
    }else{
      if(user.length > 0)
        res.json({status: true, tickets: formatTickets(user[0].tickets)});
      else
        res.json({status: false, tickets: [], msg: 'No tickets found'});
    }
  })
}

function cancelTicket(req, res, next) {

}


function formatTickets(tickets){
  tickets.forEach(function(value,key){
    tickets[key]['color'] = getcolor(value.ticketInfo);
    tickets[key]['date'] = moment(value.timeStamp, 'x').format('YYYY-MM-DD hh:mm');
  })
  return tickets;
}
function getcolor(value){
  let color = "";
  let ticketColorMapping = projConstants.TICKET_COLOR_MAPPING;
  if(utils.diffBwTimestamps(value.timestamp, moment(), 'hours') >= projConstants.TICKET_EXPIRE_TIME){
    color = "expired";
  }else{
    // need to remove spaces from ticketType.
    if(value['Half Ticket'] > 0){
      color += "half";
    }
    if(value['Full Ticket'] > 0){
      color += ((color !== '') ? "Full" : 'full');
    }
    if(value['Senior Citizen'] > 0){
      color += ((color !== '') ? "Senior" : 'senior'); 
    }
  }
  return !!ticketColorMapping[color] ? ticketColorMapping[color] : 'light'; 
   
} 

