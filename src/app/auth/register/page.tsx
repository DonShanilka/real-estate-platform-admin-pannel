import AuthLayout from '@/src/components/auth/AuthLayout';
import RegisterForm from '@/src/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Admin Account">
      <RegisterForm />
    </AuthLayout>
  );
}