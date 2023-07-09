import CloseModal from "@/components/modal/CloseModal";
import SignIn from "@/components/auth/SignIn";

export default function page() {
  return (
    <div>
      <h1>Sign In - Modal</h1>
      <CloseModal />
      <SignIn />
    </div>
  );
}
