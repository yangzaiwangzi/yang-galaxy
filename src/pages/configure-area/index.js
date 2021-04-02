import { useContext } from 'react';
import styled from '@emotion/styled';
import { RootContext } from './../../context';
import { Switch, Input, Select, Form } from 'antd';
// 渲染 左侧 参数配置区域
export const ConfigureArea = () => {
  const { current: currentChunkData } = useContext(RootContext);
  return currentChunkData ? (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
      <ViewConfigure currentChunkData={currentChunkData}></ViewConfigure>
    </Form>
  ) : (
    <Text>无节点获取焦点</Text>
  );
};
// 循环+递归 渲染 json
const ViewConfigure = ({ currentChunkData }) => {
  if (currentChunkData?.protoTypes?.length) {
    return currentChunkData.protoTypes.map((item, index) => {
      return <RenderConfigure protoType={item} id={currentChunkData.id} key={index}></RenderConfigure>;
    });
  }
  return '';
};
// 将组件配置项 具体 渲染 antD 组件
const RenderConfigure = ({ protoType, id }) => {
  const { setCurrent } = useContext(RootContext);
  const onChange = (id, name, value) => {
    setCurrent(id, name, value);
  };
  switch (protoType.type) {
    case 'switch':
      return (
        <Form.Item label={protoType.name}>
          <Switch
            size="small"
            checked={protoType.default}
            onChange={(value) => {
              onChange(id, protoType.name, value);
            }}
          />
        </Form.Item>
      );
    case 'input':
      return (
        <Form.Item label={protoType.name}>
          <Input
            value={protoType.default}
            onChange={(e) => {
              onChange(id, protoType.name, e.target.value);
            }}
          />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={protoType.name}>
          <Select
            defaultValue={protoType.default}
            onChange={(value) => {
              onChange(id, protoType.name, value);
            }}
          >
            {protoType.options.map((item) => {
              return (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    default:
      return (
        <Form.Item label={protoType.name}>
          <span>&gt;无对应配置组件&lt;</span>
        </Form.Item>
      );
  }
};

const Text = styled.p`
  text-align: center;
  padding: 10px;
`;
