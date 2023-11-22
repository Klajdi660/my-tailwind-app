import { FunctionComponent } from 'react';
import { Spin } from 'antd';
import "./Loading.css";

export const Loading: FunctionComponent = () => {
  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
};
