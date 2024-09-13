import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { log } from "console";

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {

        const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email ,
      subject: 'Your mystery message Verification Code',
          react: VerificationEmail({
            username,
            otp: verifyCode,
            
      }),
    });

    return {
      success: true,
      message: 'Verification email sent successfully'
    }
  }
    
  catch (emailError) {
    console.error('error sending the verification email', emailError)
    return {
      success: false,
      message: 'failed to send the verification code'
    }
  }
}
