
import request from './../../util/ngRequest';

export async function getHelpInfo(helpId) {
    return request.get({
      url: '/SUP/RichHelp/GetHelpList',
      data: {
        helpid: helpId,
        ORMMode: true
      },
    });
  }
  