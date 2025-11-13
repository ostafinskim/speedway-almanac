export function getVerificationEmailHtml(url: string, userName?: string): string {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.button { 
						display: inline-block; 
						padding: 12px 24px; 
						background-color: #007bff; 
						color: white; 
						text-decoration: none; 
						border-radius: 4px;
						margin: 20px 0;
					}
					.link-container {
						word-break: break-all;
						overflow-wrap: break-word;
						max-width: 100%;
					}
					.footer { margin-top: 30px; font-size: 12px; color: #666; }
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Verify your email</h1>
					${userName ? `<p>Hi ${userName},</p>` : '<p>Hi,</p>'}
					<p>Please click the button below to verify your email address:</p>
					<a href="${url}" class="button">Verify Email</a>
					<p>Or copy and paste this link into your browser:</p>
					<p class="link-container"><a href="${url}">${url}</a></p>
					<div class="footer">
						<p>If you didn't request this email, you can safely ignore it.</p>
					</div>
				</div>
			</body>
		</html>
	`;
}

export function getPasswordResetEmailHtml(url: string, userName?: string): string {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.button { 
						display: inline-block; 
						padding: 12px 24px; 
						background-color: #dc3545; 
						color: white; 
						text-decoration: none; 
						border-radius: 4px;
						margin: 20px 0;
					}
					.link-container {
						word-break: break-all;
						overflow-wrap: break-word;
						max-width: 100%;
					}
					.footer { margin-top: 30px; font-size: 12px; color: #666; }
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Reset your password</h1>
					${userName ? `<p>Hi ${userName},</p>` : '<p>Hi,</p>'}
					<p>Click the button below to reset your password:</p>
					<a href="${url}" class="button">Reset Password</a>
					<p>Or copy and paste this link into your browser:</p>
					<p class="link-container"><a href="${url}">${url}</a></p>
					<div class="footer">
						<p>If you didn't request this email, you can safely ignore it.</p>
						<p>This link will expire in 24 hours.</p>
					</div>
				</div>
			</body>
		</html>
	`;
}