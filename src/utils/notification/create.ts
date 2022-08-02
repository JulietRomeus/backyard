import axios from 'axios';

type NotiType = {
  token: string;
  title: string;
  message: string;
  type: number;
  ref_id: string;
  category?: string;
  img_url?: string;
  url?: string;
  roles?: string[];
  units?: string[]; // unit code
  users?: string[];
};

export default async ({
  token,
  title,
  message,
  type,
  ref_id,
  category,
  url,
  roles,
  units,
  users,
  img_url,
}: NotiType) => {
  try {
    // console.log('=-=-=-=-=-=-=-=-=-=  -=-= -= -= -=- =-= - =', {
    //   title: (title && title !== '' && title) || 'ไม่ระบุ',
    //   message: (message && message !== '' && message) || 'ไม่ระบุ',
    //   type: type,
    //   route_id: ref_id.toString(),
    //   category: category,
    //   url: url,
    //   roles: roles,
    //   units: units,
    //   users: users,
    //   img_url: img_url,
    // });
    // console.log('noti', `${process.env.MAIN_URI || ''}/notification`);
    const resp = await axios.post(
      `${process.env.MAIN_URI || ''}/notification`,
      {
        title: (title && title !== '' && title) || 'ไม่ระบุ',
        message: (message && message !== '' && message) || 'ไม่ระบุ',
        type: type,
        route_id: ref_id.toString(),
        category: category,
        url: url,
        roles: roles,
        units: units,
        users: users,
        img_url: img_url,
      },
      {
        headers: {
          Authorization: `${token || ''}`,
        },
      },
    );
    // console.log('res', resp.data);
    return resp.data;
    // console.log('result', result.data.data);
  } catch (error) {
    // console.log(process.env.MAIN_DIRECTUS_TOKEN);
    console.log('err', error.response.data);
    return error.response.data;
  }
  //   console.log(process.env.MAIN_DIRECTUS_URL || '');
};
