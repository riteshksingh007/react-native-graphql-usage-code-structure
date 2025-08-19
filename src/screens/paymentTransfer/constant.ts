const AppConstants = {
    labels: {
        recipientName: 'Recipient Name',
        accountNumber: 'Account Number',
        amount: 'Amount',
        iban: 'IBAN',
        swift: 'SWIFT Code',
        international: 'International Transfer',
        sendPayment: 'Send Payment',
        modalTitle: 'Payment Successful',
        modalMessage: 'Your payment has been sent successfully!',
        modalClosing: 'Closing in',
        confirmPayment: 'Confirm Payment',
        confirmMessage: 'Are you sure you want to send £',
    },
    placeholders: {
        recipientName: 'Enter recipient name',
        accountNumber: 'Enter account number',
        amount: '£ 0.00',
        iban: 'Enter IBAN',
        swift: 'Enter SWIFT code',
    },
};

const ValidationConstants = {
    regex: {
        name: /^[A-Za-z\s]{1,30}$/,
        account: /^[0-9]{1,30}$/,
        amount: /^[0-9]{1,10}$/,
        iban: /^[A-Za-z0-9]{34}$/,
        swift: /^[A-Z]{4}[-]{0,1}[A-Z]{2}[-]{0,1}[A-Z0-9]{2}[-]{0,1}[0-9]{2}$/,
    },
    errors: {
        name: 'Recipient Name must be only letters (max 30).',
        account: 'Account Number must be numeric (max 30).',
        amount: 'Amount must be numeric (max 10).',
        iban: 'IBAN must be 34 alphanumeric characters.',
        swift: 'SWIFT must match format AAAA-BB-CC-12.',
    },
};


export { AppConstants, ValidationConstants };