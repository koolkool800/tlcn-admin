import Select from '@components/common/Select';
import faqService from '@services/faqServices';
import { DefaultOptionType } from 'antd/es/cascader';
import { BaseOptionType } from 'antd/es/select';
import { Form } from 'antd';

import React, { useEffect, useState } from 'react';

const SelectCategory = ({ disabled }: { disabled?: boolean }) => {
  const [categories, setCategories] = useState<
    (BaseOptionType | DefaultOptionType)[]
  >([]);
  const fetchData = async () => {
    try {
      const faqCateRes = await faqService.getFaqCategories();
      setCategories(
        faqCateRes.data.map(
          (category) =>
            ({
              label: category.categoryName,
              value: category.categoryId,
            } || [])
        )
      );
    } catch (error) {
      /**
       * ERROR
       */
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Form.Item
      label="Select category"
      name="categoryId"
      rules={[{ required: true, message: 'This field is required!' }]}
      style={{ marginBottom: 12 }}
    >
      <Select
        disabled={disabled}
        placeholder="Select Category"
        options={categories}
        width={335}
        className="select-category"
      />
    </Form.Item>
  );
};

export default SelectCategory;
