import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export default async function sendEmail({ email, emailType, userId }: SendEmailParams) {
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		if (emailType === "VERIFY") await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
		else if (emailType === "RESET") await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILER_USERNAME!,
				pass: process.env.MAILER_PASSWORD!
			}
		});
		const mailOptions = {
			from: "aishwary@gmail.com",
			to: email,
			subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>Click <a href="${process.env.DOMAIN}/api/user/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
		};
		return await transport.sendMail(mailOptions);
	} catch (error: any) {
		throw new Error(error.message);
	}
}
