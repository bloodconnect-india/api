interface contact {
  name: string;
  email: string;
  organization: string;
  contact: string;
  city: string;
  mode: string;
}
export const getAwarenessSubjectAndMsg = (data: contact) => {
  const htmlBody = `
  
<div>
Hello Team
<br>
</div>
<div>
A new Awareness request has been raised at BloodConnect (by ${data.name} )
<br>
</div>
<div>
with the following information:
<br>
</div>
<div>
<br>
</div>
<table id="bodyTable" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody>
    <tr>
        <td id="bodyCell" valign="top" align="center">
            <table class="templateContainer" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr>
                        <td id="templateBody" valign="top">
                            <table style="min-width:100%;" class="mcnTextBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                    <tr>
                                        <td style="padding-top:9px;" class="mcnTextBlockInner" valign="top">
                                            <table class="mcnTextContentContainer" width="100%" style="max-width:100%; min-width:100%;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding: 0px 18px 9px; font-style: normal; font-weight: normal;" class="mcnTextContent" valign="top">
                                                            <div>
                                                                Name : ${data.name}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Email : ${data.email}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Phone : ${data.contact}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Organization : ${data.organization}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                City : ${data.city}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Mode : ${data.mode}
                                                                <br>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>
<div>
<br>
</div>
<div>
Please look into the request to ensure that it is handled as soon as possible.
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
BloodConnect Team
<br>
</div>
  `;

  return {
    // to: 'bloodconnect-heads-india@googlegroups.com',
    to: 'anishydv2000@gmail.com',
    subject: 'New Awareness Request : ' + data.city,
    body: htmlBody
  };
};

