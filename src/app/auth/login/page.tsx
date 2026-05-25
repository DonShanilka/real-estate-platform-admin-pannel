import AuthLayout from '@/src/components/auth/AuthLayout';
import LoginForm from '@/src/components/auth/LoginForm';
import { Sidebar } from '@/src/components/layout/Sidebar';

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back">
      <LoginForm />
    </AuthLayout>
  );
}