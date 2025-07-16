import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function CustomDateInput() {
  const handleChange = (value: string) => {
    console.log(value);
  };
  return (
    <InputOTP  onChange={handleChange} maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
      </InputOTPGroup>
    </InputOTP>
  );
}