export const getAwarenessSubjectAndMsgRequestor = (data: contact) => {
    const firstName = data.name.split(' ')[0];
  const htmlBody = `
 
<div>
<br>
</div>
<table id="bodyTable" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody>
    <tr>
        <td id="bodyCell" valign="top" align="center">
            <table class="templateContainer" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr>
                        <td id="templatePreheader" valign="top">
                            <br>
                        </td>
                    </tr>
                    <tr>
                        <td id="templateHeader" valign="top">
                            <br>
                        </td>
                    </tr>
                    <tr>
                        <td id="templateBody" valign="top">
                            <table style="min-width:100%;" class="mcnImageBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnImageBlockOuter">
                                    <tr>
                                        <td class="mcnImageBlockInner" style="padding:9px" valign="top">
                                            <table style="min-width:100%;" class="mcnImageContentContainer" cellspacing="0" cellpadding="0" border="0" width="100%" align="left">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top" class="mcnImageContent">
                                                            <img class="mcnImage" style="max-width:600px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" width="163.56" src="https://mcusercontent.com/4b827bedba7c16db850a13ef5/images/66a656dc-083b-49fc-8989-a885241851c4.png" alt="" align="center">
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="min-width:100%;" class="mcnTextBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                    <tr>
                                        <td style="padding-top:9px;" class="mcnTextBlockInner" valign="top">
                                            <table class="mcnTextContentContainer" width="100%" style="max-width:100%; min-width:100%;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding: 0px 18px 9px; font-style: normal; font-weight: normal;" class="mcnTextContent" valign="top">
                                                            <h1>
                                                                <span class="size" style="font-size:16px">
                                                                    Dear ${firstName},
                                                                </span>
                                                                <br>
                                                            </h1>
                                                            <div>
                                                                <div>
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    Thank You for raising an awareness session request with us. You provided us with the following info:
                                                                    <br>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Name : ${data.name}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Email : ${data.email}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Phone : ${data.contact}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Organization : ${data.organization}
                                                                <br>
                                                            </div>
                                                            <div>
                                                                City : ${data.city}
                                                                <div>
                                                                    Mode : ${data.mode}
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    <br>
                                                                </div>
                                                                <p>
                                                                    Thank You for your patience!&nbsp;
                                                                    <br>
                                                                </p>
                                                                <div>
                                                                    We are working on your request. Our team would call you as soon as possible. We might also contact you for the additional information needed.
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    If there are any discrepancy in the contact number you have given, please raise a new request.
                                                                    <br>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="min-width:100%;" class="mcnTextBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                    <tr>
                                        <td style="padding-top:9px;" class="mcnTextBlockInner" valign="top">
                                            <table class="mcnTextContentContainer" width="100%" style="max-width:100%; min-width:100%;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" class="mcnTextContent" valign="top">
                                                            <p dir="ltr">
                                                                <br>
                                                            </p>
                                                            <div>
                                                                <b>
                                                                    Regards,
                                                                </b>
                                                                <br>
                                                            </div>
                                                            <div>
                                                                Team BloodConnect
                                                                <br>
                                                            </div>
                                                            <p>
                                                                <br>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td id="templateFooter" valign="top">
                            <table style="min-width:100%;" class="mcnFollowBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnFollowBlockOuter">
                                    <tr>
                                        <td class="mcnFollowBlockInner" style="padding:9px" valign="top" align="center">
                                            <table style="min-width:100%;" class="mcnFollowContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-left:9px;padding-right:9px;" align="left">
                                                            <table class="mcnFollowContent" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-top:9px; padding-right:9px; padding-left:9px;" valign="top" align="left">
                                                                            <table cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td valign="top" align="left">
                                                                                            <table style="display:inline;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="mcnFollowContentItemContainer" style="padding-right:10px; padding-bottom:9px;" valign="top">
                                                                                                            <table class="mcnFollowContentItem" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;" valign="middle" align="left">
                                                                                                                            <table cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td class="mcnFollowIconContent" width="24" valign="middle" align="center">
                                                                                                                                            <a target="_blank" href="http://https://www.bloodconnect.org/">
                                                                                                                                                <img class="" width="24" height="24" style="display:block;" alt="Website" src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-color-link-48.png">
                                                                                                                                            </a>
                                                                                                                                            <br>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <table style="display:inline;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="mcnFollowContentItemContainer" style="padding-right:10px; padding-bottom:9px;" valign="top">
                                                                                                            <table class="mcnFollowContentItem" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;" valign="middle" align="left">
                                                                                                                            <table cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td class="mcnFollowIconContent" width="24" valign="middle" align="center">
                                                                                                                                            <a target="_blank" href="https://www.instagram.com/bloodconnectorg/?hl=en">
                                                                                                                                                <img class="" width="24" height="24" style="display:block;" alt="Instagram" src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-color-instagram-48.png">
                                                                                                                                            </a>
                                                                                                                                            <br>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <table style="display:inline;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="mcnFollowContentItemContainer" style="padding-right:10px; padding-bottom:9px;" valign="top">
                                                                                                            <table class="mcnFollowContentItem" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;" valign="middle" align="left">
                                                                                                                            <table cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td class="mcnFollowIconContent" width="24" valign="middle" align="center">
                                                                                                                                            <a target="_blank" href="https://www.facebook.com/BloodConnect">
                                                                                                                                                <img class="" width="24" height="24" style="display:block;" alt="Facebook" src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-color-facebook-48.png">
                                                                                                                                            </a>
                                                                                                                                            <br>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <table style="display:inline;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="mcnFollowContentItemContainer" style="padding-right:0; padding-bottom:9px;" valign="top">
                                                                                                            <table class="mcnFollowContentItem" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;" valign="middle" align="left">
                                                                                                                            <table cellspacing="0" cellpadding="0" border="0" align="left">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td class="mcnFollowIconContent" width="24" valign="middle" align="center">
                                                                                                                                            <a target="_blank" href="https://twitter.com/bloodconnectorg">
                                                                                                                                                <img class="" width="24" height="24" style="display:block;" alt="Twitter" src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-color-twitter-48.png">
                                                                                                                                            </a>
                                                                                                                                            <br>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="min-width:100%;" class="mcnDividerBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnDividerBlockOuter">
                                    <tr>
                                        <td style="min-width: 100%; padding: 10px 18px 25px;" class="mcnDividerBlockInner">
                                            <table style="min-width: 100%;border-top: 2px solid #EEEEEE;" width="100%" cellspacing="0" cellpadding="0" border="0" class="mcnDividerContent">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="min-width:100%;" class="mcnTextBlock" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                    <tr>
                                        <td style="padding-top:9px;" class="mcnTextBlockInner" valign="top">
                                            <table class="mcnTextContentContainer" width="100%" style="max-width:100%; min-width:100%;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding: 0px 18px 9px; text-align: left;" class="mcnTextContent" valign="top">
                                                            <div>
                                                                Launched in IIT Delhi in 2010, BloodConnect is a youth-run organization working to solve the problem of blood shortage in India. We work to ensure continuous, sufficient blood supply to blood banks through blood donation camps; awareness sessions and emergency helplines.
                                                                <br>
                                                            </div>
                                                            <div>
                                                                <b>
                                                                    PS: Know a family member, friend or colleague who would like to make a difference for this cause? Let us know their contact details and we can invite them to join you in this movement for change.
                                                                </b>
                                                                <br>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>
<div>
<br>
</div>
  `;

  return {
    to: data.email,
    subject: 'Your Request for Awareness Session has been Raised',
    body: htmlBody
  };
};
