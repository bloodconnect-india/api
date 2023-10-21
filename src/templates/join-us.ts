interface contact {
  name: string;
  email: string;
  contact: string;
  city: string;
  education: string;
  organization: string;
  yog: string;
  experience: string;
  why: string;
  interest: string;
  how: string;
  poc: string;
  additional: string;
}
export const getJoinSubjectAndMsg = (data: contact) => {
  const htmlBody = `

  <div>
  Dear ${data.name},
  <br>
</div>
<div>
  <br>
</div>
<div>
  We appreciate your interest in volunteering with BloodConnect.
  <br>
</div>
<div>
  <br>
</div>
<div>
  We have received your application and are reviewing the applications currently. We shall get back to you about the next stage of the application process within the next few days.
  <br>
</div>
<div>
  <br>
</div>
<div>
  Name: ${data.name}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Mobile Number: ${data.contact}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Email ID: ${data.email}
  <br>
</div>
<div>
  <br>
</div>
<div>
  City in which you wish to volunteer: ${data.city}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Education Details: ${data.education}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Organization: ${data.organization}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Year of graduation: ${data.yog}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Do you have any prior experience in volunteering?
  <br>
</div>
<div>
  ${data.experience}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Why do you want to be a part of BloodConnect?
  <br>
</div>
<div>
  ${data.why}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Are you interested in any specific profile?
  <br>
</div>
<div>
  ${data.interest}
  <br>
</div>
<div>
  <br>
</div>
<div>
  How did you get to know about BloodConnect?
  <br>
</div>
<div>
  ${data.how}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Do you have a personal contact in our team? If Yes, please mention his/her&nbsp;
  <br>
</div>
<div>
  name.
  <br>
</div>
<div>
  ${data.poc}
  <br>
</div>
<div>
  <br>
</div>
<div>
  Additional Message
  <br>
</div>
<div>
  ${data.additional}
  <br>
</div>
<div>
  <br>
</div>
<div>
  <br>
</div>
<div>
  Thank you once again for volunteering with BloodConnect.
  <br>
</div>
<div>
  <br>
</div>
<div>
  *In case of any queries, write to us at
  <a href="mailto:recruitment@bloodconnect.org" rel="noopener noreferrer">
      recruitment@bloodconnect.org
  </a>
  *
  <br>
</div>
<div>
  <br>
</div>
<div>
  Wish you all the best!
  <br>
</div>
<div>
  Team BloodConnect
  <br>
</div>
<div>
  Contact us at:
  <a href="mailto:recruitment@bloodconnect.org" rel="noopener noreferrer">
      recruitment@bloodconnect.org
  </a>
  <br>
</div>
<div>
  <a href="https://www.bloodconnect.org/" rel="noopener noreferrer">
      Website
  </a>
  | Facebook | Twitter
  <br>
</div>
<div>
  H-19, 1st Floor, Lajpat Nagar-2, New Delhi-110024
  <br>
</div>
<div>
  <br>
</div>
<div>
  PS: Know a family member, friend,&nbsp;or colleague who would like to make a&nbsp;
  <br>
</div>
<div>
  difference for this cause? Let us know their contact details and we can&nbsp;
  <br>
</div>
<div>
  invite them to join you in this movement for change.
  <br>
</div>

  `;

  return {
    to: `${data.email},recruitment@bloodconnect.org`,
    subject: 'Message from website',
    body: htmlBody
  };
};
