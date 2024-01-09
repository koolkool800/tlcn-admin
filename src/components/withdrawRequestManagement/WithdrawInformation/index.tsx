import { H6, Information } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/format';
import dayjs from 'dayjs';
import { WithdrawDetailType } from 'interface/withdraw';
import * as S from './style';

export const TITLE_WITHDRAW = {
  request_information: 'REQUEST INFORMATION',
  user_information: 'USER INFORMATION',
  user_balance: 'USER BALANCE',
};

type Props = {
  title: string;
  withdrawDetail: WithdrawDetailType | undefined;
};

const WithdrawInformation = ({ title, withdrawDetail }: Props) => {
  return (
    <>
      {title === TITLE_WITHDRAW.request_information && (
        <S.Wrapper>
          <H6>{title}</H6>
          <Information col={6}>
            <div className="item">
              <div className="title">Request ID</div>
              <div className="value">{withdrawDetail?.requestId}</div>
            </div>
            <div className="item">
              <div className="title">Request time</div>
              <div className="value">
                {dayjs(withdrawDetail?.requestTime).format(
                  'YYYY.MM.DD (ddd) hA'
                )}
              </div>
            </div>
            <div className="item">
              <div className="title">Request Withdraw amount</div>
              <div className="value">
                {currencyFormat(Number(withdrawDetail?.withdrawAmount || 0))}
              </div>
            </div>
            <div className="item">
              <div className="title">Bank</div>
              <div className="value">{withdrawDetail?.bankName}</div>
            </div>
            <div className="item">
              <div className="title">Account</div>
              <div className="value">{withdrawDetail?.accountNumber}</div>
            </div>
            <div className="item">
              <div className="title">Name</div>
              <div className="value">{withdrawDetail?.userName}</div>
            </div>
          </Information>
        </S.Wrapper>
      )}

      {title === TITLE_WITHDRAW.user_information && (
        <S.Wrapper>
          <H6>{title}</H6>
          <S.Information>
            <div className="item">
              <div className="title">User ID</div>
              <div className="value">{withdrawDetail?.userId}</div>
            </div>
            <div className="item">
              <div className="title">Name</div>
              <div className="value">{withdrawDetail?.userName}</div>
            </div>
            <div className="item">
              <div className="title">Phone number</div>
              <div className="value">{withdrawDetail?.phoneNumber}</div>
            </div>
            <div className="item">
              <div className="title">Email</div>
              <div className="value">{withdrawDetail?.email}</div>
            </div>
            <div className="item">
              <div className="title">Default Address</div>
              <div className="value">{withdrawDetail?.address}</div>
            </div>
          </S.Information>
        </S.Wrapper>
      )}
      {title === TITLE_WITHDRAW.user_balance && (
        <S.Wrapper>
          <H6>{title}</H6>
          <S.Information>
            <div className="item">
              <div className="title">Current balance</div>
              <div className="value">
                {currencyFormat(Number(withdrawDetail?.currentBalance || 0))}
              </div>
            </div>
          </S.Information>
        </S.Wrapper>
      )}
    </>
  );
};

export default WithdrawInformation;
