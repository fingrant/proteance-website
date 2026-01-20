const { EmailClient } = require('@azure/communication-email');

module.exports = async function (context, req) {
    context.log('Contact form submission received');

    try {
        // Parse the request body
        const { name, email, company, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            context.res = {
                status: 400,
                body: {
                    success: false,
                    error: 'Name, email, and message are required fields'
                }
            };
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            context.res = {
                status: 400,
                body: {
                    success: false,
                    error: 'Invalid email address'
                }
            };
            return;
        }

        // Get Azure Communication Services connection string from environment variables
        const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
        const senderAddress = process.env.AZURE_COMMUNICATION_SENDER_ADDRESS;
        
        if (!connectionString || !senderAddress) {
            context.log.error('Azure Communication Services not configured');
            context.res = {
                status: 500,
                body: {
                    success: false,
                    error: 'Email service not configured. Please contact administrator.'
                }
            };
            return;
        }

        // Create email client
        const emailClient = new EmailClient(connectionString);

        // Prepare email content
        const emailMessage = {
            senderAddress: senderAddress,
            content: {
                subject: `New Contact Form Submission from ${name}`,
                plainText: `
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
            },
            recipients: {
                to: [{ address: 'info@proteance.com' }]
            },
            replyTo: [{ address: email }]
        };

        // Send email
        const poller = await emailClient.beginSend(emailMessage);
        await poller.pollUntilDone();

        context.log(`Contact form email sent successfully from ${email}`);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            }
        };

    } catch (error) {
        context.log.error('Error processing contact form:', error);

        context.res = {
            status: 500,
            body: {
                success: false,
                error: 'Unable to send message. Please try again later or email us directly at info@proteance.com'
            }
        };
    }
};
