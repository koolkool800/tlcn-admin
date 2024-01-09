/* eslint-disable no-prototype-builtins */
import DatePickerCustom from '@components/common/Datepicker';
import Input from '@components/common/Input';
import Map from '@components/common/Map';
import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import BoxClass from '@components/eventManagement/BoxClass';
import { ConcertType, DELIVERY_METHOD } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import eventService from '@services/eventService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { capitalize, checkEventDate, isValidUrl } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { getBase64 } from '@utils/getBase64';
import { $$ } from '@utils/handleMap';
import { Button, Col, Form, Row, Spin, Upload, message, Checkbox } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { ArrowRotateLeft, DocumentUpload, TransmitSquare } from 'iconsax-react';

import dayjs from 'dayjs';
import { CreateEventRequestBody } from 'interface/event';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckboxCustom from '@components/common/Checkbox';
import ListItem from '@components/eventManagement/ListItem';
import * as S from './style';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day');
};

function removeEmptyValues(object: any) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value === null || value === undefined || value === '') {
        delete object[key];
      }
    }
  }
}

const convertDataToBE = (eventId: string | number, data: any) => {
  const keys = Object.keys(data);
  if (eventId) {
    const result = keys.map((key) => {
      const { zone, restricted, ...rest } = data[key];
      return {
        name: key,
        groupId: key,
        isObstructed: !!restricted,
        ...rest,
        sections: Object.values(zone)
          .map((item: any) => {
            const { floor, id, ...restFloor } = item;
            return {
              ...restFloor,
              id,
              floors: floor?.map((j: any, ind: number) => {
                const { row, id: floorId, name: floorName, ...restRow } = j;
                return {
                  name: floorName,
                  id: floorId,
                  rows: row?.map((k: any) => {
                    const { name, id: rowId, ...restItem } = k;
                    return {
                      id: rowId,
                      name,
                    };
                  }),
                };
              }),
            };
          })
          ?.filter((item) => item.floors),
      };
    });
    return result;
  }
  const result = keys.map((key) => {
    const { zone, restricted, ...rest } = data[key];
    return {
      name: key,
      groupId: key,
      isObstructed: !!restricted,
      ...rest,
      sections: Object.values(zone)
        .map((item: any) => {
          const { floor, ...restFloor } = item;
          return {
            ...restFloor,
            floors: floor?.map((j: any, ind: number) => {
              const { row, name: floorName, ...restRow } = j;
              return {
                ...restRow,
                name: floorName,
                rows: row?.map((k: any) => {
                  const { name, ...restItem } = k;
                  return {
                    ...restItem,
                    name,
                  };
                }),
              };
            }),
          };
        })
        ?.filter((item) => item.floors),
    };
  });
  return result;
};

