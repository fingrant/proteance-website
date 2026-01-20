const { app } = require('@azure/functions');
const sgMail = require('@sendgrid/mail');

app.http('contact', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Contact form submission received');

        try {
            // Parse the request body
            const body = await request.json();
            const { name, email, company, message } = body;

            // Validate required fields
            if (!name || !email || !message) {
                return {
                    status: 400,
                    jsonBody: {
                        success: false,
                        error: 'Name, email, and message are required fields'
                    }
                };
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    status: 400,
                    jsonBody: {
                        success: false,
                        error: 'Invalid email address'
                    }
                };
            }

            // Get SendGrid API key from environment variables
            const sendGridApiKey = process.env.SENDGRID_API_KEY;
            
            if (!sendGridApiKey) {
                context.error('SendGrid API key not configured');
                return {
                    status: 500,
                    jsonBody: {
                        success: false,
                        error: 'Email service not configured. Please contact administrator.'
                    }
                };
            }

            // Configure SendGrid
            sgMail.setApiKey(sendGridApiKey);

            // Prepare email content
            const emailContent = {
                to: 'info@proteance.com',
                from: 'noreply@proteance.com', // You'll need to verify this sender in SendGrid
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                text: `
New contact form submission:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}

---
Sent from Proteance website contact form
                `.trim(),
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                        </div>
                        <div style="margin: 20px 0;">
                            <h3 style="color: #1a1a1a;">Message:</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                        </div>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                        <p style="color: #666; font-size: 12px;">Sent from Proteance website contact form</p>
                    </div>
                `.trim()
            };

            // Send email
            await sgMail.send(emailContent);

            context.log(`Contact form email sent successfully from ${email}`);

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    message: 'Thank you for your message! We will get back to you soon.'
                }
            };

        } catch (error) {
            context.error('Error processing contact form:', error);

            // Handle SendGrid specific errors
            if (error.response) {
                context.error('SendGrid error:', error.response.body);
            }

            return {
                status: 500,
                jsonBody: {
                    success: false,
                    error: 'Unable to send message. Please try again later or email us directly at info@proteance.com'
                }
            };
        }
    }
});
