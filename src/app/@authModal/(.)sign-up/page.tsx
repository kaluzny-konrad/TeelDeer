import CloseModal from "@/components/modal/CloseModal";
import SignUp from "@/components/auth/SignUp";

export default function page() {
  return (
    <div>
      <h1>Sign Up - Modal</h1>
      <CloseModal />
      <SignUp />
    </div>
  );
}
