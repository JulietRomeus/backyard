import axios from 'axios';

type TaskType = {
  token: string;
  route: string;
  ref_id: string;
};
export default ({ token, route, ref_id }: TaskType) => {
  try {
    axios.delete(
      `${process.env.GENERAL_URI || ''}/workspace/${
        process.env.DEFAULT_SERVICE_NAME
      }/${route}/${ref_id}`,
      {
        headers: {
          Authorization: `${token || ''}`,
        },
      },
    );
    // console.log('result', result.data.data);
  } catch (error) {
    // console.log(process.env.MAIN_DIRECTUS_TOKEN);
    console.log('err', error.response.data);
    return error.response.data;
  }
  //   console.log(process.env.MAIN_DIRECTUS_URL || '');
};
