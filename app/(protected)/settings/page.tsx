
"use client"

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';


const Settings = () => {
    const session = useSession();

    const onClick = () => {
    logout()
    }

  return (
    <div>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
        <Button onClick={onClick} type="submit">Sign Out</Button>

    </div>
  );
}

export default Settings

