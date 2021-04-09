import { Button, Form } from 'antd';
import { buttonItemLayout } from 'utils/rules/form';

export default function FormItemList({ fields }) {
  return (
    <>
      {fields.map(field => {
        return <Form.Item {...field.props}>{field.ele}</Form.Item>;
      })}
      <Form.Item style={{ textAlign: 'right' }} {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </>
  );
}
