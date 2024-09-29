<script lang="ts">
  import AuthButton from '$/lib/components/UI/AuthButton.svelte';
  import Input from '$/lib/components/UI/Input.svelte';
  import getFirstAndLastName from '$/utilities/get_first_and_last_name';
  import isUserVerified from '$/utilities/is_user_verified';
  import { getContext } from 'svelte';
  import Dropzone from 'svelte-file-dropzone';

  const user = getContext('user');

  const firstAndLastName = getFirstAndLastName($user?.name);
  const userVerified = isUserVerified($user?.userVerify);

  let username = $user?.username ?? '';
  let firstName = firstAndLastName?.firstName ?? '';
  let lastName = firstAndLastName?.lastName ?? '';
  let avatarImageFile: File | string = '';
  let clientError: string | null = null;

  function handleFileSelect(e: CustomEvent) {
    const { acceptedFiles } = e.detail;
    avatarImageFile = acceptedFiles[0];
  }

  async function updateProfile() {
    if (!firstName || !lastName) {
      clientError = 'Please enter first name and last name';
    }
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', username);
    formData.append('avatar_image', avatarImageFile);

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        alert('Profile updated');
      } else {
        console.error('File could not be uploaded');
      }
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="box-border flex justify-center flex-auto px-5 m-0 gap-x-3">
  <section class="w-full md:w-8/12">
    {#if !userVerified}
      <div class="p-4 mb-3 bg-white rounded-sm shadow-lg">
        <h2 class="my-2 text-2xl font-bold">Verify your account</h2>
        <p class="text-sm text-slate-600">We've sent you a verification link, please verify your account</p>
      </div>
    {/if}
    <div class="p-4 mb-3 bg-white rounded-sm shadow-lg">
      <h2 class="my-2 text-2xl font-bold">Update your profile</h2>
      {#if clientError}
        <p class="text-sm text-red-700">{clientError}</p>
      {/if}
      <form on:submit|preventDefault={updateProfile}>
        <div class="flex justify-between w-full mb-2 gap-x-2">
          <Input
            class="w-1/2"
            type="text"
            name="first-name"
            id="first-name"
            label="First name"
            required={true}
            bind:value={firstName}
            placeholder="Enter your first name" />
          <Input
            class="w-1/2"
            type="text"
            name="last-name"
            id="last-name"
            label="Last name"
            required={true}
            bind:value={lastName}
            placeholder="Enter your last name" />
        </div>

        {#if !$user?.username}
          <Input
            class="w-1/2"
            type="text"
            name="user-name"
            id="user-name"
            label="User name"
            required={true}
            bind:value={username}
            placeholder="Enter your username" />
        {/if}

        <fieldset class="my-4">
          <h2 class="mb-2 text-sm font-bold">Upload your profile image</h2>
          <Dropzone on:drop={handleFileSelect} multiple={false} accept="image/*" />
          {#if typeof avatarImageFile !== 'string'}
            <p class="mt-2 text-xs">Selected file: {avatarImageFile?.name}</p>
          {/if}
        </fieldset>

        <div class="my-2">
          <AuthButton type="submit">Save</AuthButton>
        </div>
      </form>
    </div>
  </section>
  {#if $user}
    <section class="hidden md:block md:w-4/12">
      <div class="p-4 bg-white rounded-sm shadow-lg">
        <h2 class="my-2 text-2xl font-bold">Profile</h2>
        {#if $user.avatar_url}
          <div class="my-2">
            <img src={$user.avatar_url} alt="Avatar" class="max-w-full" />
          </div>
        {/if}
        <p class="mb-1">
          <strong>Name</strong>
          : {$user.name ?? 'not provided'}
        </p>
        <p class="mb-1">
          <strong>User name</strong>
          : {$user.username ?? 'not provided'}
        </p>
        <p class="mb-1">
          <strong>Email</strong>
          : {$user.email}
        </p>
      </div>
    </section>
  {/if}
</div>
