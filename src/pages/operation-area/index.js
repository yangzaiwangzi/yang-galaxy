// import styled from '@emotion/styled';
import { useContext, useMemo } from 'react';
import { RootContext } from './../../context';
import { Button } from 'antd';
// 渲染 中间 操作区
export const OperationArea = () => {
  const { container } = useContext(RootContext);
  return <CreateChunkItem container={container}></CreateChunkItem>;
};

// 循环+递归 渲染 json
const CreateChunkItem = ({ container }) => {
  let children = null;
  if (container?.children?.length) {
    children = container.children.map((item, index) => {
      return <CreateChunkItem container={item} key={index}></CreateChunkItem>;
    });
  }
  return <CreateComponent type={container.type} children={children} protoTypes={container.protoTypes} id={container.id}></CreateComponent>;
};
// 渲染 具体 antD 组件
const CreateComponent = ({ id, type, children, protoTypes = [] }) => {
  // (protoTypes 的数组 转为 对象 ) & (去除属性为空)&(添加到组件上)
  const attrs = useMemo(() => {
    const _ = {};
    protoTypes.forEach((item) => {
      item.default && (_[item.name] = item.default);
    });
    return _;
  }, [protoTypes]);
  if (type === 'Button') {
    return <Button {...attrs}>按钮</Button>;
  } else {
    return (
      <div style={{ height: '100%' }} data-id={id}>
        {children}
      </div>
    );
  }
};
