import {
  Alert,
  Button, Card, Col, Row, Space, message,
} from 'antd';
import { useState } from 'react';
import GetEncryptPublicKey from './components/GetEncryptPublicKey';

function SignMessage({ account, chainId }) {
  const [eth_signLoading, setEth_signLoading] = useState(false);
  const [ethSignRet, setEthSignRet] = useState('');
  const eth_sign = async () => {
    try {
      setEth_signLoading(true);
      // const msg = 'hello world';
      // const hashMsg = '0x' +
      // keccak256(`\x19Ethereum Signed Message:\n${msg.length}${msg}`).toString('hex');
      const hashMsg = '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0';
      const ret = await ethereum.request({
        method: 'eth_sign',
        params: [account, hashMsg],
      });
      setEthSignRet(ret);
    } catch (error) {
      message.error(error.message);
    } finally {
      setEth_signLoading(false);
    }
  };

  const [personal_signLoading, setPersonal_signLoading] = useState(false);
  const [personalSignRet, setPersonalSignRet] = useState('');
  const handlePersonalSign = async () => {
    try {
      setPersonal_signLoading(true);
      const msg = 'Example `personal_sign` message';
      const ret = await ethereum.request({
        method: 'personal_sign',
        params: [msg, account, 'Example password'],
      });
      setPersonalSignRet(ret);
    } catch (error) {
      message.error(error.message);
    } finally {
      setPersonal_signLoading(false);
    }
  };

  const [typedDataSignLoading, setTypedDataSignLoading] = useState(false);
  const [typedDataSignRet, setTypedDataSignRet] = useState('');
  const typedDataMsg = [
    {
      type: 'string',
      name: 'Name',
      value: 'Luo Quan Quan',
    },
    {
      type: 'uint32',
      name: 'age',
      value: '18',
    },
    {
      type: 'string',
      name: 'Hobby',
      value: 'sing dance rap basketball',
    },
  ];
  const handleTypedDataSign = async () => {
    try {
      setTypedDataSignLoading(true);
      const ret = await ethereum.request({
        method: 'eth_signTypedData',
        params: [typedDataMsg, account],
      });
      setTypedDataSignRet(ret);
    } catch (error) {
      message.error(error.message);
    } finally {
      setTypedDataSignLoading(false);
    }
  };

  const [eth_signTypedData_v3Loading, setEth_signTypedData_v3Loading] = useState(false);
  const [eth_signTypedData_v3Ret, setEth_signTypedData_v3Ret] = useState('');
  const eth_signTypedData_v3 = async () => {
    const msgParams = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      message: {
        from: {
          name: 'Cow',
          test: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    };

    try {
      setEth_signTypedData_v3Loading(false);
      const ret = await ethereum.request({
        method: 'eth_signTypedData_v3',
        params: [account, JSON.stringify(msgParams)],
      });
      setEth_signTypedData_v3Ret(ret);
    } catch (error) {
      message.error(error.message);
    } finally {
      setEth_signTypedData_v3Loading(false);
    }
  };

  const [eth_signTypedData_v4Loading, setEth_signTypedData_v4Loading] = useState(false);
  const [eth_signTypedData_v4Ret, setEth_signTypedData_v4Ret] = useState('');
  const eth_signTypedData_v4 = async () => {
    const msgParams = {
      domain: {
        chainId: chainId.toString(),
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };

    try {
      setEth_signTypedData_v4Loading(true);
      const ret = await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [account, JSON.stringify(msgParams)],
      });
      setEth_signTypedData_v4Ret(ret);
    } catch (error) {
      message.error(error.message);
    } finally {
      setEth_signTypedData_v4Loading(false);
    }
  };

  const [eth_signTypedData_v4_withErrorLoading,
    setEth_signTypedData_v4_withErrorLoading] = useState(false);
  const [eth_signTypedData_v4_withErrorRet, setEth_signTypedData_v4_withErrorRet] = useState('');
  const eth_signTypedData_v4_withError = () => {
    setEth_signTypedData_v4_withErrorLoading(true);
    ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [
        account,
        JSON.stringify({
          domain: {
            chainId: chainId.toString(),
            name: 'Ether Mail',
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            version: '1',
          },
          message: {
            '⁢target＂:＂THIS IS THE FAKE TARGET＂,＂message':
              'THIS IS THE FAKE MESSAGE＂⁢}⁢ }⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx⁢xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            target: '0x0101010101010101010101010101010101010101',
            message: 'Howdy',
          },
          primaryType: 'Mail',
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            Group: [
              { name: 'name', type: 'string' },
              { name: 'members', type: 'Person[]' },
            ],
            Mail: [
              { name: 'from', type: 'Person' },
              { name: 'to', type: 'Person[]' },
              { name: 'contents', type: 'string' },
            ],
            Person: [
              { name: 'name', type: 'string' },
              { name: 'wallets', type: 'address[]' },
            ],
          },
        }),
      ],
    }).then((resp) => {
      setEth_signTypedData_v4_withErrorRet(resp);
    }).catch((error) => {
      message.error(error.message);
    }).finally(() => {
      setEth_signTypedData_v4_withErrorLoading(false);
    });
  };

  return (
    <Card title="签名">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card direction="vertical" title="Eth Sign">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  loading={eth_signLoading}
                  disabled={!account}
                  block
                  onClick={eth_sign}
                >
                  eth_sign

                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={ethSignRet}
                />
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card direction="vertical" title="Personal Sign">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  disabled={!account}
                  onClick={handlePersonalSign}
                  loading={personal_signLoading}
                >
                  personal_sign
                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={personalSignRet}
                />
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card direction="vertical" title="Sign Typed Data">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  disabled={!account}
                  loading={typedDataSignLoading}
                  onClick={handleTypedDataSign}
                >
                  eth_signTypedData
                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={typedDataSignRet}
                />
              </Space>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card direction="vertical" title="Sign Typed Data V3">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  disabled={!account}
                  onClick={eth_signTypedData_v3}
                  loading={eth_signTypedData_v3Loading}
                >
                  eth_signTypedData_v3
                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={eth_signTypedData_v3Ret}
                />
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card direction="vertical" title="Sign Typed Data V4">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  disabled={!account}
                  onClick={eth_signTypedData_v4}
                  loading={eth_signTypedData_v4Loading}
                >
                  eth_signTypedData_v4
                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={eth_signTypedData_v4Ret}
                />
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card direction="vertical" title="Sign Typed Data V4 with Error">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  disabled={!account}
                  onClick={eth_signTypedData_v4_withError}
                  loading={eth_signTypedData_v4_withErrorLoading}
                >
                  eth_signTypedData_v4(withError)
                </Button>
                <Alert
                  type="info"
                  message="Result"
                  description={eth_signTypedData_v4_withErrorRet}
                />
              </Space>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <GetEncryptPublicKey />
        </Row>
      </Space>
    </Card>
  );
}

export default SignMessage;
