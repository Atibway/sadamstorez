import { EmailTemplate } from "@/components/EmailTemplate";
import { ResetPasswordEmailTemplate } from "@/components/ResetEmailTemplate";
import TwoFactorEmailTemplate from "@/components/TwoFactorEmailTemplate";
import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorEmail = async (
    email: string,
    token: string,
)=>{
    
    await resend.emails.send({
        from:"Acme <next-auth@resend.dev>",
        to:email,
        subject:"2FA Code",
        react: TwoFactorEmailTemplate({ token }) as React.ReactElement,
    })
}
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
)=>{
    const confirmLink = `${domain}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from:"Acme <next-auth@resend.dev>", 
        to:email,
        subject:"Reset your Password",
        react: ResetPasswordEmailTemplate({ confirmLink }) as React.ReactElement,
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
)=>{
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from:"Acme <next-auth@resend.dev>",
        to:email,
        subject:"Confirm your email",
        react: EmailTemplate({ confirmLink }) as React.ReactElement,
    })
}