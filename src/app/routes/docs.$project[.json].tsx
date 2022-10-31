import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getArticlePage } from '~/utils/loaders.server';

function api404(message = 'No API route found at this URL') {
  return json(
    {
      status: 404,
      message,
    },
    { status: 404 }
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { project } = params;
  const data = await getArticlePage(project as string, { project: project as string }).catch(
    () => null
  );
  if (!data) return api404('No page found at this URL.');
  return json(data);
};
