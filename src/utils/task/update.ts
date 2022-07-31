import axios from 'axios';

type TaskType = {
  token: string;
  route: string;
  node_order: number;
  ref_id: string;
  method?: string;
  data?: any;
  note?: string;
};
export default async ({
  token,
  route,
  node_order,
  ref_id,
  method,
  data,
  note,
}: TaskType) => {
  try {
    // console.log('route:', route);
    // console.log('ref_id:', ref_id);
    // console.log('node_order', node_order);
    delete data.request_by;
    const resp = await axios.patch(
      `${process.env.GENERAL_URI || ''}/workspace/${
        process.env.DEFAULT_SERVICE_NAME
      }/${route}/${node_order}/${ref_id}${
        (method === 'back' && '?method=back') || ''
      }`,
      { data: data, note: note },
      {
        headers: {
          Authorization: `${token || ''}`,
        },
      },
    );

    return resp.data;

    // console.log('result', result.data.data);
  } catch (error) {
    // console.log(process.env.MAIN_DIRECTUS_TOKEN);
    console.log('err', error.response.data);
    return error.response.data;
  }
  //   console.log(process.env.MAIN_DIRECTUS_URL || '');
};
