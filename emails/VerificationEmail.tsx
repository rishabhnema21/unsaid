import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap",
            format: "woff2",
          }}
        />
      </Head>

      {/* Preview text shown in inbox */}
      <Preview>Your verification code is {otp}</Preview>

      <Section style={container}>
        <Row>
          <Heading style={heading}>Verify Your Email</Heading>
        </Row>

        <Row>
          <Text style={text}>Hi {username},</Text>
        </Row>

        <Row>
          <Text style={text}>
            Thank You for Registeration. Use the verification code below to
            complete your sign-in. This code is valid for a limited time.
          </Text>
        </Row>

        <Row>
          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>
        </Row>

        <Row>
          <Text style={smallText}>
            If you didn’t request this, you can safely ignore this email.
          </Text>
        </Row>

        <Row>
          <Text style={footer}>
            © {new Date().getFullYear()} UnSaid. All rights reserved.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}

// Styles

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  fontFamily: "Roboto, Verdana, sans-serif",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "12px",
  color: "#111827",
};

const text = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#374151",
  marginBottom: "12px",
};

const codeContainer = {
  backgroundColor: "#F3F4F6",
  borderRadius: "6px",
  padding: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
};

const code = {
  fontSize: "28px",
  fontWeight: "700",
  letterSpacing: "6px",
  color: "#111827",
};

const smallText = {
  fontSize: "12px",
  color: "#6B7280",
  marginTop: "12px",
};

const footer = {
  fontSize: "11px",
  color: "#9CA3AF",
  marginTop: "24px",
  textAlign: "center" as const,
};
