'use client';

import { createUser } from '@/app/apis/apis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data: object) => {
    try {
      console.log('Collected Form Data:', data);

      const response = await createUser(data);
      console.log('API Response:', response);

      alert('Account created successfully!');
      router.push('/login');
      reset();
    } catch (error) {
      console.log(error);
      alert('Failed to create account!');
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input type="text" placeholder="John Doe" {...register('name')} required />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="m@example.com" {...register('email')} required />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" {...register('password')} required />
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  <Link href="/login">Already have an account?</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
