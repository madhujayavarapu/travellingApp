let  PROJ_CONSTANTS = {
  OTP_EXPIRE_TIME: 2, // in minutes
  SENDER_MAIL: 'REPLACEWITHMAIL',
  SENDER_MAIL_PASSWORD: 'REPLACEWITHPASSWORD',
  SENDER_MOBILE: '',
  SMS_LOGIN_ID: 'REPLACEWITHSMSLOGINID',
  SMS_PASSWORD: 'REPLACEWITHSMSPASSWORD',
  TICKET_EXPIRE_TIME: 24, // in hours
  TICKET_COLOR_MAPPING: {
    'half': 'primary',
    'full': 'success',
    'senior': 'warning',
    'halfFull': 'tertiary',
    'halfSenior': 'medium',
    'fullSenior': 'secondary',
    'halfFullSenior': 'danger',
    'expired': 'dark'
  }
}

// let USER_ROLES = {
//   ADMIN: '1',
//   NORMAL: '5'
// }

module.exports = PROJ_CONSTANTS;
// module.exports = USER_ROLES;
