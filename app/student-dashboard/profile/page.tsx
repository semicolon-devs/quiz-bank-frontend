import { title } from "@/components/primitives";
import { getAccess } from "@/helpers/token";

export default function ProfilePage() {
  return (
    <div>
      <h1 className={title({ size: "md" })}>Profile</h1>
    </div>
  );
}
