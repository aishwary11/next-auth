type SendEmailParams = {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: any;
};