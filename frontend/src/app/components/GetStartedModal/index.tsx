import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Space, Checkbox } from 'antd';
import {
  AppleOutlined,
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

interface Props {
  onClickGitHub?: (event) => void;
  onClickApple?: () => void;
  onClickGoogle?: () => void;
  onClickFacebook?: () => void;
  onClickTwitter?: () => void;
}

export const GetStartedModal = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const iconStyle = { fontSize: '24px', verticalAlign: 'baseline' };
  const buttonStyle = { height: 60, width: 250, marginTop: 10 };

  const [agreed, setAgreed] = React.useState(false);

  return (
    <>
      <Modal
        title={undefined}
        centered
        visible={true}
        footer={null}
        style={{ alignContent: 'center', alignSelf: 'center' }}
        closable={false}
        maskClosable={true}
        width={300}
      >
        <Space direction={'vertical'}>
          <Button
            style={buttonStyle}
            size={'large'}
            type="primary"
            icon={<GithubOutlined style={iconStyle} />}
            disabled={!agreed}
            onClick={props.onClickGitHub}
          >
            {t('login')} GitHub
          </Button>
          <Button
            style={buttonStyle}
            size={'large'}
            type="primary"
            icon={<AppleOutlined style={iconStyle} />}
            disabled={true}
          >
            {t('login')} Apple <br />
            (coming soon)
          </Button>
          <Button
            style={buttonStyle}
            size={'large'}
            type="primary"
            icon={<GoogleOutlined style={iconStyle} />}
            disabled={true}
          >
            {t('login')} Google
            <br />
            (coming soon)
          </Button>
          <Button
            style={buttonStyle}
            size={'large'}
            type="primary"
            icon={<FacebookOutlined style={iconStyle} />}
            disabled={true}
          >
            {t('login')} Facebook <br />
            (coming soon)
          </Button>
          <Button
            style={buttonStyle}
            size={'large'}
            type="primary"
            icon={<TwitterOutlined style={iconStyle} />}
            disabled={true}
          >
            {t('login')} Twitter <br />
            (coming soon)
          </Button>
          <Checkbox onChange={() => setAgreed(!agreed)}>
            {t('agree')} {t('terms')}
          </Checkbox>
        </Space>
      </Modal>
    </>
  );
};
