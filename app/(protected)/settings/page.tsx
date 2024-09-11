
"use client"

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession, signOut } from 'next-auth/react';


const Settings = () => {
    const session = useSession();

    const onClick = () => {
    logout()
    }

    const user = useCurrentUser()
  return (
    <div>
      {JSON.stringify(user)}
        <Button onClick={onClick} type="submit">Sign Out</Button>

    </div>
  );
}

export default Settings

