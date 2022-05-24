const { emailActionsEnum } = require('../constants')

module.exports = {
    [emailActionsEnum.WELCOME]: {
        subject: 'Welcome on board',
        templateName: 'welcome'
    },

    [emailActionsEnum.ORDER_COMPLETE]: {
        subject: 'Ypu order is Complete',
        templateName: 'orderDone'
    }
};
