export const DEFAULT_PROFILE_PIC_URL: string = "assets/images/default.jpeg";
export const MAX_SEATS_PER_USER: number = 6;
export const OTP_EXPIRE_TIME: number = 2; // minutes.

export const CONTACT_INFO: object = {
    mail: 'ceozeroinnovationtechnology@gmail.com',
    phone: '9900735681',
    address: '-'
}
// Class names for each ticket. if you want to change the colors go to ticket.component.scss and you can change from there.
export const COLOR_MAPPING_TICKET = {
    '': 'normal_backgroud_color',
    '1': 'half_background_color',
    '2': 'full_background_color',
    '3': 'senior_background_color',
    '12': 'half_full_background_color',
    '23': 'full_senior_background_color',
    '13': 'half_senior_background_color',
    '123': 'half_full_senior_background_color',
    'expired': 'expired_background_color',
    'cancelled': 'cancelled_background_color'
}