import {
  Button, Card, Space, message,
} from 'antd';
import { useState } from 'react';

function WatchAsset() {
  const [watchAssetLoading, setWatchAssetLoading] = useState(false);
  const handleWatchAsset = () => {
    try {
      setWatchAssetLoading(true);
      window.okxwallet.bitcoin.watchAsset({ name: 'ordi' });
    } catch (_) {
      message.error('添加失败');
    } finally {
      setWatchAssetLoading(false);
    }
  };

  return (
    <Card title="签名 (signMessage)">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card direction="vertical">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              block
              onClick={handleWatchAsset}
              loading={watchAssetLoading}
            >
              添加代币
            </Button>
          </Space>
        </Card>
      </Space>
    </Card>
  );
}

export default WatchAsset;
