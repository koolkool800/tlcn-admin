import illustration from '@assets/images/Illustration.png';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Select from '@components/common/Select';
import { CategoryBanner } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import bannerService from '@services/bannerService';
import fileServices from '@services/file';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form, Spin, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useForm } from 'antd/es/form/Form';
import { DefaultOptionType } from 'antd/es/select';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DocumentUpload } from 'iconsax-react';
import { BannerResponseResult } from 'interface/banner';
import { ObjectLiteral } from 'interface/general';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

type FormCreateBannerValue = {
  bannerImg: RcFile | string;
  thumbImg: RcFile | string;
  position: any;
  link: any;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type CreateBannerProps = {
  currentBanner?: BannerResponseResult;
  isView?: boolean;
};

const CreateBanner = ({ currentBanner, isView }: CreateBannerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = useForm<FormCreateBannerValue>();
  const paramsURL: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });

  const [positionOptions, setPositionOptions] = useState<DefaultOptionType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [bannerImgReview, setBannerImgReview] = useState<string>();
  const [thumbnailImgReview, setThumbnailImgReview] = useState<string>();

  /**
   * handle submit create or update banner
   * @param values
   */
  let urlThumbnail: string;
  let urlBanner: string;
  const onFinish = async (values: FormCreateBannerValue) => {
    setLoading(true);

    if (typeof values.bannerImg === 'string') {
      urlBanner = values.bannerImg;
    } else {
      const formData = new FormData();
      formData.append('file', values.bannerImg);
      try {
        const uploadResponse = await fileServices.uploadNewBannerImg(formData);
        urlBanner = uploadResponse.url;
      } catch (error) {
        console.log(error);
      }
    }
    if (paramsURL?.category !== CategoryBanner.SUB) {
      if (typeof values.thumbImg === 'string') {
        urlThumbnail = values.thumbImg;
      } else {
        const formData = new FormData();
        formData.append('file', values.thumbImg);
        try {
          const uploadResponse = await fileServices.uploadNewBannerImg(
            formData
          );
          urlThumbnail = uploadResponse.url;
        } catch (error) {
          console.log(error);
        }
      }
    }

    // UPDATE BANNER
    if (currentBanner) {
      try {
        const updateResponse = await bannerService.updateBanner({
          id: currentBanner.id,
          banner: urlBanner,
          category: currentBanner.category,
          link: values.link,
          position: values.position,
          status: currentBanner.status,
          thumbnail: urlThumbnail,
        });
        message.success(updateResponse.message);
        navigate(ROUTES.BANNER_MANAGEMENT);
      } catch (error: any) {
        message.error(error.message);
        console.log(error);
      }
    }

    // CREATE NEW BANNER
    if (!currentBanner) {
      try {
        const bannerResponse = await bannerService.createNewBanner({
          banner: urlBanner,
          category: paramsURL?.category
            ? paramsURL?.category
            : CategoryBanner.PRIMARY,
          link: values.link,
          position: values.position,
          thumbnail: urlThumbnail,
        });
        message.success(bannerResponse.message);
        navigate(ROUTES.BANNER_MANAGEMENT);
      } catch (error: any) {
        message.error(error?.message);
        console.log(error);
      }
    }
    setLoading(false);
  };

  /**
   * handle on change banner
   * @param param0
   */
  const onChangeBanner = ({ file }: UploadChangeParam<UploadFile<any>>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (isJpgOrPng) {
      getBase64(file?.originFileObj as RcFile).then((value) => {
        setBannerImgReview(value);
      });
      form.setFieldsValue({ bannerImg: file.originFileObj });
    }
  };

  /**
   * on crop image success
   * @param file
   */
  const onCropImgSuccess = (file: any) => {
    if (file) {
      getBase64(file as RcFile).then((value) => setThumbnailImgReview(value));
      form.setFieldsValue({ thumbImg: file });
    }
  };

  const fetchData = async () => {
    const positionResponse = await bannerService.getBannersPositionAvailable();
    if (
      paramsURL?.category === CategoryBanner.PRIMARY ||
      currentBanner?.category === CategoryBanner.PRIMARY
    ) {
      setPositionOptions(
        positionResponse.data.primary.map((item: any) => ({
          label: item,
          value: item,
        }))
      );
    }
    if (
      paramsURL?.category === CategoryBanner.SUB ||
      currentBanner?.category === CategoryBanner.SUB
    ) {
      setPositionOptions(
        positionResponse.data.sub.map((item: any) => ({
          label: item,
          value: item,
        }))
      );
    }
  };

  /**
   * fill banner detail to form
   * @param banner
   */
  const autoFillCurrentBanner = (banner: BannerResponseResult) => {
    form.setFieldsValue({
      bannerImg: banner.banner,
      link: banner.link,
      position: banner.position,
      thumbImg: banner.thumbnail,
    });
  };

  /**
   *  check file type befor crop
   * @param file
   * @param fileList
   * @returns
   */
  const beforeCropImg = (file: RcFile, fileList: RcFile[]): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(`${file.name} is not a JPG/PNG file`);
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchData();
    if (currentBanner) {
      autoFillCurrentBanner(currentBanner);
    }
  }, []);
  useEffect(() => {
    if (currentBanner) {
      autoFillCurrentBanner(currentBanner);
    }
  }, [currentBanner]);

  return (
    <S.Container>
      {loading && (
        <Spin size="large" spinning={loading} className="spin-loader" />
      )}
      <Form form={form} onFinish={onFinish} layout="vertical">
        <H5>
          {isView && currentBanner && 'VIEW'}
          {!isView && currentBanner && 'UPDATE'}
          {!currentBanner && !isView && 'CREATE'}
          {paramsURL?.category
            ? ` ${
                CategoryBanner[
                  paramsURL?.category as keyof typeof CategoryBanner
                ]
              } `
            : ' '}
          BANNER
        </H5>
        {paramsURL?.category !== CategoryBanner.SUB && (
          <>
            <div className="upload-img-container">
              <Form.Item
                required
                name="bannerImg"
                label="Banner (Recommended resolution: 1920 x 700 or aspect ratio 16:9)"
                rules={[{ required: true, message: 'This field is required!' }]}
              >
                <ImgCrop
                  modalTitle="Crop thumbnail"
                  aspect={86 / 120}
                  showReset
                  beforeCrop={beforeCropImg}
                  onModalOk={(value) => onCropImgSuccess(value)}
                  showGrid
                  cropShape="rect"
                >
                  <Upload
                    fileList={undefined}
                    customRequest={() => {}}
                    showUploadList={false}
                    disabled={isView}
                    onChange={onChangeBanner}
                  >
                    <div className="img-wrap">
                      {bannerImgReview || currentBanner?.banner ? (
                        <img
                          src={bannerImgReview || currentBanner?.banner}
                          alt="Banner set up"
                        />
                      ) : (
                        <div className="upload-default">
                          <img src={illustration} alt="Banner set up" />
                          <Typography>Start by uploading a file</Typography>

                          <Button
                            htmlType="submit"
                            width="100%"
                            color="#000"
                            bgcolor={theme.colors.primarySolid500}
                            hoverbgcolor={theme.colors.primary510}
                          >
                            <DocumentUpload size={16} /> Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </div>
            <div className="thumb-img-container">
              <Form.Item
                required
                name="thumbImg"
                label="Thumbnail"
                rules={[{ required: true, message: 'This field is required!' }]}
                className="thumb-form-item"
              >
                <div className="img-wrap">
                  {(thumbnailImgReview || currentBanner?.thumbnail) && (
                    <img
                      src={thumbnailImgReview || currentBanner?.thumbnail}
                      alt="Thumbnail set up"
                    />
                  )}
                </div>
              </Form.Item>
            </div>
          </>
        )}

        {paramsURL?.category === CategoryBanner.SUB && (
          <div className="upload-img-container">
            <Form.Item
              required
              name="bannerImg"
              label="Sub banner (Recommended resolution: 1920 x 480)"
              rules={[{ required: true, message: 'This field is required!' }]}
            >
              <Upload
                fileList={undefined}
                customRequest={() => {}}
                showUploadList={false}
                disabled={isView}
                onChange={onChangeBanner}
                beforeUpload={beforeCropImg}
                accept="image/png, image/jpeg"
              >
                <div className="img-wrap">
                  {bannerImgReview || currentBanner?.banner ? (
                    <img
                      src={bannerImgReview || currentBanner?.banner}
                      alt="Banner set up"
                    />
                  ) : (
                    <div className="upload-default">
                      <img src={illustration} alt="Banner set up" />
                      <Typography>Start by uploading a file</Typography>

                      <Button
                        htmlType="submit"
                        width="100%"
                        color="#000"
                        bgcolor={theme.colors.primarySolid500}
                        hoverbgcolor={theme.colors.primary510}
                      >
                        <DocumentUpload size={16} /> Upload
                      </Button>
                    </div>
                  )}
                </div>
              </Upload>
            </Form.Item>
          </div>
        )}
        <div className="action-container">
          <Form.Item
            required
            name="position"
            className="select-item"
            label="Position"
            rules={[{ required: true, message: 'This field is required!' }]}
          >
            <Select
              disabled={isView}
              className="cate-select"
              options={positionOptions}
            />
          </Form.Item>

          <Form.Item name="link" className="input-item" label="Link">
            <Input disabled={isView} placeholder="Enter here" />
          </Form.Item>
        </div>
        {!isView && (
          <Button
            htmlType="submit"
            width="fit-content"
            color="#000"
            bgcolor={theme.colors.primarySolid500}
            hoverbgcolor={theme.colors.primary510}
          >
            {!currentBanner ? 'Create' : 'Update'}
          </Button>
        )}
      </Form>
    </S.Container>
  );
};

export default CreateBanner;
