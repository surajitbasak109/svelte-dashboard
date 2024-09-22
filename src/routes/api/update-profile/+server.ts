import { update_profile } from '$/server/auth/users.js';
import { upload_to_cloudinary_as_stream } from '$/utilities/upload_file_to_cloudinary.js';
import { fail } from '@sveltejs/kit';

export const POST = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    throw new Error('User not found');
  }

  const formData = await request.formData();
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const avatar_image = formData.get('avatar_image') as File | null;

  if (!first_name || !last_name) {
    fail(400, { missing: true });
  }

  const name = first_name + ' ' + last_name;

  let avatar_url: string | null = null;

  if (avatar_image?.name) {
    try {
      const result = await upload_to_cloudinary_as_stream(user.id, avatar_image);
      if (result?.url) {
        avatar_url = result.url;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  const profileUpdated = await update_profile(user.id, {
    name,
    avatar_url
  });

  console.log(profileUpdated);

  return Response.json({
    success: true,
    data: profileUpdated
  });
};
