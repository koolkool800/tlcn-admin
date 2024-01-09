import Button from '@components/common/Button';
import WithdrawInformation, {
  TITLE_WITHDRAW,
} from '@components/withdrawRequestManagement/WithdrawInformation';
import { STATUS_KEY } from '@constants/codeConstants';
import withdrawService from '@services/withdrawService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { message } from 'antd';
import { ObjectLiteral } from 'interface/general';
import { WithdrawDetailType } from 'interface/withdraw';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';

const WithdrawDetail = () => {
  const navigate = useNavigate();
  const params: ObjectLiteral = useParams();
  const [withdrawDetail, setWithDrawDetail] = useState<WithdrawDetailType>();

  /**
   * Fetch withdraw detail
   * @returns {Promise<void>}
   */
  const fetchWithdrawDetail = async (): Promise<void> => {
    try {
      const res = await withdrawService.getWithdrawDetail(String(params?.id));
      setWithDrawDetail(res?.data);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchWithdrawDetail();
    }
  }, [params?.id]);

  const handleApprovalWithdraw = async (): Promise<void> => {
    try {
      const res = await withdrawService.approvalWithdraw(String(params?.id));
      message.success(res.message);
      navigate(-1);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <S.Wrapper>
      <H5>WITHDRAW REQUEST DETAIL</H5>
      <WithdrawInformation
        title={TITLE_WITHDRAW.request_information}
        withdrawDetail={withdrawDetail}
      />
      <WithdrawInformation
        title={TITLE_WITHDRAW.user_information}
        withdrawDetail={withdrawDetail}
      />
      <WithdrawInformation
        title={TITLE_WITHDRAW.user_balance}
        withdrawDetail={withdrawDetail}
      />
      {withdrawDetail?.status === STATUS_KEY.Pending && (
        <div className="btn">
          <Button
            className="btn-approve"
            color="#000"
            bgcolor={theme.colors.primarySolid500}
            onClick={handleApprovalWithdraw}
          >
            Approve
          </Button>
        </div>
      )}
    </S.Wrapper>
  );
};

export default WithdrawDetail;
