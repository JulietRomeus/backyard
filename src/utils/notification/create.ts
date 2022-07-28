import axios from 'axios';

type NotiType = {
  token: string;
  title: string;
  message: string;
  type: number;
  ref_id: string;
  category?: string;
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
}: NotiType) => {
  try {
    // console.log('>> data', {
    //   title: title,
    //   message: message,
    //   type: type,
    //   route_id: ref_id,
    //   category: category,
    //   url: url,
    //   roles: roles,
    //   units: units,
    //   users: users,
    // });
    await axios.post(
      `${process.env.MAIN_URI || ''}/notification`,
      {
        title: title,
        message: message,
        type: type,
        route_id: ref_id,
        category: category,
        url: url,
        roles: roles,
        units: units,
        users: users,
      },
      {
        headers: {
          Authorization: `${token || ''}`,
        },
      },
    );
    // console.log('res', res);
    // return res;
    // console.log('result', result.data.data);
  } catch (error) {
    // console.log(process.env.MAIN_DIRECTUS_TOKEN);
    console.log('err', error.response.data);
    return error.response.data;
  }
  //   console.log(process.env.MAIN_DIRECTUS_URL || '');
};
