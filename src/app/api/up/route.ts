export const GET = async (): Promise<Response> => {
  return Response.json({ message: 'Site is up!' });
};
