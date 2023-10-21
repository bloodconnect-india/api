"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactSubjectAndMsg = void 0;
const getContactSubjectAndMsg = (data) => {
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
exports.getContactSubjectAndMsg = getContactSubjectAndMsg;
//# sourceMappingURL=contact-us.js.map