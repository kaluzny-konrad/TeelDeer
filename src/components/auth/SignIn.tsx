import UserAuthForm from "@/components/auth/UserAuthForm";

type Props = {};

export default function SignIn({}: Props) {
  return (
    <div>
      <h1>SignIn</h1>
      <UserAuthForm />
    </div>
  );
}
