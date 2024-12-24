'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormError } from '../form-error';
import { useSearchParams } from 'next/navigation';
import { FaGithub, FaSpinner } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with a different provider' : '';

  async function onSubmit(provider: string) {
    setIsLoading(true);

    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('space-y-6 bg-white p-6 shadow-lg rounded-lg', className)} {...props}>
      {urlError && <FormError message={urlError} />}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => onSubmit('github')}
        className="flex items-center justify-center w-full space-x-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FaGithub />}
        <span>Sign in with GitHub</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => onSubmit('google')}
        className="flex items-center justify-center w-full space-x-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FcGoogle />}
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
