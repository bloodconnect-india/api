interface contact {
  name: string;
  email: string;
  message: string;
  contact: string;
  city: string;
}
export const getContactSubjectAndMsg = (data: contact) => {
  const htmlBody = `
<div>
Hi,
<br>
</div>
<div>
<br>
</div>
<div>
The following details have been submitted :
<br>
</div>
<div>
Name : ${data.name},
<br>
</div>
<div>
Email : ${data.email},
<br>
</div>
<div>
Message : ${data.message}
<br>
</div>
<div>
Phone Number: ${data.contact}
<br>
</div>
<div>
City: ${data.city}
<br>
</div>
<div>
<br>
</div>
<div>
<br>
</div>
<div>
Regards,
<br>
</div>
<div>
BloodConnect
<br>
</div>

  `;

  return {
    to: 'contact@bloodconnect.org',
    subject: 'Message from website',
    body: htmlBody
  };
};
