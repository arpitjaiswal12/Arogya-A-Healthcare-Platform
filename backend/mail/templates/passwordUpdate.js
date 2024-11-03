// mail/templates/passwordUpdate.js

exports.passwordUpdated = (email, message) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #4CAF50;">Password Updated Successfully</h2>
        <p>Hi ${email},</p>
        <p>${message}</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
        <p>Best regards,</p>
        <p>Your Company Name</p>
      </div>
    `;
  };
  