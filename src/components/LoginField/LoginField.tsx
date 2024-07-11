import { Input } from "antd"
import FormItem from "antd/es/form/FormItem"
import { loginValidation } from "@/constants"

export const LoginField = () => {
  return(
    <FormItem rules={[...loginValidation]} name='login'>
      <Input />
    </FormItem>
  )
}