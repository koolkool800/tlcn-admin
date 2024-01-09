const HTTP_STATUS = {
  EMAIL_IS_REGISTERED: 'Your email existed on Resell Ticket',
  AUTH_SNS_ERROR_400: 'Get Kakao account information failed',

  UNAUTHORIZED: 'Your login session has expired. Please log in again.',
  FORBIDDEN: 'Your login session has expired. Please log in again.',
  NOT_FOUND: 'NOT_FOUND|404',
  PATH_NOT_FOUND: 'PATH_NOT_FOUND|404',
  FILTER_NULL: 'FILTER_NULL|404',

  CAN_NOT_SEND_EMAIL: 'CAN_NOT_SEND_EMAIL|500',
  REQUEST_RESET_PW_NOT_FOUND: 'Request reset password not found',

  EMAIL_EXISTS_OTHER_SNS_400: 'EMAIL_EXISTS_OTHER_SNS_400|400',
  GOOGLE_ACCOUNT_NOT_VERIFIED_400: 'GOOGLE_ACCOUNT_NOT_VERIFIED_400|400',
  EMAIL_IS_REGISTERED_WITH_OTHER_TYPE:
    'EMAIL_IS_REGISTERED_WITH_OTHER_TYPE|400',
  Successfully: 'Successfully',
  VALIDATION_ERROR: 'Validation error.',

  VOUCHER_APPLIED: 'Coupon has been applied',

  PAYMENT_COMPLETED: 'Payment Completed',
  ON_SHIPPING: 'On Shipping',
  TRANSACTION_COMPLETED: 'Transaction Completed',
  CANCELLED: 'Canceled',
  DELIVERY_COMPLETED: 'Delivery Completed',
  CANCEL_COMPLETED: 'Cancel Completed',
  VOUCHER_INVALID: "This coupon doesn't meet the conditions to be applied",
  TICKET_NOT_FOUND: 'Ticket currently not available',
  TICKET_NOT_IN_IS_LISTING_STATUS: 'Ticket are not available for purchase',
  TICKET_NOT_AVAILABLE: 'Ticket is not available',
  PIN_TRANSACTION: 'PIN Transaction',
  ONLINE_TRANSACTION: 'Online Transaction',
  SELLER_SHIPMENT: 'Seller Shipment',
  EMAIL_EXISTED: 'Email existed in the system',
  INVALID_CREDENTIALS: 'Email or password is incorrect',
  SNS_INVALID_EMAIL_OR_NAME: 'Invalid email or name',
  FORGOT_PW_OTP_SENT: 'OTP is sent, please check your email',
  NOT_FOUND_USER: 'Email doesn’t not exist in system',
  REQUEST_RESET_PW_IS_EXPIRED: 'OTP code is expired, please request send again',
  RESET_PW_WRONG_OTP: 'Request reset password not found',
  VOUCHER_NOT_FOUND: 'Coupon not found',
  ALREADY_SEND_VERFIY_EMAIL:
    'This email has already been sent as an OTP previously.',
  INVALID_CODE: 'OTP has expired or is invalid.',
  MISSING_PARAM: 'The phone or password is empty',
  REQUEST_IS_PENDING_APPROVAL_400: 'Your request is pending approval',
  OTP_NOT_EXIST: 'OTP does not exist',
  INVALID_OTP: 'OTP invalid',
  ORDER_NOT_FOUND: 'Order not found',
  TICKET_SHIPMENT_ERROR: 'Please select only Pin Transaction',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  NICE_TOKEN_VERSION_ID_NOT_FOUND:
    'The user has not sent the first request (27.1) before => Cannot recognize the token_version_id',
  NICE_CONFIRMED_SUCCESS: 'Verify successfully',
  NICE_VERIFY_FAILED: 'Verify fail',
  PAYMENT_SUCCESS: 'Transaction is successful',
  PAYMENT_FAILED: 'Transaction failed',
  SAME_AUTHOR: `Same author can't buy ticket`,
  BUSINESS_REGISTRATION_REQUEST_APPROVED_400:
    'Business registration request be already approved',
  BUSINESS_REGISTRATION_REQUEST_NOT_FOUND_404:
    'Business registration request not found',
};

export default HTTP_STATUS;
