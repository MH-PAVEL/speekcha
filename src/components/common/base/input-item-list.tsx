import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import React from 'react';
import { withTranslation } from '../../../../i18n';

// import { withTranslation, Link } from '../../../../i18n';
// export const TranslatedCopmonent = withTranslation('components')()
// export { TranslatedList as OrderSearchFilter };
// import { useTranslation, Link } from '../../../../i18n';
// const { t } = useTranslation('components');

interface IFormInputItem {
  fields: FormItemProps[];
  t: any;
}

const FormInputItem = ({ fields, t }: IFormInputItem) => {
  return (
    <>
      {fields.map((field) => (
        <Form.Item
          {...field}
          label={t(field.label)}
          rules={field.rules ? field.rules['message'] : []}
          key={field.id || (field.name || field.fieldKey).toString()}
        >
          {field.children}
        </Form.Item>
      ))}
    </>
  );
};

export default withTranslation('components')(FormInputItem);
