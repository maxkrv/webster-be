import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface EmailProps {
  name: string;
  link: string;
}

const ResetPasswordLink: React.FC<EmailProps> = ({ link, name }) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerContainer}>
          <Text style={logo}>Webster</Text>
        </Section>
        <Section style={contentContainer}>
          <Text style={title}>Reset your password</Text>
          <Text style={paragraph}>Hi {name},</Text>
          <Section style={infoBlock}>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to create a new password for your account.
            </Text>
          </Section>
          <Section style={btnContainer}>
            <Button style={button} href={link}>
              Reset password
            </Button>
          </Section>
          <Section style={securityNote}>
            <Text style={securityText}>
              This link will expire in 24 hours for security reasons. If you
              didn't request a password reset, please ignore this email.
            </Text>
          </Section>
        </Section>
        <Hr style={hr} />
        <Text style={footerText}>
          © {new Date().getFullYear()} Webster. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordLink;

const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '30px 0',
};

const container = {
  margin: '0 auto',
  width: '100%',
  maxWidth: '550px',
};

const headerContainer = {
  backgroundColor: '#ffffff',
  borderRadius: '8px 8px 0 0',
  padding: '20px 0',
  textAlign: 'center' as const,
  borderBottom: '1px solid #e2e8f0',
};

const logo = {
  color: '#6366f1',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
};

const contentContainer = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '0 0 8px 8px',
};

const title = {
  color: '#0f172a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
  width: '100%', // Ensure container takes full width
};

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '9999px', // Fully rounded corners
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '500',
  width: 'calc(100% - 48px)', // Full width minus padding
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const securityNote = {
  backgroundColor: '#f1f5f9',
  padding: '12px 16px',
  borderRadius: '6px',
  margin: '24px 0 0',
  border: '1px solid #e2e8f0',
};

const securityText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0 16px',
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const infoBlock = {
  backgroundColor: '#f8fafc',
  padding: '16px 20px',
  borderRadius: '6px',
  margin: '24px 0',
  border: '1px solid #e2e8f0',
};
