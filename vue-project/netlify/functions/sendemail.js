const nodemailer = require('nodemailer')

exports.handler = async function (event, context) {
  const { email, displayName, password } = JSON.parse(event.body)

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.VITE_Email, // Replace with your email
      pass: process.env.VITE_pass // Replace with your email password or app-specific password
    }
  })

  // Set up email data
  const mailOptions = {
    from: 'TaskMaster <pratikthapa567@gmail.com>', // Replace with your app name and email
    to: email,
    subject: 'Welcome to TaskMaster!',
    text: `Hi ${displayName || ''}, welcome to TaskMaster! your account has been created do login with password: ${password}. Do not share this`
  }

  // Send the email
  try {
    await transporter.sendMail(mailOptions)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' })
    }
  } catch (error) {
    console.error('Error sending email:', error) // Log error for debugging

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    }
  }
}
