import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface InviteUserProps {
  firstName: string
  invitedByfirstName?: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const EmailTemplate = ({ firstName, invitedByfirstName = 'Terry' }: InviteUserProps) => {
  const previewText = `You have a new connection request from ${invitedByfirstName} `

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              You have been invited to cooperate on something special
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">{`Hello ${firstName}`}</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByfirstName}</strong> has invited you to connect on Just Like ME.
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">To view this invitation, click the button below</Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] p-4 text-center text-[12px] font-semibold text-white no-underline"
                href={process.env.NEXT_PUBLIC_APP_URL}
              >
                View request
              </Button>
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