const CreateEvent = () => {
  const { id = '' } = useParams();
  const [uploadedSVG, setUploadedSVG] = useState<any>(null);
  const [dataFromMap, setDataFromMap] = useState<any[]>([]);
  const [form] = Form.useForm();
  const dataForm = Form.useWatch([], form);
  const [itemChange, setItemChange] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedParentId, setSelectParentId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
      });
    }
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // message.error(t('extensionImg'));
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error(t('limitImg'));
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const onFinish = async (values: any) => {
    const gElements = Array.from($$('g[id="Group"] > g '));
    if (!values.groups) {
      message.error('You need to specify the class, floor, or row.');
      return;
    }
    if (Object.keys(values.groups).length < gElements.length) {
      message.error(
        `You are missing ${
          gElements.length - Object.keys(values.groups).length
        } items in map`
      );
      return;
    }
    setLoading(true);
    const event: CreateEventRequestBody = {
      id,
      title: values?.eventName || undefined,
      eventType: values?.eventType || undefined,
      performanceDate: values?.performanceDate || undefined,
      place: values?.place || undefined,
      stageMap: !id ? uploadedSVG : undefined,
      coverImage: !isValidUrl(imageUrl) ? imageUrl : undefined,
      platformFee: Number(values?.buyerPay) || undefined,
      comissionFee: Number(values?.sellerPay.replace(/,/g, '')) || undefined,
      performer: values?.performer || undefined,
      groups: values?.groups ? convertDataToBE(id, values?.groups) : undefined,
      backgroundImage: '',
      deliveryMethods: values?.deliveryMethods,
    };
    removeEmptyValues(event);
    try {
      if (!id) {
        await eventService.post(event);
        message.success('success');
        setLoading(false);
        navigate(ROUTES.EVENT_MANAGEMENT);
      } else {
        await eventService.put(id, event);
        message.success('success');
        setLoading(false);
        navigate(ROUTES.EVENT_MANAGEMENT);
      }
    } catch (err: any) {
      message.error(err.message);
      setLoading(false);
    }
  };
  const UploadButton = (
    <div style={{ color: '#fff' }}>
      {loading ? <ArrowRotateLeft /> : <DocumentUpload />}
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );
  const onFinishFailed = (err: any) => {
    for (let i = 0; i < err.errorFields.length; i += 1) {
      if (err.errorFields[i].name[0] === 'groups') {
        console.log(err);
        message.error('You have omitted certain data on the map.');
        break;
      }
    }
  };
  const fetchData = async () => {
    const data = await eventService.getDetail(id);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      eventName: data.data.title,
      performer: data.data.performer,
      eventType: data.data.eventType,
      performanceDate: dayjs(data.data.performanceDate),
      place: data.data.place,
      buyerPay: data.data.platformFee,
      sellerPay: formatNumberWithCommas(data.data.commissionFee),
      deliveryMethods: data?.data?.deliveryMethods || [],
    });
    const convertDataMap = data.data.group.map((item: any) => {
      return {
        id: item.id || undefined,
        groupId: item.groupId,
        groupName: item.name,
        sections: item.section.map((i: any) => ({ name: i.name, id: i.id })),
        isObstructed: item.isObstructed,
        originalPrice: item.originalPrice,
        minPrice: item.minPrice,
        color: item.color,
        floors: item.section.map((i: any) => ({
          floors: i.floor,
          name: i.name,
        })),
      };
    });
    setUploadedSVG(data.data.stageMap);
    setDataFromMap(convertDataMap);
    setSelectedSection(convertDataMap[0].sections[0].name);
    setSelectParentId(convertDataMap[0].groupId);
    setImageUrl(data.data.coverImage);
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
    return () => {
      form.resetFields();
      setUploadedSVG('');
      form.setFieldValue('groups', {});
      setDataFromMap([]);
      setItemChange(false);
    };
  }, [id]);
  return (
    <S.Wrapper>
      <H5>{!id ? `CREATE EVENT` : `UPDATE EVENT`}</H5>
      <Form.Provider>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
          onFinishFailed={onFinishFailed}
          onValuesChange={(a, b) => {
            if (id) {
              setItemChange(true);
            }
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Event name"
                name="eventName"
                rules={[{ required: true, message: 'Event name is required' }]}
              >
                <Input placeholder="Enter event name" />
              </Form.Item>
              <Form.Item
                label="Performer"
                name="performer"
                rules={[{ required: true, message: 'Performer is required' }]}
              >
                <Input placeholder="Enter event performer" />
              </Form.Item>
              <Form.Item
                label="Event type"
                name="eventType"
                rules={[{ required: true, message: 'Event type is required' }]}
              >
                <Select placeholder="Event Type" options={ConcertType}>
                  {ConcertType.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <DatePickerCustom
                format="YYYY-MM-DD HH:mm:ss"
                label="Performance date"
                name="performanceDate"
                placeholder="Select time"
                disabledDate={disabledDate}
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                rules={[
                  { required: true, message: 'performance date is required' },
                ]}
              />
              <Form.Item
                label="Place"
                name="place"
                rules={[{ required: true, message: 'Place  is required' }]}
              >
                <Input placeholder="Enter performance place" />
              </Form.Item>

              <Form.Item
                label="Delivery method"
                name="deliveryMethods"
                rules={[{ required: true, message: 'Choose delivery method' }]}
              >
                <Checkbox.Group>
                  {!checkEventDate(dataForm?.performanceDate)
                    ? Object.keys(DELIVERY_METHOD).map((item) => (
                        <CheckboxCustom value={item} key={item}>
                          {capitalize(item?.replace('_', ' ')?.toLowerCase())}
                        </CheckboxCustom>
                      ))
                    : Object.keys(DELIVERY_METHOD)
                        .filter((_, index) => index !== 0)
                        ?.map((item) => (
                          <CheckboxCustom value={item} key={item}>
                            {capitalize(item?.replace('_', ' ')?.toLowerCase())}
                          </CheckboxCustom>
                        ))}
                </Checkbox.Group>
              </Form.Item>

              <div className="container-platform-fee">
                <Form.Item
                  label="Platform fee (Buyer pay %)"
                  name="buyerPay"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, valCurrent) {
                        if (valCurrent > 100) {
                          return Promise.reject(new Error('Maximum is 100%'));
                        }

                        if (!valCurrent) {
                          return Promise.reject(
                            new Error('Please input platform fee!')
                          );
                        }

                        if (!valCurrent || valCurrent.length > 10) {
                          return Promise.reject(
                            new Error('platform fee invalid!')
                          );
                        }

                        return Promise.resolve(
                          'Please input clearance platform fee!'
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    placeholder="Enter platform fee"
                    max={100}
                    type="input"
                    suffix="%"
                    value={dataForm?.buyerPay}
                  />
                </Form.Item>
                <Form.Item
                  label="Commission fee (Seller pay)"
                  name="sellerPay"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, valCurrent: string) {
                        const inputValue = valCurrent?.replace(/\D/g, '');
                        if (!valCurrent) {
                          return Promise.reject(
                            new Error('Please input platform fee!')
                          );
                        }

                        if (!Number(inputValue) || inputValue.length > 10) {
                          return Promise.reject(
                            new Error('platform fee invalid!')
                          );
                        }
                        return Promise.resolve(
                          'Please input clearance platform fee!'
                        );
                      },
                    }),
                  ]}
                  getValueFromEvent={(event) => {
                    const inputValue = event.target.value;
                    const numericValue = parseFloat(
                      inputValue.replace(/[^0-9.]/g, '')
                    );

                    if (!Number.isNaN(numericValue)) {
                      return formatNumberWithCommas(numericValue);
                    }
                    return event.target.value;
                  }}
                >
                  <Input
                    placeholder="Enter platform fee ($)"
                    suffix="$"
                    value={formatNumberWithCommas(dataForm?.sellerPay ?? 0)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <Form.Item
                name="coverImage"
                label="Upload Cover Image (Recommended aspect ratio 3/4 )"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    validator: (_, file) => {
                      if (imageUrl) {
                        return Promise.resolve();
                      }
                      const validTypes = ['image/jpeg', 'image/png'];
                      if (file.type && !validTypes.includes(file.type)) {
                        return Promise.reject(
                          new Error('Only JPEG and PNG files are allowed.')
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload
                  maxCount={1}
                  accept="image/*"
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  showUploadList={false}
                  style={{ width: '100%' }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    UploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          {!id && (
            <Form.Item
              name="stageMap"
              label="Upload SVG"
              valuePropName="fileList"
              className="formItem-svg"
              getValueFromEvent={(e) => {
                const fileList = normFile(e);
                if (fileList && fileList.length > 0) {
                  const reader = new FileReader();
                  reader.onload = (i: any) => {
                    setUploadedSVG(i?.target?.result);
                    form.setFieldValue('groups', {});
                    setDataFromMap([]);
                  };
                  form.setFieldValue('groups', {});
                  reader.readAsText(fileList[0].originFileObj);
                }
                return fileList;
              }}
              rules={[
                {
                  validator: (_, file) => {
                    if (uploadedSVG) {
                      return Promise.resolve();
                    }
                    const validTypes = ['image/svg+xml'];
                    if (file.type && !validTypes.includes(file.type)) {
                      return Promise.reject(
                        new Error('Only SVG files are allowed.')
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                className="upload-svg"
                maxCount={1}
                beforeUpload={() => false}
                name="logo"
                action="/upload.do"
                accept=".svg"
              >
                <Button icon={<TransmitSquare size="24" />}>
                  Click to upload stadium
                </Button>
              </Upload>
            </Form.Item>
          )}
          {uploadedSVG && (
            <div style={{ display: 'flex', gap: 20 }}>
              <Map
                stadiumMap={uploadedSVG}
                onClick={(value: { groupId: string; sections: string[] }) => {
                  setDataFromMap((prev: any) => {
                    if (
                      prev.some((item: any) => item.groupId === value.groupId)
                    ) {
                      return prev;
                    }
                    return [...prev, value];
                  });
                }}
                selectedClass={selectedParentId}
                onClickItem={(value: any) => {
                  setSelectedSection(value.section);
                  setSelectParentId(value.groupName);
                }}
              />
              <ListItem form={dataForm} />
            </div>
          )}
          {dataFromMap.map((item, index) => (
            <BoxClass
              key={`${item.groupId} ${item.id}`}
              eventId={id}
              dataMap={item}
              selectedSection={selectedSection}
              isShown={item.groupId === selectedParentId}
            />
          ))}
          <div className="container-button-submit">
            <div style={{ width: 200 }}>
              <PrimaryButton
                htmlType="submit"
                disabled={id ? !itemChange : false}
              >
                {!id ? 'CREATE' : 'UPDATE'}
              </PrimaryButton>
            </div>
          </div>
        </Form>
      </Form.Provider>
      {loading && (
        <div className="container-loading">
          <Spin />
        </div>
      )}
    </S.Wrapper>
  );
};

export default CreateEvent;
