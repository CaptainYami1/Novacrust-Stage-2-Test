import { useState } from "react";
import Button from "../../../components/Button"
import { TextInput } from "../../../components/TextInput";

interface ComingSoonProps {
  cryptoType: string;
}

export const ComingSoon = ({ cryptoType }: ComingSoonProps) => {
    const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col gap-20 mt-20">
        <div className="">
        <h1 className="text-center text-[32px] font-medium leading-normal clash-font text-primary">Coming Soon!</h1>
        <p className="font-outfit font-normal text-[20px] leading-normal text-[#4F4F4F] tracking-normal text-center mt-4 mb-7.5">{cryptoType} is almost here.<br />Enter your email and we’ll let you know the moment it’s live.</p>
        <TextInput htmlFor="email" label="Email" type="email" value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button variant="primary">Update me</Button>
    </div>
  )
}
